import { useCheckContext } from '@/context/recordsContext';
import { deleteExpense, deleteIncome } from '@/db/records/delete';
import { addNewExpense, addNewIncome } from '@/db/records/insert';
import { getActiveAccounts, getActiveExpenseCategories, getActiveIncomeCategories } from '@/db/records/select';
import { getLocalTime } from '@/func/time';
import RecordStyles from '@/styles/recordsStyles';
import { ExpenseTypes, IncomeTypes } from '@/types/recordsTypeItemType.schema';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import AddItemForm from './recordAddItemForm';
import FormAccountWrapper from './recordFormAccountWrapper';
import FormCategoryWrapper from './recordFormCategoryWrapper';

interface AddItemTypes {
  type: React.RefObject<"income" | "expense" | null>;
  focusedItem: IncomeTypes | ExpenseTypes | undefined;
}

export default function BottomSheetRecordAddItem({ type, focusedItem }: AddItemTypes) {

    const { closeStateSheetCaller, focusedDate, setRecordsRefreshTrigger } = useCheckContext()

    let getActiveTypeCategories:() => Promise<{ categoryId:number, name:string, badge:string }[]>;
    let addNewType:(categoryId:number, accountId:number, comment:string | null, date:string, time:string, amount:number) => void;
    let deleteType: (id: number) => void;
    if ( type.current === 'income' ){
        getActiveTypeCategories = getActiveIncomeCategories
        addNewType = addNewIncome;
        deleteType = deleteIncome;
    } else {
        getActiveTypeCategories = getActiveExpenseCategories
        addNewType = addNewExpense
        deleteType = deleteExpense
    }

    const [ categories, setCategories ] = useState<{ categoryId:number, name:string, badge:string }[] | null>(null)
    const [ accounts, setAccounts ] = useState<{ accountId:number, accountName:string, accountBadge:string }[] | null>(null)
    const [ amount, setAmount ] = useState<string>('')
    const [ selectedAccount, setSelectedAccount ] = useState<{ accountId:number, accountName:string, accountBadge:string } | null>(null)
    const [ comment, setComment ] = useState<string>('')
    const [ selectedCategory, setSelectedCategory ] = useState<{ categoryId:number, name:string, badge:string } | undefined>(undefined)
    const [ amountError, setAmountError ] = useState(false)
    const [ accountError, setAccountsError ] = useState(false)
    const [ categoryError, setCategoryError ] = useState(false)

    const [ isEdit, setIsEdit ] = useState(false)
    const [ longPressWarn, setLongPressWarn ] = useState(false)

    const [ currentScreen, setCurrentScreen ] = useState<'Form' | 'Category' | 'Account'>('Form')

    // DB Fetching
    async function refreshCategories() {
        const fetchedCategories = await getActiveTypeCategories()
        setCategories(fetchedCategories)
    }

    async function refreshAccounts() {
        const fetchedAccounts = await getActiveAccounts()
        setAccounts(fetchedAccounts)
    }

    // Button Click handler
    function onAddPressHandler() {
        if ( amount === '' || amount.trim().length === 0 ) {
            setAmountError(true)
        } else {
            setAmountError(false)
        } 

        if ( !selectedAccount ) {
            setAccountsError(true)
        } else {
            setAccountsError(false)
        }

        if ( !selectedCategory ) {
            setCategoryError(true)
        } else {
            setCategoryError(false)
        }

        if ( !amountError && selectedAccount && selectedCategory ) {
            const createdDateTime = getLocalTime().toISOString()
            addNewType(selectedCategory.categoryId, selectedAccount.accountId, comment, focusedDate, createdDateTime, Number(amount))
            closeStateSheetCaller()
            setRecordsRefreshTrigger(inc => inc+1)
        }
    }

    function handleCategorySelector() {
        setCurrentScreen('Category')
        refreshCategories()
    }

    function handleAccountSelector() {
        setCurrentScreen('Account')
        refreshAccounts()
    }

    function onCategoryPress(category:{ categoryId:number, name:string, badge:string }) {
        setSelectedCategory(category)
        setCurrentScreen('Form')
    }

    function onAccountPress(account: { accountId:number, accountName:string, accountBadge:string }) {
        setSelectedAccount(account)
        setCurrentScreen('Form')
    }

    // Handle Edit
    function updateStatesUnderFocused() {
        if ( focusedItem ) {
            setIsEdit(true)
            setSelectedCategory({categoryId:focusedItem.categoryId, name:focusedItem.name, badge:focusedItem.badge})
            setAmount((focusedItem.amount / 100).toString())
            setSelectedAccount({accountId:focusedItem.accountId, accountName:focusedItem.accountName, accountBadge:focusedItem.accountBadge})
            if ( focusedItem.comment ){
                setComment(focusedItem.comment)
            }
        }
    }

    useEffect(() => {
        updateStatesUnderFocused()
    }, [ focusedItem ])

    // Delete
    async function handleDeletion() {
        if ( focusedItem ) {
            deleteType(focusedItem.typeId)
        }
        setLongPressWarn(false)
        closeStateSheetCaller()
    }

    async function handleUpdate() {

    }

    const SCREEN = {
        Form:() => <AddItemForm 
                amount={amount}
                setAmount={setAmount}
                onAddPressHandler={onAddPressHandler}
                comment={comment}
                setComment={setComment}
                amountError={amountError}
                setAmountError={setAmountError}
                handleCategorySelector={handleCategorySelector}
                selectedCategory={selectedCategory}
                handleAccountSelector={handleAccountSelector}
                selectedAccount={selectedAccount}
                isCustomForm={false}
                customName={undefined}
                setCustomName={undefined}
                customTypeNameError={undefined}
                accountError={accountError}
                categoryError={categoryError}
                isEdit={isEdit}
                handleDeletion={handleDeletion}
                longPressWarn={longPressWarn}
                setLongPressWarn={setLongPressWarn}
            />,
        Category: () => <FormCategoryWrapper 
                        categories={categories}
                        onCategoryPress={onCategoryPress}
                        />,
        Account: () => <FormAccountWrapper
                        accounts={accounts}
                        onAccountPress={onAccountPress}
                        />
    }

    const ScreenContent = SCREEN[currentScreen]

    return (
        <View style={RecordStyles.MenuSheetWrapper}>
            {ScreenContent()}
        </View>
    )
}