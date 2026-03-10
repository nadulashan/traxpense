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


export default function BottomSheetRecordAddItem() {

    const { type, closeSheetCaller } = useCheckContext()

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
    const [ ammountError, setAmountError ] = useState(false)
    const [ selectedCategory, setSelectedCategory ] = useState<{ categoryId:number, name:string, badge:string } | null>(null)
    const [ isCategoriesReady, setIsCategoriesReady ] = useState(false)

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
        if ( amount === '' ) {
            setAmountError(true)
            return
        } 

        if ( !ammountError && selectedAccount && selectedCategory ) {
            const [ date, time ] = getLocalTime().toISOString().split('T')
            addNewType(selectedCategory.categoryId, selectedAccount.accountId, comment, date, time, Number(amount))
            closeSheetCaller()
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
                amountError={ammountError}
                setAmountError={setAmountError}
                handleCategorySelector={handleCategorySelector}
                selectedCategory={selectedCategory}
                handleAccountSelector={handleAccountSelector}
                selectedAccount={selectedAccount}
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