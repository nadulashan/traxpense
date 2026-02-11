import BottomSheetWrapper from '@/components/bottomSheet';
import FundCreditAddButton from '@/components/fundCreditAddButton';
import Notification from '@/components/notification';
import { getAccountBadges } from '@/db/select';
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
    },[])


    // Handles valiedBadges array for Accounts - by filtering out the used badges from available 9 badges and updates the state of valiedBades
    interface usedBadgesProps {
        badge:String
    }
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
    async function refreashBadges(){
        console.log("Badges Refreashed")
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
        console.log('timeout started')
        setTimeout(()=> {
            setNotificationMessage('')
            setNotificationType(null)
        }, 5000)
    }

    // let handlePress: () => void;

    // if ( screen == 'Fund Accounts' ) {
    //     handlePress = () => {
    //         console.log('FUNDDD ADded')
    //     }
    // } else {
    //     handlePress = () => {
    //         console.log('Creditt ADded')
    //     }
    // }
    
    return (
        <>
            <SafeAreaView style={{backgroundColor:'#ffffff', flex:1}} edges={['top', 'left', 'right']}>
                <ScrollView showsVerticalScrollIndicator={false}>

                {notification}

            
                <FundCreditAddButton 
                    handlePress={() =>{
                        sheetRef.current?.expand()
                        refreashBadges()
                    }} />

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
                            refreashBadges={refreashBadges} 
                            setNotificationMessage={setNotificationMessage} 
                            setNotificationType={setNotificationType}
                            />
                    </BottomSheetView>
                </BottomSheet>

            </SafeAreaView>
        </>

    )
}