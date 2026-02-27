import AddCategoryButton from '@/components/addCategoryButton';
import BottomSheetRecurring from '@/components/bottomSheetRecurring';
import RecurringContentWrapper from '@/components/recurringContentWrapper';
import { ItemContext } from '@/context/recurringContext';
import { addNewExpenseRecurringCategory, addNewIncomeRecurringCategory } from '@/db/recurring/insert';
import { getActiveAccounts, getExpenseRecurringBadges, getExpenseRecurringCategories, getIncomeReccuringBadges, getIncomeRecurringCategories } from '@/db/recurring/select';
import { suspendRecurringExpenseCategory, suspendRecurringIncomeCategory, updateRecurringExpenseCategory, updateRecurringIncomeCategory } from '@/db/recurring/update';
import { badgeSorter, checkTypes, closeBottomSheet, openBottomSheet } from '@/func/bottomSheetfunc';
import { addFourMonths, addOneDay, addOneMonth, addOneYear, addSevenDays, addSixMonths, addThreeMonths, getLocalTime } from '@/func/time';
import { RecurringCategory } from '@/types/recurring.schema';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetView } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SettingsStackParamList } from './SettingsStackNavigation';

type Props = StackScreenProps<SettingsStackParamList, 'Recurring'>


export default function Recurring({route}:Props){

    const navigation = useNavigation()
    const { screen } = route.params

    // States and Variabels
    const [ badges, setBadges ] = useState<{ label: null; badge: string; }[]>([])
    const [ inputName, setInputName ] = useState('')
    const [ inputAmount, setInputAmount ] = useState('')
    const [ inputBadge, setInputBadge ] = useState('')
    const [ allowedDates, setAllowedDates ] = useState<31 | 30 | 28>(31)
    const [ inputNameError, setInputNameError ] = useState(false)
    const [ inputAmountError , setInputAmountError ] = useState(false)
    const frequency = [
        {label:'Yearly', value:'Yearly'},
        {label:'06 Months', value:'6 Months'},
        {label:'04 Months', value:'4 Months'},
        {label:'03 Months', value:'3 Months'},
        {label:'Monthly', value:'Monthly'},
        {label:'Weekly', value:'Weekly'},
        {label:'Daily', value:'Daily'}
    ]
    const frequencyMonth = [
        {label:'January', value:0},
        {label:'February', value:1},
        {label:'March', value:2},
        {label:'April', value:3},
        {label:'May', value:4},
        {label:'June', value:5},
        {label:'July', value:6},
        {label:'August', value:7},
        {label:'September', value:8},
        {label:'October', value:9},
        {label:'November', value:10},
        {label:'December', value:11},
    ]
    const frequencyDate = Array.from({ length: allowedDates }, (_, i) => ({
        label: (i + 1).toString(),
        value: i + 1
        }));
    const frequencyDay = [
        { label: 'Monday', value: 1 },
        { label: 'Tuesday', value: 2 },
        { label: 'Wednesday', value: 3 },
        { label: 'Thursday', value: 4 },
        { label: 'Friday', value: 5 },
        { label: 'Saturday', value: 6 },
        { label: 'Sunday', value: 0 }
    ]
    const frequencyTime = [
        { label: '00:00', value: '00:00' },
        { label: '03:00', value: '03:00' },
        { label: '06:00', value: '06:00' },
        { label: '09:00', value: '09:00' },
        { label: '12:00', value: '12:00' },
        { label: '15:00', value: '15:00' },
        { label: '18:00', value: '18:00' },
        { label: '21:00', value: '21:00' }
    ]
    const recurringIncomeBadges = [
        {label:null, badge:'#0F3D2E'},
        {label:null, badge:'#145A32'},
        {label:null, badge:'#1B6E3A'},
        {label:null, badge:'#238844'},
        {label:null, badge:'#2DA14E'},
        {label:null, badge:'#1E5631'},
        {label:null, badge:'#2F6F4E'},
        {label:null, badge:'#3F8A63'},
        {label:null, badge:'#4FA678'},
        {label:null, badge:'#63C08F'},
        {label:null, badge:'#3A6B35'},
        {label:null, badge:'#4F8A41'},
        {label:null, badge:'#65A94E'},
        {label:null, badge:'#7BC85C'},
        {label:null, badge:'#98E17A'}
    ]
    const recurringExpenseBadges = [
        {label:null, badge:'#7A3E00'},
        {label:null, badge:'#8C4600'},
        {label:null, badge:'#9E4F00'},
        {label:null, badge:'#B05800'},
        {label:null, badge:'#C26100'},
        {label:null, badge:'#D36A00'},
        {label:null, badge:'#E47300'},
        {label:null, badge:'#F57C00'},
        {label:null, badge:'#FF850F'},
        {label:null, badge:'#FF8F24'},
        {label:null, badge:'#A84F1D'},
        {label:null, badge:'#C45D1F'},
        {label:null, badge:'#E06B21'},
        {label:null, badge:'#FF7A2F'},
        {label:null, badge:'#FF944D'}
    ]
    const [ accountsArray, setAccountsArray ] = useState<{ label: string; value: number; }[]>([])
    const [ inputFrequency, setInputFrequency ] = useState(frequency[0].value)
    const [ inputFrequencyMonth, setInputFrequencyMonth ] = useState<number>(frequencyMonth[0].value)
    const [ inputFrequencyDate, setInputFrequencyDate ] = useState<number>(frequencyDate[0].value)
    const [ inputFrequencyDay, setInputFrequencyDay ] = useState(frequencyDay[0].value)
    const [ inputFrequencyTime, setInputFrequencyTime ] = useState(frequencyTime[0].value)
    const [ inputAccount, setInputAccount ] = useState<number>(0)
    const [ categories, setCategories ] = useState<RecurringCategory[]>([]);
    const [ isCategoriesReady, setIsCategoriesReady ] = useState(false)
    const [ focusedCategory, setFocusedCategory ] = useState<RecurringCategory | null>(null)
    const [ suspendNotification, setSuspendNotification ] = useState(false)
    
    let type:'income' | 'expense';
    let getTypeRecurringBadges:() => Promise<{badge:string}[]>
    let recurringTypeBadges:{label:null, badge:string}[]
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
        type = 'income'
        getTypeRecurringBadges = getIncomeReccuringBadges
        recurringTypeBadges = recurringIncomeBadges
        addNewTypeRecurringCategory = addNewIncomeRecurringCategory
        getTypeRecurringCategories = getIncomeRecurringCategories
        suspendRecurringTypeCategory = suspendRecurringIncomeCategory
        updateRecurringTypeCategory = updateRecurringIncomeCategory
    } else {
        type = 'expense'
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
        if ( accounts.length !== 0 ) {
            const array = Array.from({ length:accounts.length }, (_, i) => ({
                label:accounts[i].accountName,
                value:accounts[i].accountId
            }))
            setAccountsArray(array)
            setInputAccount(array[0].value)
        }
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
                const difference = inputFrequencyDay - todayDay
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
        closeBottomSheet(sheetRef)
        setInputNameError(false)
        setInputAmountError(false)
        resetFields()
        setFocusedCategory(null)
        setSuspendNotification(false)
    }

    // Handlers
    async function saveHandler(){        
        const nextOccurrence = createNextOccurance()
        addNewTypeRecurringCategory(inputName,inputBadge,inputFrequency, Number(inputAmount), inputAccount, nextOccurrence)
        await refreshBadges()
        await getCategories()
        closeSheetCaller()              
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
                                        inputAccount,
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
    },[])

    useEffect(() => {
        if (badges.length !== 0){
            setInputBadge(badges[0].badge)
        }
    },[badges])

    useEffect(() => {
        if ( !focusedCategory ) { setInputFrequencyDate(frequencyDate[0].value) }        
    },[inputFrequencyMonth])

    useEffect(() => {
        if (focusedCategory){
            const accountObject = accountsArray.filter(account => {
                return account.value === focusedCategory.accountId
            })

            const frequencyObject = frequency.filter(item => {
                return item.value === focusedCategory.recurringFrequency
            })

            const badgeObject = recurringTypeBadges.filter(item => {
                return item.badge === focusedCategory.badge
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
            setInputAccount(accountObject[0].value)
            setInputFrequency(frequencyObject[0].value)
            setInputFrequencyMonth(month)
            setInputFrequencyDate(date)
            setInputFrequencyDay(day)
            setInputBadge(badgeObject[0].badge)
            setInputFrequencyTime(hourMin)
        } else {
            setInputFrequency(frequency[0].value)
            setInputFrequencyTime(frequencyTime[0].value)
            setInputFrequencyDate(frequencyDate[0].value)
            setInputFrequencyDay(frequencyDay[0].value)
            setInputFrequencyMonth(frequencyMonth[0].value)
            if (accountsArray.length !==0) {setInputAccount(accountsArray[0].value)}
            if (badges.length !==0) {setInputBadge(badges[0].badge)}
        }
    },[focusedCategory])

    return (
        <>
            <SafeAreaView style={{backgroundColor:'#ffffff', flex:1}} edges={['top', 'left', 'right']}>
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
                    >
                    <BottomSheetView>
                        <BottomSheetRecurring
                            badges={badges}
                            inputAmount = {inputAmount}
                            setInputAmount = {setInputAmount}
                            inputBadge={inputBadge}
                            inputName = {inputName}
                            setInputBadge={setInputBadge}
                            setInputName = {setInputName}
                            frequency = {frequency}
                            frequencyMonth = {frequencyMonth}
                            frequencyDate = {frequencyDate}
                            frequencyDay = {frequencyDay}
                            frequencyTime = {frequencyTime}
                            inputFrequency = {inputFrequency}
                            setInputFrequency = {setInputFrequency}
                            inputFrequencyMonth = {inputFrequencyMonth}
                            setInputFrequencyMonth = {setInputFrequencyMonth}
                            inputFrequencyDate = {inputFrequencyDate}
                            setInputFrequencyDate = {setInputFrequencyDate}
                            inputFrequencyDay = {inputFrequencyDay}
                            setInputFrequencyDay = {setInputFrequencyDay}
                            inputFrequencyTime = {inputFrequencyTime}
                            setInputFrequencyTime = {setInputFrequencyTime}
                            setAllowedDates= {setAllowedDates}
                            saveHandler = {saveHandler}
                            checkTypes = {checkTypes}
                            accountsArray = {accountsArray}
                            inputAccount = {inputAccount}
                            setInputAccount = {setInputAccount}
                            inputNameError = {inputNameError}
                            setInputNameError = {setInputNameError}
                            inputAmountError = {inputAmountError}
                            setInputAmountError = {setInputAmountError}
                            focusedCategory={focusedCategory}
                            updateHandler={updateHandler}
                            suspendHandler={suspendHandler}
                            suspendNotification = {suspendNotification}
                            setSuspendNotification={ setSuspendNotification }
                        />
                    </BottomSheetView>
                </BottomSheet>

            </SafeAreaView>
        </>
        
    )
}