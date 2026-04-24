import AddCategoryButton from '@/components/addCategoryButton';
import OptionsDisplay from '@/components/bottomSheetOptionsDisplay';
import BottomSheetRecurring from '@/components/bottomSheetRecurring';
import UniversalSheetWrapper from '@/components/bottomSheetWrapper';
import FormAccountWrapper from '@/components/recordFormAccountWrapper';
import RecurringContentWrapper from '@/components/recurringContentWrapper';
import { ItemContext } from '@/context/recurringContext';
import { addNewExpenseRecurringCategory, addNewIncomeRecurringCategory } from '@/db/recurring/insert';
import { getActiveAccounts, getExpenseRecurringBadges, getExpenseRecurringCategories, getIncomeReccuringBadges, getIncomeRecurringCategories } from '@/db/recurring/select';
import { suspendRecurringExpenseCategory, suspendRecurringIncomeCategory, updateRecurringExpenseCategory, updateRecurringIncomeCategory } from '@/db/recurring/update';
import { badgeSorter, checkTypes, closeBottomSheet, openBottomSheet, sheetNavigationDuplicationIdentify } from '@/func/bottomSheetfunc';
import { addFourMonths, addOneDay, addOneMonth, addOneYear, addSevenDays, addSixMonths, addThreeMonths, getLocalTime } from '@/func/time';
import { ActiveAccountsProps } from '@/types/recordsTypeItemType.schema';
import { RecurringCategory } from '@/types/recurring.schema';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetView } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SettingsStackParamList } from './SettingsStackNavigation';

type Props = StackScreenProps<SettingsStackParamList, 'Recurring'>


