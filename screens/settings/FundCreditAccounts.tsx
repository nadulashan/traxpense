import BottomSheetWrapper from '@/components/bottomSheet';
import FundCreditAccountsContentWrapper from '@/components/fundCreditAccountsContentWrapper';
import Notification from '@/components/notification';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetView } from '@gorhom/bottom-sheet';
import { StackScreenProps } from '@react-navigation/stack';
import { useCallback, useRef, useState } from 'react';
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

            
                <FundCreditAccountsContentWrapper/>

                </ScrollView>

                <BottomSheet 
                    index={-1} 
                    enableDynamicSizing={true}
                    enablePanDownToClose={true}
                    ref={sheetRef}
                    backdropComponent={backDrop}
                    >
                    <BottomSheetView>
                        <BottomSheetWrapper />
                    </BottomSheetView>
                </BottomSheet>

            </SafeAreaView>
        </>

    )
}