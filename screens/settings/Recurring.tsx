import AddCategoryButton from '@/components/addCategoryButton';
import BottomSheetRecurring from '@/components/bottomSheetRecurring';
import { getExpenseRecurringBadges, getIncomeReccuringBadges } from '@/db/recurring/select';
import { badgeSorter, checkTypes, closeBottomSheet, openBottomSheet } from '@/func/bottomSheetfunc';
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
    const [ inputFrequency, setInputFrequency ] = useState('')
    const [ inputFrequencyMonth, setInputFrequencyMonth ] = useState('')
    const [ inputFrequencyDate, setInputFrequencyDate ] = useState<number | undefined>()
    const [ inputFrequencyDay, setInputFrequencyDay ] = useState('')
    const [ inputFrequencyTime, setInputFrequencyTime ] = useState('')
    const [ allowedDates, setAllowedDates ] = useState<31 | 30 | 28>(31)
    const [ activeAccounts, setActiveAccounts ] = useState([])
    const frequency = [
        {label:'Yearly', value:'yearly'},
        {label:'6 Months', value:'6months'},
        {label:'4 Months', value:'4months'},
        {label:'3 Months', value:'3months'},
        {label:'Monthly', value:'monthly'},
        {label:'Weekly', value:'weekly'},
        {label:'Daily', value:'daily'}
    ]
    const frequencyMonth = [
        {label:'January', value:'january'},
        {label:'February', value:'february'},
        {label:'March', value:'march'},
        {label:'April', value:'april'},
        {label:'May', value:'may'},
        {label:'June', value:'june'},
        {label:'July', value:'July'},
        {label:'August', value:'august'},
        {label:'September', value:'september'},
        {label:'October', value:'october'},
        {label:'November', value:'november'},
        {label:'December', value:'december'},
    ]
    const frequencyDate = Array.from({ length: allowedDates }, (_, i) => ({
        label: (i + 1).toString(),
        value: i + 1
        }));
    const frequencyDay = [
        { label: 'Monday', value: 'monday' },
        { label: 'Tuesday', value: 'tuesday' },
        { label: 'Wednesday', value: 'wednesday' },
        { label: 'Thursday', value: 'thursday' },
        { label: 'Friday', value: 'friday' },
        { label: 'Saturday', value: 'saturday' },
        { label: 'Sunday', value: 'sunday' }
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
    
    let type:'income' | 'expense';
    let getTypeRecurringBadges:() => Promise<{badge:string}[]>
    let recurringTypeBadges:{label:null, badge:string}[]
    if( screen === 'Recurring Income'){
        type = 'income'
        getTypeRecurringBadges = getIncomeReccuringBadges
        recurringTypeBadges = recurringIncomeBadges
    } else {
        type = 'expense'
        getTypeRecurringBadges = getExpenseRecurringBadges
        recurringTypeBadges = recurringExpenseBadges
    }

    // functions
    async function refreshBadges() {
        const fetchedBadges = await getTypeRecurringBadges()
        const valiedBadges = badgeSorter(recurringTypeBadges, fetchedBadges)
        setBadges(valiedBadges)
    }
    
    // Callers
    function openSheetCaller(){
        openBottomSheet(sheetRef)
    }
    
    function closeSheetCaller(){
        closeBottomSheet(sheetRef)
    }

    // Handlers
    async function saveHandler(){
        console.log(inputName, inputAmount, inputBadge)
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
        refreshBadges()

        setInputFrequency(frequency[4].value)
        setInputFrequencyDate(frequencyDate[0].value)
        setInputFrequencyDay(frequencyDay[0].value)
        setInputFrequencyMonth(frequencyMonth[0].value)
        setInputFrequencyTime(frequencyTime[0].value)
    },[])

    useEffect(() => {
        if (badges.length !== 0){
            setInputBadge(badges[0].badge)
        }
    },[badges])

    return (
        <>
            <SafeAreaView style={{backgroundColor:'#ffffff', flex:1}} edges={['top', 'left', 'right']}>
                <ScrollView showsVerticalScrollIndicator={false}>

                    

                </ScrollView>
                
                <AddCategoryButton openSheetCaller={openSheetCaller} />

                <BottomSheet 
                    index={-1} 
                    enableDynamicSizing={true}
                    enablePanDownToClose={true}
                    ref={sheetRef}
                    backdropComponent={backDrop}
                    // onChange={handleSuspendNotificationState}
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
                        />
                    </BottomSheetView>
                </BottomSheet>

            </SafeAreaView>
        </>
        
    )
}