export default function Recurring({route}:Props){

    const navigation = useNavigation()
    const { screen } = route.params

    // States and Variabels
    const [ badges, setBadges ] = useState<{ id: number, label: null; value: string; }[]>([])
    const [ inputName, setInputName ] = useState('')
    const [ inputAmount, setInputAmount ] = useState('')
    const [ inputBadge, setInputBadge ] = useState('')
    const [ allowedDates, setAllowedDates ] = useState<31 | 30 | 28>(31)
    const [ inputNameError, setInputNameError ] = useState(false)
    const [ inputAmountError , setInputAmountError ] = useState(false)
    const frequency = [
        {id: 1, label: 'Yearly', value:'Yearly'},
        {id: 2, label: '6 Months', value:'6 Months'},
        {id: 3, label: '4 Months', value:'4 Months'},
        {id: 4, label: '3 Months', value:'3 Months'},
        {id: 5, label: 'Monthly', value:'Monthly'},
        {id: 6, label: 'Weekly', value:'Weekly'},
        {id: 7, label: 'Daily', value:'Daily'}
    ]
    const frequencyMonth = [
        {id: 0, label: 'January', value:'0'},
        {id: 1, label: 'February', value:'1'},
        {id: 2, label: 'March', value:'2'},
        {id: 3, label: 'April', value:'3'},
        {id: 4, label: 'May', value:'4'},
        {id: 5, label: 'June', value:'5'},
        {id: 6, label: 'July', value:'6'},
        {id: 7, label: 'August', value:'7'},
        {id: 8, label: 'September', value:'8'},
        {id: 9, label: 'October', value:'9'},
        {id: 10, label: 'November', value:'10'},
        {id: 11, label: 'December', value:'11'},
    ]
    const frequencyDate = Array.from({ length: allowedDates }, (_, i) => ({
        id: i+1,
        label: (i + 1).toString(),
        value: (i + 1).toString()
        }));
    const frequencyDay = [
        { id: 1, label: 'Monday', value: '1' },
        { id: 2, label: 'Tuesday', value: '2' },
        { id: 3, label: 'Wednesday', value: '3' },
        { id: 4, label: 'Thursday', value: '4' },
        { id: 5, label: 'Friday', value: '5' },
        { id: 6, label: 'Saturday', value: '6' },
        { id: 7, label: 'Sunday', value: '0' }
    ]
    const frequencyTime = [
        { id: 1, label: '00:00', value: '00:00' },
        { id: 2, label: '03:00', value: '03:00' },
        { id: 3, label: '06:00', value: '06:00' },
        { id: 4, label: '09:00', value: '09:00' },
        { id: 5, label: '12:00', value: '12:00' },
        { id: 6, label: '15:00', value: '15:00' },
        { id: 7, label: '18:00', value: '18:00' },
        { id: 8, label: '21:00', value: '21:00' }
    ]
    const recurringIncomeBadges = [
        {id:1, label:null, value:'#0F3D2E'},
        {id:2, label:null, value:'#145A32'},
        {id:3, label:null, value:'#1B6E3A'},
        {id:4, label:null, value:'#238844'},
        {id:5, label:null, value:'#2DA14E'},
        {id:6, label:null, value:'#1E5631'},
        {id:7, label:null, value:'#2F6F4E'},
        {id:8, label:null, value:'#3F8A63'},
        {id:9, label:null, value:'#4FA678'},
        {id:10, label:null, value:'#63C08F'},
        {id:11, label:null, value:'#3A6B35'},
        {id:12, label:null, value:'#4F8A41'},
        {id:13, label:null, value:'#65A94E'},
        {id:14, label:null, value:'#7BC85C'},
        {id:15, label:null, value:'#98E17A'}
    ]
    const recurringExpenseBadges = [
        {id:1, label:null, value:'#7A3E00'},
        {id:2, label:null, value:'#8C4600'},
        {id:3, label:null, value:'#9E4F00'},
        {id:4, label:null, value:'#B05800'},
        {id:5, label:null, value:'#C26100'},
        {id:6, label:null, value:'#D36A00'},
        {id:7, label:null, value:'#E47300'},
        {id:8, label:null, value:'#F57C00'},
        {id:9, label:null, value:'#FF850F'},
        {id:10, label:null, value:'#FF8F24'},
        {id:11, label:null, value:'#A84F1D'},
        {id:12, label:null, value:'#C45D1F'},
        {id:13, label:null, value:'#E06B21'},
        {id:14, label:null, value:'#FF7A2F'},
        {id:15, label:null, value:'#FF944D'}
    ]
    const [ accounts, setAccounts ] = useState<ActiveAccountsProps[]>([])
    const [ inputFrequency, setInputFrequency ] = useState(frequency[0].value)
    const [ inputFrequencyMonth, setInputFrequencyMonth ] = useState<number>(Number(frequencyMonth[0].value))
    const [ inputFrequencyDate, setInputFrequencyDate ] = useState<number>(Number(frequencyDate[0].value))
    const [ inputFrequencyDay, setInputFrequencyDay ] = useState(Number(frequencyDay[0].value))
    const [ inputFrequencyTime, setInputFrequencyTime ] = useState(frequencyTime[0].value)
    const [ inputAccount, setInputAccount ] = useState<ActiveAccountsProps>(accounts[0])
    const [ categories, setCategories ] = useState<RecurringCategory[]>([]);
    const [ isCategoriesReady, setIsCategoriesReady ] = useState(false)
    const [ focusedCategory, setFocusedCategory ] = useState<RecurringCategory | null>(null)
    const [ suspendNotification, setSuspendNotification ] = useState(false)
    
    let type:'Income' | 'Expense';
    let getTypeRecurringBadges:() => Promise<{badge:string}[]>
    let recurringTypeBadges:{id: number, label:null, value:string}[]
    let addNewTypeRecurringCategory:(name:string,badge:string,recurringFrequency:string,amount:number,accountId:number,nextOccurrence:string) => void;
    let getTypeRecurringCategories: () => Promise<any>;
    let suspendRecurringTypeCategory: (id: number) => Promise<number>;
    let updateRecurringTypeCategory: (id:number,
                                        name:string,
                                        badge:string,
                                        amount:number,
                                        recurringFrequency:string,
                                        accountId:number,
                                        nextOccurance:string) => void;

    if( screen === 'Recurring Income'){
        type = 'Income'
        getTypeRecurringBadges = getIncomeReccuringBadges
        recurringTypeBadges = recurringIncomeBadges
        addNewTypeRecurringCategory = addNewIncomeRecurringCategory
        getTypeRecurringCategories = getIncomeRecurringCategories
        suspendRecurringTypeCategory = suspendRecurringIncomeCategory
        updateRecurringTypeCategory = updateRecurringIncomeCategory
    } else {
        type = 'Expense'
        getTypeRecurringBadges = getExpenseRecurringBadges
        recurringTypeBadges = recurringExpenseBadges
        addNewTypeRecurringCategory = addNewExpenseRecurringCategory
        getTypeRecurringCategories = getExpenseRecurringCategories
        suspendRecurringTypeCategory = suspendRecurringExpenseCategory
        updateRecurringTypeCategory = updateRecurringExpenseCategory
    }

    // functions
    async function refreshBadges() {
        const fetchedBadges = await getTypeRecurringBadges()
        const valiedBadges = badgeSorter(recurringTypeBadges, fetchedBadges)
        setBadges(valiedBadges)
    }

    async function fetchActiveAccounts(){
        const accounts = await getActiveAccounts()
        setAccounts(accounts)
        setInputAccount(accounts[0])
    }

    async function initialDBFetch() {
        await refreshBadges()
        await fetchActiveAccounts()
        await getCategories()
    }

    async function eventDBFetch() {
        await refreshBadges()
        await getCategories()
    }

    function createNextOccurance(){
        const now = getLocalTime()

        const [ hours, minutes ] = inputFrequencyTime.split(':').map(Number)
        const year = new Date().getFullYear()

        let nextOccurrence:any
        let month;
        let date;
        let day;
        let addition:(time:any) => void;

        switch (inputFrequency) {
            case frequency[0].value:     
                date = inputFrequencyDate
                month = inputFrequencyMonth           
                addition = addOneYear
                break;
            case frequency[1].value:
                date = inputFrequencyDate
                month = inputFrequencyMonth           
                addition = addSixMonths
                break;
            case frequency[2].value:
                date = inputFrequencyDate
                month = inputFrequencyMonth           
                addition = addFourMonths                
                break;
            case frequency[3].value:
                date = inputFrequencyDate
                month = inputFrequencyMonth           
                addition = addThreeMonths
                break;
            case frequency[4].value:
                date = inputFrequencyDate
                month = new Date().getMonth()           
                addition = addOneMonth
                break;
            case frequency[5].value:
                date = new Date().getDate()
                month = new Date().getMonth()  
                addition = addSevenDays
                const todayDay = now.getUTCDay()
                const difference = Number(inputFrequencyDay) - todayDay
                date = date + difference
                break;
            case frequency[6].value:
                date = new Date().getDate()
                month = new Date().getMonth()  
                addition = addOneDay
                break;
        
            default:
                addition = addOneDay
                break;
        }
        nextOccurrence = new Date(Date.UTC(year, month, date, hours, minutes))

        while ( now > nextOccurrence){
            addition(nextOccurrence)
        }
        
        return nextOccurrence.toISOString()
    }

    function resetFields() {
        setInputName('')
        setInputAmount('')
    }

    async function getCategories() {
        setIsCategoriesReady(false)
        const fetchedCategories = await getTypeRecurringCategories()
        setCategories(fetchedCategories)
        setIsCategoriesReady(true)
    }
        
    // Callers
    function openSheetCaller(){
        openBottomSheet(sheetRef)
    }
    
    function closeSheetCaller(){
        closeBottomSheet(sheetRef)}

    function resetSheetStates(){
        setInputNameError(false)
        setInputAmountError(false)
        resetFields()
        setFocusedCategory(null)
        setSuspendNotification(false)
    }

    // Handlers
    async function saveHandler(){      
        if ( inputName === '' || inputName.trim().length === 0 ) {
            setInputNameError(true)
        } else {
            setInputNameError(false)
        }  

        if ( !inputNameError ) {
            const nextOccurrence = createNextOccurance()
            addNewTypeRecurringCategory(inputName,inputBadge,inputFrequency, Number(inputAmount), inputAccount.accountId, nextOccurrence)
            await refreshBadges()
            await getCategories()
            closeSheetCaller() 
        }             
    }

    function editStart(category:RecurringCategory){
        setFocusedCategory(category)
        openSheetCaller()
    }

    async function updateHandler(){
        if ( focusedCategory ) {
            updateRecurringTypeCategory(focusedCategory.categoryId, 
                                        inputName,
                                        inputBadge,
                                        Number(inputAmount),
                                        inputFrequency,
                                        inputAccount.accountId,
                                        createNextOccurance()
            )
            closeSheetCaller()
            await eventDBFetch()
        }
    }

    async function suspendHandler() {
        if ( focusedCategory ) {
            await suspendRecurringTypeCategory(focusedCategory.categoryId)
            closeSheetCaller()
            await eventDBFetch()
        }
    }

    function onFrequencyPress( label: string, value: string ) {
        setInputFrequency(value)
        goBack()
    }
    function onFrequencyMonthPress( label:string, value: string ) {
        setInputFrequencyMonth(Number(value))
        if (label === 'April' || label === 'June' || label === 'September' || label === 'November'){
            setAllowedDates(30)
        } else if (label === 'February'){
            setAllowedDates(28)
        } else {
            setAllowedDates(31)
        }
        goBack()
    }
    function onFrequencyDatePress( label:string, value: string ) {
        setInputFrequencyDate(Number(value))
        goBack()
    }
    function onFrequencyDayPress( label:string, value: string ) {
        setInputFrequencyDay(Number(value))
        goBack()
    }
    function onFrequencyTimePress( label:string, value: string ) {
        setInputFrequencyTime(value)
        goBack()
    }
    function onAccountPress( account: ActiveAccountsProps ) {
        setInputAccount(account)
        goBack()
    }
    function onBadgePress( label:string, value: string ) {
        setInputBadge(value)
        goBack()
    }

    // Sheets 
    const SCREENS = {
        Form: () => <BottomSheetRecurring
                            badges={badges}
                            inputAmount = {inputAmount}
                            setInputAmount = {setInputAmount}
                            inputBadge={inputBadge}
                            inputName = {inputName}
                            setInputName = {setInputName}
                            frequency = {frequency}
                            inputFrequency = {inputFrequency}
                            inputFrequencyMonth = {inputFrequencyMonth}
                            inputFrequencyDate = {inputFrequencyDate}
                            inputFrequencyDay={Number(inputFrequencyDay)}
                            inputFrequencyTime = {inputFrequencyTime}
                            saveHandler = {saveHandler}
                            checkTypes = {checkTypes}
                            accounts = {accounts}
                            inputAccount = {inputAccount}
                            inputNameError = {inputNameError}
                            setInputNameError = {setInputNameError}
                            inputAmountError = {inputAmountError}
                            setInputAmountError = {setInputAmountError}
                            focusedCategory={focusedCategory}
                            updateHandler={updateHandler}
                            suspendHandler={suspendHandler}
                            suspendNotification = {suspendNotification}
                            setSuspendNotification={ setSuspendNotification }
                            selectionScreenHandler={{
                                openFreq: goToFrequency,
                                openFreqMon: goToFrequencyMonth,
                                openFreqDate: goToFrequencyDate,
                                openFreqDay: goToFrequencyDay,
                                openFreqTime: goToFrequencyTime,
                                openAccount: goToAccountSelect,
                                openBadge: goToBadgeSelect
                            }}
                        />,
        Options: () => <OptionsDisplay options={currentOptions.current} itemsPerRow={currentItemsPerRow.current} isBadges={isBadges.current} onOptionPress={currentOnOptionPress.current} />,
        Account: () => <FormAccountWrapper accounts={accounts} multiSelect={undefined} onAccountPress={onAccountPress} />
    }

    const currentOptions = useRef<any[]>([])
    const currentItemsPerRow = useRef< number > (3)
    const currentOnOptionPress = useRef< ( label:string, value: string ) => void >( () => {} )
    const isBadges = useRef< boolean >(false)

    const prevStates = useRef< ( () => void )[] >([])
    const [ title, setTitle ] = useState('')
    const [ currentSheet, setCurrentSheet ] = useState< 'Form' | 'Options' | 'Account' >('Form')
    const Sheet = SCREENS[currentSheet]

    function goToForm(){
        setTitle(`Add Recurring ${type}`)
        setCurrentSheet('Form')
        prevStates.current = []
        prevStates.current = sheetNavigationDuplicationIdentify( prevStates.current, goToForm)
    }
    function goToFrequency() {
        currentOptions.current = frequency
        currentItemsPerRow.current = 3
        currentOnOptionPress.current = onFrequencyPress
        isBadges.current = false
        setTitle('Select Frequency')
        setCurrentSheet('Options')
        prevStates.current = sheetNavigationDuplicationIdentify( prevStates.current, goToFrequency)
    }
    function goToFrequencyMonth() {
        currentOptions.current = frequencyMonth
        currentItemsPerRow.current = 3
        currentOnOptionPress.current = onFrequencyMonthPress
        isBadges.current = false
        setTitle('Select Month')
        setCurrentSheet('Options')
        prevStates.current = sheetNavigationDuplicationIdentify( prevStates.current, goToFrequencyMonth)
    }
    function goToFrequencyDate() {
        currentOptions.current = frequencyDate
        currentItemsPerRow.current = 3
        currentOnOptionPress.current = onFrequencyDatePress
        isBadges.current = false
        setTitle('Select Date')
        setCurrentSheet('Options')
        prevStates.current = sheetNavigationDuplicationIdentify( prevStates.current, goToFrequencyDate)
    }
    function goToFrequencyDay() {
        currentOptions.current = frequencyDay
        currentItemsPerRow.current = 3
        currentOnOptionPress.current = onFrequencyDayPress
        isBadges.current = false
        setTitle('Select Day')
        setCurrentSheet('Options')
        prevStates.current = sheetNavigationDuplicationIdentify( prevStates.current, goToFrequencyDay)
    }
    function goToFrequencyTime() {
        currentOptions.current = frequencyTime
        currentItemsPerRow.current = 2
        currentOnOptionPress.current = onFrequencyTimePress
        isBadges.current = false
        setTitle('Select Time')
        setCurrentSheet('Options')
        prevStates.current = sheetNavigationDuplicationIdentify( prevStates.current, goToFrequencyTime)
    }
    function goToAccountSelect() {
        setTitle('Select Account')
        setCurrentSheet('Account')
        prevStates.current = sheetNavigationDuplicationIdentify( prevStates.current, goToAccountSelect)
    }
    function goToBadgeSelect() {
        currentOptions.current = badges
        currentItemsPerRow.current = 3
        currentOnOptionPress.current = onBadgePress
        isBadges.current = true
        setTitle('Select a Badge')
        setCurrentSheet('Options')
        prevStates.current = sheetNavigationDuplicationIdentify( prevStates.current, goToBadgeSelect)
    }
    function goBack(){
        prevStates.current.pop()
        prevStates.current[prevStates.current.length - 1]()
    }

    // BottomSheet
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

    useEffect(() => {
        navigation.setOptions({title:screen})
        initialDBFetch()
        goToForm()
    },[])

    useEffect(() => {
        if (badges.length !== 0){
            setInputBadge(badges[0].value)
        }
    },[badges])

    useEffect(() => {
        if ( !focusedCategory ) { setInputFrequencyDate(Number(frequencyDate[0].value)) }        
    },[inputFrequencyMonth])

    useEffect(() => {
        if (focusedCategory){
            const accountObject = accounts.filter(account => {
                return account.accountId === focusedCategory.accountId
            })

            const frequencyObject = frequency.filter(item => {
                return item.value === focusedCategory.recurringFrequency
            })

            const badgeObject = recurringTypeBadges.filter(item => {
                return item.value === focusedCategory.badge
            })

            const [yearMonthDate, time] = focusedCategory.nextOccurrence?.split('T')
            const yearMonthDateArray = yearMonthDate?.split('-')

            const month = Number(yearMonthDateArray[1])-1

            const date = Number(yearMonthDateArray[2])

            const specificDate = new Date(Number(yearMonthDateArray[0]), month, date)
            const day = specificDate.getDay()

            const hourMinArray = time.split(':')
            hourMinArray.pop()
            const hourMin = hourMinArray.join(':')

            setInputName(focusedCategory.name)
            setInputAmount((focusedCategory.amount / 100).toString())
            setInputAccount(accountObject[0])
            setInputFrequency(frequencyObject[0].value)
            setInputFrequencyMonth(month)
            setInputFrequencyDate(date)
            setInputFrequencyDay(day)
            setInputBadge(badgeObject[0].value)
            setInputFrequencyTime(hourMin)
        } else {
            setInputFrequency(frequency[0].value)
            setInputFrequencyTime(frequencyTime[0].value)
            setInputFrequencyDate(Number(frequencyDate[0].value))
            setInputFrequencyDay(Number(frequencyDay[0].value))
            setInputFrequencyMonth(Number(frequencyMonth[0].value))
            if (accounts.length !==0) {setInputAccount(accounts[0] )}
            if (badges.length !==0) {setInputBadge(badges[0].value)}
        }
    },[focusedCategory])

    return (
        <>
            <View style={{backgroundColor:'#ffffff', flex:1}} >
                <ScrollView showsVerticalScrollIndicator={false}>

                    <ItemContext value={editStart}>
                    <RecurringContentWrapper
                        categories={categories}
                        isCategoriesReady = {isCategoriesReady}
                    />
                    </ItemContext>

                </ScrollView>
                
                <AddCategoryButton openSheetCaller={openSheetCaller} />

                <BottomSheet 
                    index={-1} 
                    enableDynamicSizing={true}
                    enablePanDownToClose={true}
                    ref={sheetRef}
                    backdropComponent={backDrop}
                    onChange={ index => {
                        if ( index === -1 ) {
                            resetSheetStates()
                        }
                    }}
                    >
                    <BottomSheetView>
                        <UniversalSheetWrapper onBackPress={goBack} onCrossPress={closeSheetCaller} title={title} goBackavailable={ prevStates.current.length !== 1 }>
                            {Sheet()}
                        </UniversalSheetWrapper>
                    </BottomSheetView>
                </BottomSheet>

            </View>
        </>
        
    )
}