import BottomSheetWrapper from '@/components/bottomSheet';
import FundCreditAccountsContentWrapper from '@/components/fundCreditAccountsContentWrapper';
import Notification from '@/components/notification';
import { getAccountBadges, getAccounts } from '@/db/select';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetView } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SettingsStackParamList } from './SettingsStackNavigation';

type Props = StackScreenProps<SettingsStackParamList, 'FundCreditAccounts'>

export default function FundCreditAccounts({route}:Props){


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

    // Get the screen name from navigation cus the same screen is used for credit accounts and fund accounts
    const navigation = useNavigation();
    const { screen } = route.params;
    useEffect(() => {
        navigation.setOptions({title:screen})
        fetchAccounts()
    },[])



    async function refreashFields(){
        const usedBadges= await getAccountBadges()
        const valied = valiedBadges.filter( valiedBadge => {
            let isValied = true
            usedBadges.map(usedBadge => {
                if (usedBadge.badge == valiedBadge.badge){
                    isValied = false
                }
            })
            return isValied
        })
        setValiedBadges(valied)
        setAccountName('')
        setBalance('')
        setIsNew(true)

    }
    
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

    // Bottom Sheet state values - to be accessable thru multiple child components.
    const [ badge, setBadge] = useState<string>('') // currently focused badge on the bottom sheet
    const [ accountName, setAccountName ] = useState<string>('') // currently focused account name on the bottom sheet
    const [ balance, setBalance ] = useState<string>('') // currently focused balance on the bottom sheet
    const [ accounts, setAccounts ] = useState<{accountId: number;name:string; badge:string;initialBalance:number;isActive:number;}[]>([]) // accounts fetched from the database
    const [ isNew, setIsNew ] = useState<boolean>(true) // whether we are adding a new on or editing an existing one.
    const [ focusedAccount, setFocusedAccount ] = useState() // focused account
    const [ valiedBadges, setValiedBadges ] = useState<{label:null; badge:string}[]>([
        {label:null, badge:'#0F3D2E'},
        {label:null, badge:'#4A6FA5'},
        {label:null, badge:'#A84545'},
        {label:null, badge:'#C9A227'},
        {label:null, badge:'#6B5C8A'},
        {label:null, badge:'#3F6E8C'},
        {label:null, badge:'#C56A2D'},
        {label:null, badge:'#2F3E4E'},
        {label:null, badge:'#B55A5A'}
    ])

    // Fetch accounts
    async function fetchAccounts(){
        const fetchedAccounts = await getAccounts()
        setAccounts(fetchedAccounts)
    }

    // let handlePress: () => void;

    // if ( screen == 'Fund Accounts' ) {
    //     handlePress = () => {
    //         ('FUNDDD ADded')
    //     }
    // } else {
    //     handlePress = () => {
    //         ('Creditt ADded')
    //     }
    // }
    
    return (
        <>
            <SafeAreaView style={{backgroundColor:'#ffffff', flex:1}} edges={['top', 'left', 'right']}>
                <ScrollView showsVerticalScrollIndicator={false}>

                {notification}

            
                <FundCreditAccountsContentWrapper
                    accounts={accounts}
                    setBadge={setBadge}
                    setAccountName={setAccountName}
                    setBalance={setBalance}
                    openBottomSheet={() =>{
                        sheetRef.current?.expand()
                    }} 
                    refreashFields={refreashFields}
                    setIsNew={setIsNew}
                    setFocusedAccount={setFocusedAccount}/>

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
                            ref={sheetRef} 
                            badges={valiedBadges} 
                            refreashFields={refreashFields} 
                            setNotificationMessage={setNotificationMessage} 
                            setNotificationType={setNotificationType}
                            badge={badge}
                            setBadge={setBadge}
                            accountName={accountName}
                            setAccountName={setAccountName}
                            balance={balance}
                            setBalance={setBalance}
                            fetchAccounts={fetchAccounts}
                            isNew={isNew}
                            focusedAccount={focusedAccount}
                            />
                    </BottomSheetView>
                </BottomSheet>

            </SafeAreaView>
        </>

    )
}