import AddToRecordButton from '@/components/addToRecordButton';
import AddItemForm from '@/components/recordAddItemForm';
import FormAccountWrapper from '@/components/recordFormAccountWrapper';
import CreateCustomCustomTypeItem from '@/components/recordsCreateCustomCustomTypeItem';
import colors from '@/constants/colors';
import { addNewCustomExpense, addNewCustomIncome, createCustomRecordOnExpense, createCustomRecordOnIncome, createRelationOnExpense, createRelationOnIncome } from '@/db/records/insert';
import { checkCustomExpense, checkCustomIncome, getActiveAccounts, getCustomExpenses, getCustomIncomes } from '@/db/records/select';
import { updateCustomExpenseRelation, updateCustomIncomeRelation } from '@/db/records/update';
import { closeBottomSheet, openBottomSheet } from '@/func/bottomSheetfunc';
import { getLocalTime, getLongDate } from '@/func/time';
import CommonStyles from '@/styles/commonStyles';
import RecordStyles from '@/styles/recordsStyles';
import { CustomExpenseTypes, CustomIncomeTypes } from '@/types/recordsTypeItemType.schema';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetView } from '@gorhom/bottom-sheet';
import { useNavigation } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


export default function CreateCustom({route}:any){

    const navigation = useNavigation<any>()
    const { focusedDate } = route.params
    const longDate = getLongDate(focusedDate)

    // States
    const [ selectedIncomeAccount, setSelectedIncomeAccount ] = useState<{ accountId:number, accountName:string, accountBadge:string } | null>(null)
    const [ incomeComment, setIncomeComment ] = useState<string>('')
    const [ incomeAmountError, setIncomeAmountError ] = useState(false)
    const [ incomeAmount, setIncomeAmount ] = useState<string>('')
    const [ customIncomeName, setCustomIncomeName ] = useState('')
    const [ customIncomeNameError, setCustomIncomeNameError ] = useState(false)
    const [ customIncomeAccountsError, setCustomIncomeAccountsError ] = useState(false)

    const [ selectedExpenseAccount, setSelectedExpenseAccount ] = useState<{ accountId:number, accountName:string, accountBadge:string } | null>(null)
    const [ expenseComment, setExpenseComment ] = useState<string>('')
    const [ expenseAmountError, setExpenseAmountError ] = useState(false)
    const [ expenseAmount, setExpenseAmount ] = useState<string>('')
    const [ customExpenseName, setCustomExpenseName ] = useState('')
    const [ customExpenseNameError, setCustomExpenseNameError ] = useState(false)
    const [ customExpenseAccountsError, setCustomExpenseAccountsError ] = useState(false)
    

    const [ incomeArray, setIncomeArray ] = useState<CustomIncomeTypes[] | null>(null)
    const [ expenseArray, setExpenseArray ] = useState<CustomExpenseTypes[] | null>(null)

    const [ accounts, setAccounts ] = useState<{ accountId:number, accountName:string, accountBadge:string }[] | null>(null)
    const [ creatingRelations, setCreatingRelations ] = useState(false)

    // Handlers
    async function onAddIncomePressHandler() {
        if ( incomeAmount === '' || incomeAmount.trim().length === 0 )  {
            setIncomeAmountError(true)
        } else {
            setIncomeAmountError(false)
        }
        if ( !selectedIncomeAccount ) {
            setCustomIncomeAccountsError(true)
        } else {
            setCustomIncomeAccountsError(false)
        }
        if ( customIncomeName === '' || customIncomeName.trim().length === 0 )  {
            setCustomIncomeNameError(true)
        } else {
            setCustomIncomeNameError(false)
        }

        if ( selectedIncomeAccount && !incomeAmountError && !customIncomeNameError && !customIncomeAccountsError) {
            const nowTimeDate = getLocalTime().toISOString()
            await addNewCustomIncome(customIncomeName, incomeComment, Number(incomeAmount), selectedIncomeAccount.accountId, focusedDate, nowTimeDate)
            setCustomIncomeName('')
            setSelectedIncomeAccount(null)
            setIncomeAmount('')
            setIncomeComment('')
            await fetchIncomes()
        }
    }
    async function onAddExpensePressHandler() {
        setCreatingRelations(true)
        if ( expenseAmount === '' || expenseAmount.trim().length === 0 )  {
            setExpenseAmountError(true)
        } else {
            setExpenseAmountError(false)
        }
        if ( !selectedExpenseAccount ) {
            setCustomExpenseAccountsError(true)
        } else {
            setCustomExpenseAccountsError(false)
        }
        if ( customExpenseName === '' || customExpenseName.trim().length === 0 )  {
            setCustomExpenseNameError(true)
        } else {
            setCustomExpenseNameError(false)
        }

        if ( selectedExpenseAccount && !expenseAmountError && !customExpenseNameError && !customExpenseAccountsError) {
            const nowTimeDate = getLocalTime().toISOString()
            await addNewCustomExpense(customExpenseName, expenseComment, Number(expenseAmount), selectedExpenseAccount.accountId, focusedDate, nowTimeDate)
            setCustomExpenseName('')
            setSelectedExpenseAccount(null)
            setExpenseAmount('')
            setExpenseComment('')
            await fetchExpenses()
        }
        setCreatingRelations(false)
    }

    async function handleAccountSelector() {
        const fetchedAccounts = await getActiveAccounts()
        setAccounts(fetchedAccounts)
        openSheetCaller()
    }

    const isIncome = useRef<boolean>(undefined)
    function handleIncomeAccountSelector() {
        isIncome.current = true
        handleAccountSelector()
    }
    function handleExpenseAccountSelector() {
        isIncome.current = false
        handleAccountSelector()
    }

    function onAccountPress(account:{ accountId:number, accountName:string, accountBadge:string }) {
        if ( isIncome.current ) {
            setSelectedIncomeAccount(account)
        } else {            
            setSelectedExpenseAccount(account)
        }
        closeSheetCaller()
    }

    function calculateTotal(array:CustomIncomeTypes[] | CustomExpenseTypes[]) {
        let total = 0
        array.forEach( item => {
            total = total + item.amount
        })
        return total
    }

    async function transferToJournal() {
        if ( incomeArray && incomeArray.length !== 0 ) {

            // Calculate Total Income
            const totalIncome = calculateTotal( incomeArray )

            // If is there is record with relation
            const id = await checkCustomIncome(focusedDate)
            if ( id ) {
                await updateCustomIncomeRelation( totalIncome, id.typeId ) // Update is yes
            } else {
                // create new record on income and relation with customIncome
                const incomeId = await createCustomRecordOnIncome(focusedDate, getLocalTime(), totalIncome/100)
                await createRelationOnIncome(focusedDate, incomeId)
            }

        }

        if ( expenseArray && expenseArray.length !== 0 ){

            // Calculate Total Expense
            const totalExpense = calculateTotal( expenseArray )

            // If is there is record with relation
            const id = await checkCustomExpense(focusedDate)
            if ( id ) {
                await updateCustomExpenseRelation ( totalExpense, id.typeId ) // Update is yes
            } else {
                // create new record on income and relation with customIncome
                const incomeId = await createCustomRecordOnExpense(focusedDate, getLocalTime(), totalExpense/100)
                await createRelationOnExpense(focusedDate, incomeId)
            }
        }

        navigation.goBack()
    }

    // DB Fetching
    async function fetchIncomes() {
        const incomes = await getCustomIncomes(focusedDate)
        setIncomeArray(incomes)
    }

    async function fetchExpenses() {
        const expenses = await getCustomExpenses(focusedDate)
        setExpenseArray(expenses)
    }

    async function initialFetch() {
        await fetchIncomes()
        await fetchExpenses()
    }

    useEffect(() => {
        navigation.setOptions({title:longDate})
        initialFetch()
    },[])
    
  
    // Bottom Sheet things including backdrop
    function closeSheetCaller() {
        closeBottomSheet(sheetRef)
    }

    function openSheetCaller() {
        openBottomSheet(sheetRef)
    }

    const sheetRef = useRef<BottomSheet>(null);
    const backDrop = useCallback(( props:BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            opacity={0.5}
            onPress={() => {
                closeSheetCaller()
            }}  
        />
    ),[])
    return (
        <>
        <ScrollView style={{backgroundColor:colors.light.white}}>
            <View style={RecordStyles.CreateJournalWrapper}>
                <Text style={RecordStyles.TypeText}>Income</Text>
                <View style={RecordStyles.TypeItemsWrapper}>
                    {
                        incomeArray?
                            incomeArray.length !== 0 ?
                            incomeArray.map(incomeItem => (
                                <CreateCustomCustomTypeItem key={incomeItem.customIncomeId} item={incomeItem} />
                            ))
                            :
                            <Text style={CommonStyles.NoActionText}>No Records</Text>
                        :
                        <ActivityIndicator size={'small'} color={colors.light.primary} />
                    }
                </View>
                <AddItemForm 
                amount={incomeAmount}
                setAmount={setIncomeAmount}
                onAddPressHandler={onAddIncomePressHandler}
                comment={incomeComment}
                setComment={setIncomeComment}
                amountError={incomeAmountError}
                setAmountError={setIncomeAmountError}
                handleCategorySelector={null}
                selectedCategory={undefined}
                handleAccountSelector={handleIncomeAccountSelector}
                selectedAccount={selectedIncomeAccount}
                isCustomForm={true}
                customName={customIncomeName}
                setCustomName={setCustomIncomeName}
                customTypeNameError={customIncomeNameError}
                accountError={customIncomeAccountsError}
                categoryError={undefined}
                isEdit={false}
                handleDeletion={undefined}
                handleUpdate={undefined}
                longPressWarn={undefined}
                setLongPressWarn={undefined}
                />
                <Text style={RecordStyles.TypeText}>Expense</Text>
                <View style={RecordStyles.TypeItemsWrapper}>
                    {
                        expenseArray ?
                            expenseArray.length !== 0 ?
                            expenseArray.map(expenseItem => (
                                <CreateCustomCustomTypeItem key={expenseItem.customExpenseId} item={expenseItem} />
                            ))
                            :
                            <Text style={CommonStyles.NoActionText}>No Records</Text>
                        : 
                        <ActivityIndicator size={'small'} color={colors.light.primary} />
                    }
                </View>
                <AddItemForm 
                amount={expenseAmount}
                setAmount={setExpenseAmount}
                onAddPressHandler={onAddExpensePressHandler}
                comment={expenseComment}
                setComment={setExpenseComment}
                amountError={expenseAmountError}
                setAmountError={setExpenseAmountError}
                handleCategorySelector={null}
                selectedCategory={undefined}
                handleAccountSelector={handleExpenseAccountSelector}
                selectedAccount={selectedExpenseAccount}
                isCustomForm={true}
                customName={customExpenseName}
                setCustomName={setCustomExpenseName}
                customTypeNameError={customExpenseNameError}
                accountError={customExpenseAccountsError}
                categoryError={undefined}
                isEdit={false}
                handleDeletion={undefined}
                handleUpdate={undefined}
                longPressWarn={undefined}
                setLongPressWarn={undefined}
                />                
                <AddToRecordButton 
                onPress={transferToJournal} 
                isActive={ incomeArray?.length !== 0 || expenseArray?.length !== 0 }
                creatingRelations={creatingRelations}
                />
            </View>
        </ScrollView>


        <BottomSheet 
            index={-1} 
            enableDynamicSizing={true}
            enablePanDownToClose={true}
            ref={sheetRef}
            backdropComponent={backDrop}
            // onChange={handleSuspendNotificationState}
            >
            <BottomSheetView>
            < FormAccountWrapper accounts={accounts} onAccountPress={onAccountPress}/>
            </BottomSheetView>
        </BottomSheet>
        </>
    )
}