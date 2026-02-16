import AddAccountButton from '@/components/addaccountbutton';
import BottomSheetWrapper from '@/components/bottomSheet';
import FundCreditAccountsContentWrapper from '@/components/fundCreditAccountsContentWrapper';
import { addNewCreditAccount, addNewFundAccount } from '@/db/fundCreditAccounts/insert';
import { getCreditAccountBadges, getCreditAccounts, getFundAccountBadges, getFundAccounts } from '@/db/fundCreditAccounts/select';
import { suspendAccount, updateAccount } from '@/db/fundCreditAccounts/update';
import { closeBottomSheet, openBottomSheet } from '@/func/bottomSheetfunc';
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
    const [ fetchedAccounts, setFetchedAccounts ] = useState<{ accountId: number; name: string; badge: string; amount: number; isActive: number; }[]>([]);
    const [ focusedAccount, setFocusedAccount ] = useState<{ accountId: number; name: string; badge: string; amount: number; isActive: number; } | null>(null);
    const [ isAccountsReady, setIsAccountsReady ] = useState<boolean>(false)
    const [ inputName, setInputName ] = useState<string>('');
    const [ inputBalance, setInputBalance ] = useState<string>('');
    const [ inputBadge, setInputBadge ] = useState<string>('');
    const [ renderBottomSheet, setRenderBottomSheet ] = useState<boolean>(false);
    const [ inputNameError, setInputNameError ] = useState<boolean>(false)
    const [ inputBalanceError, setInputBalanceError ] = useState<boolean>(false)
    const [ suspendNotification, setSuspendNotification ] = useState<boolean>(false)
    const valiedFundBadges = [
        {label:null, badge:'#4A6FA5'},
        {label:null, badge:'#5E8C61'},
        {label:null, badge:'#C9A227'},
        {label:null, badge:'#6B5C8A'},
        {label:null, badge:'#3F6E8C'},
        {label:null, badge:'#C56A2D'},
        {label:null, badge:'#2F3E4E'},
        {label:null, badge:'#8C4F5A'},
        {label:null, badge:'#4F7C82'},
        {label:null, badge:'#A05C7B'},
        {label:null, badge:'#7A8C3B'},
        {label:null, badge:'#B05E3C'},
        {label:null, badge:'#4C6A5A'},
        {label:null, badge:'#7C5A4F'},
        {label:null, badge:'#3E5C76'}
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
        refreshAccounts()
    },[])

    // Functions
    function openSheetCaller(){
        openBottomSheet(sheetRef)
    }

    function closeSheetCaller(){
        closeBottomSheet(sheetRef)
        setSuspendNotification(false);
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

    function resetRenderBottomSheet() {
        setRenderBottomSheet(false)
    }

    function resetIsAccountsReady() {
        setIsAccountsReady(false)
    }


    // Database actions callers
    function addAccountCaller(name:string, badge:string, balance:number){
        if ( type == 'fund' ){
            addNewFundAccount(name, badge, balance)
        } else {
            addNewCreditAccount(name,badge,balance)
        }
    }

    function suspendAccountCaller(id:number){
        suspendAccount(id)
    }

    function updateAccountCaller(id:number, name:string, balance:number, badge:string){
        updateAccount(id,name,balance, badge)
    }

    // Database fetch action callers
    async function refreshValiedBadges(){
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

    async function refreshAccounts() {
        let accounts;
        if ( type == 'fund'){
            accounts = await getFundAccounts()
        } else {
            accounts = await getCreditAccounts()
        }
        setFetchedAccounts(accounts)
        setIsAccountsReady(true)
    }

    // Bottom Sheet things including backdrop
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
            <SafeAreaView style={{backgroundColor:'#ffffff', flex:1}} edges={['top', 'left', 'right']}>
                <ScrollView showsVerticalScrollIndicator={false}>

                {/* {notification} */}

            
                <FundCreditAccountsContentWrapper
                    openBottomSheet = {openSheetCaller}
                    isAccountsReady = {isAccountsReady}
                    fetchedAccounts = {fetchedAccounts}
                    setFocusedAccount = {setFocusedAccount}
                    setInputName={setInputName}
                    setInputBalance={setInputBalance}
                    setInputBadge={setInputBadge}
                    focusedAccount={focusedAccount}
                    setRenderBottomSheet={setRenderBottomSheet}
                />

                </ScrollView>
                
                <AddAccountButton openBottomSheet={openSheetCaller} setFocusedAccount={setFocusedAccount} setRenderBottomSheet={setRenderBottomSheet}/>

                <BottomSheet 
                    index={-1} 
                    enableDynamicSizing={true}
                    enablePanDownToClose={true}
                    ref={sheetRef}
                    backdropComponent={backDrop}
                    // onChange={handleSuspendNotificationState}
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
                            closeBottomSheet={closeSheetCaller}
                            refreshValiedBadges={refreshValiedBadges}
                            inputNameError={inputNameError}
                            setInputNameError={setInputNameError}
                            inputBalanceError={inputBalanceError}
                            setInputBalanceError={setInputBalanceError}
                            resetRenderBottomSheet={resetRenderBottomSheet}
                            type={type}
                            resetIsAccountsReady={resetIsAccountsReady}
                            refreshAccounts={refreshAccounts}
                            focusedAccount={focusedAccount}
                            suspendAccountCaller={suspendAccountCaller}
                            updateAccountCaller={updateAccountCaller}                            
                            suspendNotification={suspendNotification}
                            setSuspendNotification={setSuspendNotification}
                        />
                    </BottomSheetView>
                </BottomSheet>

            </SafeAreaView>
        </>

    )
}