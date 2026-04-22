import AddAccountButton from '@/components/addaccountbutton';
import BottomSheetWrapper from '@/components/bottomSheetAccounts';
import OptionsDisplay from '@/components/bottomSheetOptionsDisplay';
import UniversalSheetWrapper from '@/components/bottomSheetWrapper';
import FundCreditAccountsContentWrapper from '@/components/fundCreditAccountsContentWrapper';
import { addNewCreditAccount, addNewFundAccount } from '@/db/fundCreditAccounts/insert';
import { checkDependents, getCreditAccountBadges, getCreditAccounts, getFundAccountBadges, getFundAccounts } from '@/db/fundCreditAccounts/select';
import { suspendAccount, updateAccount } from '@/db/fundCreditAccounts/update';
import { badgeSorterAcc, checkTypes, closeBottomSheet, openBottomSheet, sheetNavigationDuplicationIdentify } from '@/func/bottomSheetfunc';
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
        {id: 1, label:null, badge:'#4A6FA5'},
        {id: 2, label:null, badge:'#5E8C61'},
        {id: 3, label:null, badge:'#C9A227'},
        {id: 4, label:null, badge:'#6B5C8A'},
        {id: 5, label:null, badge:'#3F6E8C'},
        {id: 6, label:null, badge:'#C56A2D'},
        {id: 7, label:null, badge:'#2F3E4E'},
        {id: 8, label:null, badge:'#8C4F5A'},
        {id: 9, label:null, badge:'#4F7C82'},
        {id: 10, label:null, badge:'#A05C7B'},
        {id: 11, label:null, badge:'#7A8C3B'},
        {id: 12, label:null, badge:'#B05E3C'},
        {id: 13, label:null, badge:'#4C6A5A'},
        {id: 14, label:null, badge:'#7C5A4F'},
        {id: 15, label:null, badge:'#3E5C76'}
    ];
    const valiedCreditBadges= [
        {id: 1, label:null, badge:'#B04A4A'},
        {id: 2, label:null, badge:'#9E3F44'},
        {id: 3, label:null, badge:'#C2554A'},
        {id: 4, label:null, badge:'#8F3A3A'},
        {id: 5, label:null, badge:'#A64D4D'},
        {id: 6, label:null, badge:'#B65C5C'},
        {id: 7, label:null, badge:'#7E3439'},
        {id: 8, label:null, badge:'#C06A5A'},
        {id: 9, label:null, badge:'#9C474F'},
        {id: 10, label:null, badge:'#B0483F'}
    ];
    const [ valiedBadges, setValiedBadges ] = useState<{ id: number, label: null; badge: string; }[]>([])

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
        prevScreens.current = sheetNavigationDuplicationIdentify( prevScreens.current, goToForm)
    }

    function closeSheetCaller(){
        closeBottomSheet(sheetRef)
        setSuspendNotification(false);
        setInputNameError(false)
        setInputBalanceError(false)
        setAreDependentsPresent(false)
        goToForm()
        prevScreens.current = []
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

    function handleBadgePress( badge: string) {
        console.log(badge)
        setInputBadge(badge)
        console.log(inputBadge)
        goBack()
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
                            openBadgeScreen={ goToBadges }
                        />,
        Badges: () => <OptionsDisplay itemsPerRow={5} options={valiedBadges} onOptionPress={handleBadgePress} isBadges={true} />
    }

    const [ currentScreen, setCurrentScreen ] = useState< 'Form' | 'Badges' >('Form')
    const [ title, setTitle ] = useState('')

    const SheetScreen = SCREENS[currentScreen] 

    const prevScreens = useRef<( () => void )[] >([])

    //navigation
    function goToForm(){
        let Type
        if ( type === 'fund' ){
            Type = 'Fund'
        } else {
            Type = 'Credit'
        }
        setTitle(`Add ${Type} Account`)
        setCurrentScreen('Form')
        prevScreens.current = sheetNavigationDuplicationIdentify( prevScreens.current, goToForm )
    }
    function goToBadges(){
        setTitle(`Select a Badge`)
        setCurrentScreen('Badges')
        prevScreens.current = sheetNavigationDuplicationIdentify( prevScreens.current, goToBadges )
    }
    function goBack(){
        prevScreens.current.pop()
        prevScreens.current[prevScreens.current.length - 1]()
    }

    
    useEffect(() => {
        if (!focusedAccount && renderBottomSheet && valiedBadges.length !== 0) {
            setInputBadge(valiedBadges[0].badge)
        }
    },[renderBottomSheet, focusedAccount])

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
                        <UniversalSheetWrapper goBackavailable={ prevScreens.current.length !== 1 } onCrossPress={ closeSheetCaller } onBackPress={goBack} title={title}>
                            { SheetScreen() }
                        </UniversalSheetWrapper>
                    </BottomSheetView>
                </BottomSheet>

            </View>
        </>

    )
}