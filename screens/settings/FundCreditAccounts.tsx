import AddAccountButton from '@/components/addaccountbutton';
import BottomSheetWrapper from '@/components/bottomSheetAccounts';
import FundCreditAccountsContentWrapper from '@/components/fundCreditAccountsContentWrapper';
import { addNewCreditAccount, addNewFundAccount } from '@/db/fundCreditAccounts/insert';
import { checkDependents, getCreditAccountBadges, getCreditAccounts, getFundAccountBadges, getFundAccounts } from '@/db/fundCreditAccounts/select';
import { suspendAccount, updateAccount } from '@/db/fundCreditAccounts/update';
import { badgeSorterAcc, checkTypes, closeBottomSheet, openBottomSheet } from '@/func/bottomSheetfunc';
import { AccountProps } from '@/types/settingsProps';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetView } from '@gorhom/bottom-sheet';
import { StackScreenProps } from '@react-navigation/stack';
import { useNavigation } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SettingsStackParamList } from './SettingsStackNavigation';

type Props = StackScreenProps<SettingsStackParamList, 'FundCreditAccounts'>

export default function FundCreditAccounts({route}:Props){

    // useState variables for child components access
    const [ fetchedAccounts, setFetchedAccounts ] = useState<AccountProps[]>([]);
    const [ focusedAccount, setFocusedAccount ] = useState<{ accountId: number; accountName: string; accountBadge: string; amount: number; isActive: number; } | null>(null);
    const [ isAccountsReady, setIsAccountsReady ] = useState<boolean>(false)
    const [ inputName, setInputName ] = useState<string>('');
    const [ inputBalance, setInputBalance ] = useState<string>('');
    const [ inputBadge, setInputBadge ] = useState<string>('');
    const [ renderBottomSheet, setRenderBottomSheet ] = useState<boolean>(false);
    const [ inputNameError, setInputNameError ] = useState<boolean>(false)
    const [ inputBalanceError, setInputBalanceError ] = useState<boolean>(false)
    const [ suspendNotification, setSuspendNotification ] = useState<boolean>(false)
    const [ areDependentsPresent, setAreDependentsPresent ] = useState(false)
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
    let addNewTypeAccount:(name: string, badge: string, amount: number) => Promise<void>;
    if (screen == 'Fund Accounts'){
        type = 'fund' ;
        addNewTypeAccount = addNewFundAccount
    } else {
        type = 'credit';
        addNewTypeAccount = addNewCreditAccount
    }
    useEffect(() => {
        async function initialActivity(){    
            navigation.setOptions({title:screen})
            await refreshAccountBadges()
        }
        initialActivity()
    },[])

    // Functions
    function openSheetCaller(){
        openBottomSheet(sheetRef)
    }

    function closeSheetCaller(){
        closeBottomSheet(sheetRef)
        setSuspendNotification(false);
        setInputNameError(false)
        setInputBalanceError(false)
        setAreDependentsPresent(false)
    }

    function resetInputs(){
        setInputName('')
        setInputBalance('')
    }

    function resetRenderBottomSheet() {
        setRenderBottomSheet(false)
    }

    function resetIsAccountsReady() {
        setIsAccountsReady(true)
    }

    // Database actions callers
    async function suspendAccountHandler(){
        setSuspendNotification(false)
        if (focusedAccount){
            const check = await checkDependents(focusedAccount.accountId)
            if ( check ) {
                setAreDependentsPresent(true)
            } else {
                
                suspendAccount(focusedAccount.accountId)
                await refreshAccountBadges()
                resetInputs()
                closeSheetCaller()
                resetRenderBottomSheet()
                resetIsAccountsReady()
            }
        }
    }

    // Handlers
    async function refreshAccountBadges(){
        await refreshValiedBadges()
        await refreshAccounts()
    }

    async function updateAccountHandler(){
        if (focusedAccount){
            updateAccount(focusedAccount.accountId,inputName,Number(inputBalance), focusedAccount.amount, inputBadge)
            await refreshAccountBadges()
            resetInputs()
            closeSheetCaller()
            resetRenderBottomSheet()
            resetIsAccountsReady()
        }
    }

    async function saveAccountHandler(){
        if ( inputName === '' || inputName.trim().length === 0 ) {
            setInputNameError(true)
        } else {
            setInputNameError(false)
        }

        if ( !inputNameError ) {
            await addNewTypeAccount(inputName, inputBadge, Number(inputBalance))
            resetInputs()
            closeSheetCaller()
            resetRenderBottomSheet()
            resetIsAccountsReady()
            await refreshAccountBadges() 
        }       
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

        const valiedFetchedBadges = badgeSorterAcc(correctTypeValiedBadges, fetchedBadges)
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
        console.log(accounts)
        setIsAccountsReady(true)
    }

    // MultiScreen sheet
    const SCREENS = {
        Form: () => <BottomSheetWrapper
                            valiedBadges={valiedBadges}
                            inputName={inputName}
                            inputBalance={inputBalance}
                            inputBadge={inputBadge}
                            setInputName= {setInputName}
                            setInputBalance = {setInputBalance}
                            setInputBadge = {setInputBadge}
                            renderBottomSheet = {renderBottomSheet}
                            checkTypes={checkTypes}
                            inputNameError={inputNameError}
                            setInputNameError={setInputNameError}
                            inputBalanceError={inputBalanceError}
                            setInputBalanceError={setInputBalanceError}
                            type={type}
                            focusedAccount={focusedAccount}
                            suspendAccountHandler={suspendAccountHandler}
                            updateAccountHandler={updateAccountHandler}                            
                            suspendNotification={suspendNotification}
                            setSuspendNotification={setSuspendNotification}
                            saveAccountHandler = {saveAccountHandler}
                            areDependentsPresent = { areDependentsPresent }
                        />,
        Badges: () => <></>
    }

    const [ currentScreen, setCurrentScreen ] = useState< 'Form' | 'Badges' >('Form')

    const SheetScreen = SCREENS[currentScreen] 

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
            <View style={{backgroundColor:'#ffffff', flex:1}}>
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
                        { SheetScreen() }
                    </BottomSheetView>
                </BottomSheet>

            </View>
        </>

    )
}