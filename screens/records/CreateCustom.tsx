import AddButton from '@/components/createCustomAddButton';
import AddItemForm from '@/components/recordAddItemForm';
import FormAccountWrapper from '@/components/recordFormAccountWrapper';
import CreateCustomCustomTypeItem from '@/components/recordsCreateCustomCustomTypeItem';
import colors from '@/constants/colors';
import { deleteCustomExpense, deleteCustomExpenseRelationOnExpense, deleteCustomIncome, deleteCustomIncomeRelationOnIncome } from '@/db/records/delete';
import { addNewCustomExpense, addNewCustomIncome, createCustomRecordOnExpense, createCustomRecordOnIncome, createRelationOnExpense, createRelationOnIncome } from '@/db/records/insert';
import { checkCustomExpense, checkCustomIncome, getActiveAccounts, getCustomExpenses, getCustomIncomes } from '@/db/records/select';
import { updateCustomExpense, updateCustomExpenseRelation, updateCustomIncome, updateCustomIncomeRelation } from '@/db/records/update';
import { closeBottomSheet, openBottomSheet } from '@/func/bottomSheetfunc';
import { getLocalTime, getLongDate } from '@/func/time';
import CommonStyles from '@/styles/commonStyles';
import RecordStyles from '@/styles/recordsStyles';
import { CustomTypeProps } from '@/types/recordsTypeItemType.schema';
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
    const [ selectedTypeAccount, setSelectedTypeAccount ] = useState<{ accountId:number, accountName:string, accountBadge:string } | null>(null)
    const [ typeComment, setTypeComment ] = useState<string>('')
    const [ typeAmountError, setTypeAmountError ] = useState(false)
    const [ typeAmount, setTypeAmount ] = useState<string>('')
    const [ customTypeName, setCustomTypeName ] = useState('')
    const [ customTypeNameError, setCustomTypeNameError ] = useState(false)
    const [ customTypeAccountsError, setCustomTypeAccountsError ] = useState(false)
    

    const [ incomeArray, setIncomeArray ] = useState<CustomTypeProps[] | null>(null)
    const incomeArrayRef = useRef<CustomTypeProps[] | null>(null) // Ref for create relations along with custom type creation
    const [ expenseArray, setExpenseArray ] = useState<CustomTypeProps[] | null>(null)
    const expenseArrayRef = useRef< CustomTypeProps[] | null >(null)

    const [ accounts, setAccounts ] = useState<{ accountId:number, accountName:string, accountBadge:string }[] | null>(null)

    const [ isIncome, setIsIncome ] = useState(true)

    let addNewCustomType : ( name:string, comment:string | null, amount:number, accountId:number, date:string, createdDateTime:string ) => Promise<void>;
    let deleteCustomType: ( id: number ) => Promise<void>;
    let updateCustomType: ( name:string, accountId:number, comment:string | null, amount:number, id:number) => Promise<void>;
    if ( isIncome ) {
        addNewCustomType = addNewCustomIncome
        deleteCustomType = deleteCustomIncome
        updateCustomType = updateCustomIncome
    } else {
        addNewCustomType = addNewCustomExpense
        deleteCustomType = deleteCustomExpense
        updateCustomType = updateCustomExpense
    }

    // function
    function checkValidity() {
        if ( typeAmount === '' || typeAmount.trim().length === 0 )  {
            setTypeAmountError(true)
        } else {
            setTypeAmountError(false)
        }
        if ( !selectedTypeAccount ) {
            setCustomTypeAccountsError(true)
        } else {
            setCustomTypeAccountsError(false)
        }
        if ( customTypeName === '' || customTypeName.trim().length === 0 )  {
            setCustomTypeNameError(true)
        } else {
            setCustomTypeNameError(false)
        }

    }

    function calculateTotal(array:CustomTypeProps[]) {
        let total = 0
        array.forEach( item => {
            total = total + item.amount
        })
        return total
    }

    // Handlers
    async function onAddPressHandler() {

        checkValidity()

        if ( selectedTypeAccount && !typeAmountError && !customTypeNameError && !customTypeAccountsError) {

            closeSheetCaller()
            const nowTimeDate = getLocalTime().toISOString()
            await addNewCustomType(customTypeName, typeComment, Number(typeAmount), selectedTypeAccount.accountId, focusedDate, nowTimeDate)
            await initialFetch()
            await transferToJournal()
        }
    }

    async function handleAccountSelector() {
        const fetchedAccounts = await getActiveAccounts()
        setAccounts(fetchedAccounts)
        setCurrentScreen('Accounts')
    }

    function handleIncomeAddPress() {
        setIsIncome(true)
        setIsEdit( false )
        openSheetCaller()
    }

    function handleExpenseAddPress() {
        setIsIncome(false)
        setIsEdit( false )
        openSheetCaller()
    }

    function onAccountPress(account:{ accountId:number, accountName:string, accountBadge:string }) {
        setSelectedTypeAccount(account)
        setCurrentScreen('DEFAULT')
    }

    async function transferToJournal() {
        // If is there is record with relation
        const IncomeId = await checkCustomIncome(focusedDate)

        if ( incomeArrayRef.current && incomeArrayRef.current.length !== 0 ) {
            
            // Calculate Total Income
            const totalIncome = calculateTotal( incomeArrayRef.current )

            if ( IncomeId ) {
                await updateCustomIncomeRelation( totalIncome, IncomeId.typeId ) // Update is yes
            } else {
                // create new record on income and relation with customIncome
                const incomeId = await createCustomRecordOnIncome(focusedDate, getLocalTime().toISOString(), totalIncome)
                await createRelationOnIncome(focusedDate, incomeId)
            }

        } else {
            if ( IncomeId ) {
                await deleteCustomIncomeRelationOnIncome( IncomeId.typeId )
            }
        }

        // If is there is record with relation
        const expenseId = await checkCustomExpense(focusedDate)
        if ( expenseArrayRef.current && expenseArrayRef.current.length !== 0 ){

            // Calculate Total Expense
            const totalExpense = calculateTotal( expenseArrayRef.current )

            if ( expenseId ) {
                await updateCustomExpenseRelation ( totalExpense, expenseId.typeId ) // Update is yes
            } else {
                // create new record on income and relation with customIncome
                const incomeId = await createCustomRecordOnExpense(focusedDate, getLocalTime().toISOString(), totalExpense)
                await createRelationOnExpense(focusedDate, incomeId)
            }
        } else {
            if ( expenseId ) {
                await deleteCustomExpenseRelationOnExpense( expenseId.typeId )
            }
        }
    }

    // DB Fetching
    async function fetchIncomes() {
        const incomes = await getCustomIncomes(focusedDate)
        incomeArrayRef.current = incomes
        setIncomeArray(incomes)
    }

    async function fetchExpenses() {
        const expenses = await getCustomExpenses(focusedDate)
        expenseArrayRef.current = expenses
        setExpenseArray(expenses)
    }

    async function initialFetch() {
        await fetchIncomes()
        await fetchExpenses()
    }

    // EDIT
    const  focusedItem = useRef< CustomTypeProps | undefined >(undefined)
    const [ isEdit, setIsEdit ] = useState(false)
    const [ longPressWarn, setLongPressWarn ] = useState(false)

    function updateStatesOnFocus() {
        if ( focusedItem.current ) {
            setIsEdit(true)
            setCustomTypeName(focusedItem.current.name)
            setSelectedTypeAccount( { accountId: focusedItem.current.accountId, accountName: focusedItem.current.accountName, accountBadge: focusedItem.current.accountBadge } )
            setTypeAmount( ( focusedItem.current.amount/100 ).toString() )
            if ( focusedItem.current.comment ) {
                setTypeComment( focusedItem.current.comment )
            }
        }
    }

    function onIncomePress( item: CustomTypeProps ) {
        setIsIncome(true)
        focusedItem.current = item
        updateStatesOnFocus()
        openSheetCaller()
    }

    function onExpensePress( item: CustomTypeProps ) {
        setIsIncome(false)
        focusedItem.current = item
        updateStatesOnFocus()
        openSheetCaller()
    }

    async function onDeletePress() {
        if ( focusedItem.current ) {
            deleteCustomType(focusedItem.current.customTypeId)
            closeSheetCaller()
            await initialFetch()
            await transferToJournal()
        }
    }

    async function onUpdatePress() {


        checkValidity()

        if ( selectedTypeAccount && !typeAmountError && !customTypeNameError && !customTypeAccountsError && focusedItem.current) {
            updateCustomType( customTypeName, selectedTypeAccount?.accountId, typeComment, Number(typeAmount), focusedItem.current.customTypeId)
            closeSheetCaller()
            await initialFetch()
            await transferToJournal()
        }
    }

    // useEffects
    useEffect(() => {
        navigation.setOptions({title:longDate})
        initialFetch()
    },[])
    
  
    // Bottom Sheet things including backdrop
    function closeSheetCaller() {
        closeBottomSheet(sheetRef)
        setCustomTypeName('')
        setSelectedTypeAccount(null)
        setTypeAmount('')
        setTypeComment('')
        setCustomTypeNameError(false)
        setTypeAmountError(false)
        setCustomTypeAccountsError(false)
        setLongPressWarn(false)
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

    // Multi Screen BottomSheet
    const SCREENS = {
        Accounts: () => < FormAccountWrapper accounts={accounts} onAccountPress={onAccountPress}/>,

        DEFAULT: () => 
            <View style={{margin:16}}>
                <AddItemForm
                amount={typeAmount}
                setAmount={setTypeAmount}
                onAddPressHandler={onAddPressHandler}
                comment={typeComment}
                setComment={setTypeComment}
                amountError={typeAmountError}
                setAmountError={setTypeAmountError}
                handleCategorySelector={null}
                selectedCategory={undefined}
                handleAccountSelector={handleAccountSelector}
                selectedAccount={selectedTypeAccount}
                isCustomForm={true}
                customName={customTypeName}
                setCustomName={setCustomTypeName}
                customTypeNameError={customTypeNameError}
                accountError={customTypeAccountsError}
                categoryError={undefined}
                isEdit={isEdit}
                longPressWarn={longPressWarn}
                setLongPressWarn={setLongPressWarn}
                handleDeletion={onDeletePress}
                handleUpdate={onUpdatePress}
                />
            </View>
    }

    const [ currentScreen, setCurrentScreen ] = useState< 'DEFAULT' | 'Accounts' >('DEFAULT')



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
                                <CreateCustomCustomTypeItem key={incomeItem.customTypeId} item={incomeItem} onPress={onIncomePress}/>
                            ))
                            :
                            <Text style={CommonStyles.NoActionText}>No Records</Text>
                        :
                            <ActivityIndicator size={'small'} color={colors.light.primary} />
                    }
                </View>
                <AddButton onPress={handleIncomeAddPress} />
                <Text style={RecordStyles.TypeText}>Expense</Text>
                <View style={RecordStyles.TypeItemsWrapper}>
                    {
                        expenseArray ?
                            expenseArray.length !== 0 ?
                            expenseArray.map(expenseItem => (
                                <CreateCustomCustomTypeItem key={expenseItem.customTypeId} item={expenseItem} onPress={onExpensePress}/>
                            ))
                            :
                            <Text style={CommonStyles.NoActionText}>No Records</Text>
                        : 
                            <ActivityIndicator size={'small'} color={colors.light.primary} />
                    }
                </View>
                <AddButton onPress={handleExpenseAddPress} />
            </View>
        </ScrollView>


        <BottomSheet 
            index={-1} 
            enableDynamicSizing={true}
            enablePanDownToClose={true}
            ref={sheetRef}
            backdropComponent={backDrop}
            >
            <BottomSheetView>
                {SCREENS[currentScreen]()}
            </BottomSheetView>
        </BottomSheet>
        </>
    )
}