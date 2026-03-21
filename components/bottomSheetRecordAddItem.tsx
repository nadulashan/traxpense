import { useCheckContext } from '@/context/recordsContext';
import { addNewExpense, addNewIncome } from '@/db/records/insert';
import { getActiveAccounts, getActiveExpenseCategories, getActiveIncomeCategories } from '@/db/records/select';
import { getLocalTime } from '@/func/time';
import RecordStyles from '@/styles/recordsStyles';
import { useState } from 'react';
import { View } from 'react-native';
import AddItemForm from './recordAddItemForm';
import FormAccountWrapper from './recordFormAccountWrapper';
import FormCategoryWrapper from './recordFormCategoryWrapper';

interface AddItemTypes {
  type: React.RefObject<"income" | "expense" | null>;
}

export default function BottomSheetRecordAddItem({ type }: AddItemTypes) {

    const { closeStateSheetCaller, focusedDate, setRecordsRefreshTrigger } = useCheckContext()

    let getActiveTypeCategories:() => Promise<{ categoryId:number, name:string, badge:string }[]>;
    let addNewType:(categoryId:number, accountId:number, comment:string | null, date:string, time:string, amount:number) => void;
    if ( type.current === 'income' ){
        getActiveTypeCategories = getActiveIncomeCategories
        addNewType = addNewIncome;
    } else {
        getActiveTypeCategories = getActiveExpenseCategories
        addNewType = addNewExpense
    }

    const [ categories, setCategories ] = useState<{ categoryId:number, name:string, badge:string }[] | null>(null)
    const [ accounts, setAccounts ] = useState<{ accountId:number, accountName:string, accountBadge:string }[] | null>(null)
    const [ amount, setAmount ] = useState<string>('')
    const [ selectedAccount, setselectedAccount ] = useState<{ accountId:number, accountName:string, accountBadge:string } | null>(null)
    const [ comment, setComment ] = useState<string>('')
    const [ selectedCategory, setSelectedCategory ] = useState<{ categoryId:number, name:string, badge:string } | undefined>(undefined)
    const [ amountError, setAmountError ] = useState(false)
    const [ accountError, setAccountsError ] = useState(false)
    const [ categoryError, setCategoryError ] = useState(false)

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

        // if()

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
        setselectedAccount(account)
        setCurrentScreen('Form')
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