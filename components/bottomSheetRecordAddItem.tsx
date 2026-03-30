import { useCheckContext } from '@/context/recordsContext';
import { getRunningAmount } from '@/db/fundCreditAccounts/select';
import { deleteExpense, deleteIncome } from '@/db/records/delete';
import { addNewExpense, addNewIncome } from '@/db/records/insert';
import { getActiveAccounts, getActiveExpenseCategories, getActiveIncomeCategories } from '@/db/records/select';
import { updateExpenseItem, updateIncomeItem } from '@/db/records/update';
import { getLocalTime } from '@/func/time';
import RecordStyles from '@/styles/recordsStyles';
import { ActiveAccountsProps, TypeProps } from '@/types/recordsTypeItemType.schema';
import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import AddItemForm from './recordAddItemForm';
import FormAccountWrapper from './recordFormAccountWrapper';
import FormCategoryWrapper from './recordFormCategoryWrapper';

interface AddItemTypes {
  type: React.RefObject<"income" | "expense" | null>;
  focusedItem: TypeProps | undefined;
}

export default function BottomSheetRecordAddItem({ type, focusedItem }: AddItemTypes) {

    const { closeStateSheetCaller, focusedDate, setRecordsRefreshTrigger } = useCheckContext()

    let getActiveTypeCategories:() => Promise<{ categoryId:number, name:string, badge:string }[]>;
    let addNewType:(categoryId:number, accountId:number, comment:string | null, date:string, time:string, amount:number) => Promise<void>;
    let deleteType: (id: number, accoundId: number) => Promise<void>;
    let updateType: (categoryId:number, accountId:number, comment:string | null, amount:number, id:number) => Promise<void>;
    if ( type.current === 'income' ){
        getActiveTypeCategories = getActiveIncomeCategories
        addNewType = addNewIncome;
        deleteType = deleteIncome;
        updateType = updateIncomeItem;
    } else {
        getActiveTypeCategories = getActiveExpenseCategories
        addNewType = addNewExpense
        deleteType = deleteExpense;
        updateType = updateExpenseItem
    }

    const [ categories, setCategories ] = useState<{ categoryId:number, name:string, badge:string }[] | null>(null)
    const [ accounts, setAccounts ] = useState<ActiveAccountsProps[] | null>(null)
    const [ amount, setAmount ] = useState<string>('')
    const [ selectedAccount, setSelectedAccount ] = useState< ActiveAccountsProps | null>(null)
    const [ comment, setComment ] = useState<string>('')
    const [ selectedCategory, setSelectedCategory ] = useState<{ categoryId:number, name:string, badge:string } | undefined>(undefined)
    const [ amountError, setAmountError ] = useState(false)
    const amountErrorRef = useRef(false)
    const [ accountError, setAccountsError ] = useState(false)
    const [ categoryError, setCategoryError ] = useState(false)

    const [ isEdit, setIsEdit ] = useState(false)
    const [ longPressWarn, setLongPressWarn ] = useState(false)
    const [ negativeBalanceError, setNegativeBalanceError ] = useState(false)
    const negativeBalanceErrorRef = useRef(false)

    const [ currentScreen, setCurrentScreen ] = useState<'Form' | 'Category' | 'Account'>('Form')

    // functions
    async function checkValidity() {
        if ( amount === '' || amount.trim().length === 0 ) {
            setAmountError(true)
            amountErrorRef.current = true
        } else {
            setAmountError(false)
            amountErrorRef.current = false
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

        if ( selectedAccount && !amountError && type.current === 'expense' ) {
            const runningAmount = await getRunningAmount( selectedAccount.accountId )
            const error = !(runningAmount >= Number(amount) * 100)
            setNegativeBalanceError( error )
            negativeBalanceErrorRef.current = error
        }
    }

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
    async function onAddPressHandler() {

        await checkValidity()

        if ( !amountErrorRef.current && selectedAccount && selectedCategory && !negativeBalanceErrorRef.current) {
            const createdDateTime = getLocalTime().toISOString()
            await addNewType(selectedCategory.categoryId, selectedAccount.accountId, comment, focusedDate, createdDateTime, Number(amount))
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

    function onAccountPress(account: ActiveAccountsProps) {
        setSelectedAccount(account)
        setCurrentScreen('Form')
    }

    // Handle Edit
    function updateStatesUnderFocused() {
        if ( focusedItem ) {
            setIsEdit(true)
            setSelectedCategory({ categoryId:focusedItem.categoryId, name:focusedItem.name, badge:focusedItem.badge })
            setAmount(( focusedItem.amount / 100).toString() )
            setSelectedAccount({ accountId:focusedItem.accountId, accountName:focusedItem.accountName, accountBadge:focusedItem.accountBadge })
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
            await deleteType(focusedItem.typeId, focusedItem.accountId)
        }
        setLongPressWarn(false)
        setRecordsRefreshTrigger(inc => inc+1)
        closeStateSheetCaller()
    }

    async function handleUpdate() {
        
        await checkValidity()

        if ( !amountErrorRef.current && selectedAccount && selectedCategory && focusedItem && !negativeBalanceErrorRef.current) {
            await updateType(selectedCategory.categoryId, selectedAccount.accountId, comment, Number(amount), focusedItem.typeId)
            setRecordsRefreshTrigger(inc => inc+1)
            closeStateSheetCaller()
        }
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
                handleUpdate={handleUpdate}
                negativeBalanceError={negativeBalanceError}
                setNegativeBalanceError={setNegativeBalanceError}
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