import BottomSheetWrapper from '@/components/bottomSheet';
import FundCreditAccountsContentWrapper from '@/components/fundCreditAccountsContentWrapper';
import Notification from '@/components/notification';
import { addNewCreditAccount, addNewFundAccount } from '@/db/fundCreditAccounts/insert';
import { getCreditAccountBadges, getFundAccountBadges } from '@/db/fundCreditAccounts/select';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetView } from '@gorhom/bottom-sheet';
import { StackScreenProps } from '@react-navigation/stack';
import { useNavigation } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SettingsStackParamList } from './SettingsStackNavigation';

type Props = StackScreenProps<SettingsStackParamList, 'FundCreditAccounts'>

export default function FundCreditAccounts({route}:Props){

    // useState variables for child components access
    const [ fetchedAccounts, setFetchedAccounts ] = useState();
    const [ focusedAccount, setFocusedAccount ] = useState();
    const [ inputName, setInputName ] = useState<string>('');
    const [ inputBalance, setInputBalance ] = useState<string>('');
    const [ inputBadge, setInputBadge ] = useState<string>('');
    const [ renderBottomSheet, setRenderBottomSheet ] = useState<boolean>(false);
    const [ inputNameError, setInputNameError ] = useState<boolean>(false)
    const [ inputBalanceError, setInputBalanceError ] = useState<boolean>(false)
    const valiedFundBadges = [
        {label:null, badge:'#4A6FA5'},
        {label:null, badge:'#5E8C61'},
        {label:null, badge:'#C9A227'},
        {label:null, badge:'#6B5C8A'},
        // {label:null, badge:'#3F6E8C'},
        // {label:null, badge:'#C56A2D'},
        // {label:null, badge:'#2F3E4E'},
        // {label:null, badge:'#8C4F5A'},
        // {label:null, badge:'#4F7C82'},
        // {label:null, badge:'#A05C7B'},
        // {label:null, badge:'#7A8C3B'},
        // {label:null, badge:'#B05E3C'},
        // {label:null, badge:'#4C6A5A'},
        // {label:null, badge:'#7C5A4F'},
        // {label:null, badge:'#3E5C76'}
    ];
    const valiedCreditBadges= [
        {label:null, badge:'#B04A4A'},
        {label:null, badge:'#9E3F44'},
        {label:null, badge:'#C2554A'},
        {label:null, badge:'#8F3A3A'},
        {label:null, badge:'#A64D4D'},
        {label:null, badge:'#B65C5C'},
        {label:null, badge:'#7E3439'},
        {label:null, badge:'#C06A5A'},
        {label:null, badge:'#9C474F'},
        {label:null, badge:'#B0483F'}
    ];
    const [ valiedBadges, setValiedBadges ] = useState<{ label: null; badge: string; }[]>([])

    // Set Screen header title and define the screen type 
    const navigation = useNavigation()
    const { screen } = route.params;
    let type: 'fund' | 'credit';
    if (screen == 'Fund Accounts'){
        type = 'fund' ;
    } else {
        type = 'credit';
    }
    useEffect(() => {
        navigation.setOptions({title:screen})
        refreshValiedBadges()
    },[])

    // Functions
    function openBottomSheet(){
        sheetRef.current?.expand()
    }
    function closeBottomSheet(){
        sheetRef.current?.close()
    }

    function resetInputs(){
        setInputName('')
        setInputBalance('')
        setInputBadge('')
    }

    function checkTypes(input: string): boolean {
        if (input.trim() === "") return false;
        return Number.isFinite(Number(input));
    }

    function addAccountCaller(name:string, badge:string, balance:number){
        if ( type == 'fund' ){
            addNewFundAccount(name, badge, balance)
        } else {
            addNewCreditAccount(name,badge,balance)
        }
    }

    function resetRenderBottomSheet() {
        setRenderBottomSheet(false)
    }

    async function refreshValiedBadges(){
        // setRenderBottomSheet(false)
        let fetchedBadges;
        let correctTypeValiedBadges;
        if (type === 'fund'){
            fetchedBadges = await getFundAccountBadges();
            correctTypeValiedBadges = valiedFundBadges;
        } else {
            fetchedBadges = await getCreditAccountBadges();
            correctTypeValiedBadges = valiedCreditBadges;
        }

        const valiedFetchedBadges = correctTypeValiedBadges.filter(badge => {
                                let isValied = true;
                                fetchedBadges.forEach(fetchedBadge => {
                                    if ( fetchedBadge.badge == badge.badge )  {
                                        isValied = false;
                                    }
                                })
                                return isValied;
                            })
        setValiedBadges(valiedFetchedBadges)
        setRenderBottomSheet(true)
    }

    // Bottom Sheet things including backdrop
    const sheetRef = useRef<BottomSheet>(null);
    const backDrop = useCallback(( props:BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            opacity={0.5}
        />
    ),[])
    
    // Handles Notification under error and success of account creation 
    const [ notificationType, setNotificationType ] = useState<null | 'success' | 'error' | 'info'>(null)
    const [ notificationMessage, setNotificationMessage ] = useState<string>('')
    let notification
    switch (notificationType) {
        case 'success':
            notification = <Notification message={notificationMessage} type={notificationType}/>
            notificationTimeout()
            break;
        case 'error':
            notification = <Notification message={notificationMessage} type={notificationType}/>
            notificationTimeout()
            break;
        case 'info':
            notification = <Notification message={notificationMessage} type={notificationType}/>
            notificationTimeout()
            break;
        default:
            break;
    }

    function notificationTimeout(){
        setTimeout(()=> {
            setNotificationMessage('')
            setNotificationType(null)
        }, 5000)
    }
    
    return (
        <>
            <SafeAreaView style={{backgroundColor:'#ffffff', flex:1}} edges={['top', 'left', 'right']}>
                <ScrollView showsVerticalScrollIndicator={false}>

                {notification}

            
                <FundCreditAccountsContentWrapper
                    openBottomSheet = {openBottomSheet}
                />

                </ScrollView>

                <BottomSheet 
                    index={-1} 
                    enableDynamicSizing={true}
                    enablePanDownToClose={true}
                    ref={sheetRef}
                    backdropComponent={backDrop}
                    >
                    <BottomSheetView>
                        <BottomSheetWrapper
                            valiedBadges={valiedBadges}
                            inputName={inputName}
                            inputBalance={inputBalance}
                            inputBadge={inputBadge}
                            setInputName= {setInputName}
                            setInputBalance = {setInputBalance}
                            setInputBadge = {setInputBadge}
                            renderBottomSheet = {renderBottomSheet}
                            checkTypes={checkTypes}
                            addAccountCaller={addAccountCaller}
                            resetInputs={resetInputs}
                            closeBottomSheet={closeBottomSheet}
                            refreshValiedBadges={refreshValiedBadges}
                            inputNameError={inputNameError}
                            setInputNameError={setInputNameError}
                            inputBalanceError={inputBalanceError}
                            setInputBalanceError={setInputBalanceError}
                            resetRenderBottomSheet={resetRenderBottomSheet}
                            type={type}
                        />
                    </BottomSheetView>
                </BottomSheet>

            </SafeAreaView>
        </>

    )
}