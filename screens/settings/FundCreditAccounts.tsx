import FundCreditAddButton from '@/components/fundCreditAddButton';
import BottomSheet from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SettingsStackParamList } from './SettingsStackNavigation';

type Props = StackScreenProps<SettingsStackParamList, 'FundCreditAccounts'>

export default function FundCreditAccounts({route}:Props){

    const navigation = useNavigation();
    const { screen } = route.params;
    const [ focusedIndex, setFocusedIndex ] = useState<number | null>(null);
    const [ modalActive, setModalActive ] = useState<boolean>(false)

    useEffect(() => {
        navigation.setOptions({title:screen})
    },[])
    const sheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => [280], []);

    // TEMP
    // const badge = colors.light.badge;
    // const recent = [
    //     {
    //         type:'spend',
    //         amount:800,
    //         category:'Fees'
    //     },
    //     {
    //         type:'spend',
    //         amount:50,
    //         category:'Transport'
    //     },
    //     {
    //         type:'income',
    //         amount:1200,
    //         category:'Bank'
    //     }
    // ]
    // TEMP END

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
            <SafeAreaView style={{backgroundColor:'#ffffff'}} edges={['top', 'left', 'right']}>
                <ScrollView showsVerticalScrollIndicator={false}>


                    <FundCreditAddButton handlePress={() =>{
                        sheetRef.current?.expand()
                        console.log('Button Clicked')
                        console.log(sheetRef.current)
                        console.log(snapPoints)
                        }} />
                    {/* <Text>someting</Text>
                    <AccountCard name='Wallet' color={badge.blue} balance="Rs. 3,745.00" category={recent}/>
                    <AccountCard name='Bank' color={badge.yellow} balance="Rs. 45,600.00" category={recent} />
                    <AccountCard name='Payoneer' color={badge.red} balance="Rs. 185,600.00" category={recent} />
                    <AccountCard name='Wallet' color={badge.blue} balance="Rs. 3,745.00" category={recent}/>
                    <AccountCard name='Bank' color={badge.yellow} balance="Rs. 45,600.00" category={recent} />
                    <AccountCard name='Payoneer' color={badge.red} balance="Rs. 185,600.00" category={recent} /> */}




                </ScrollView>
                <BottomSheet snapPoints={[300]} index={0}>
                    <View style={{backgroundColor:'red'}}>
                        <Text>VISIBLE</Text>
                        <Text>VISIBLE</Text>
                        <Text>VISIBLE</Text>
                        <Text>VISIBLE</Text>
                        <Text>VISIBLE</Text>
                        <Text>VISIBLE</Text>
                        <Text>VISIBLE</Text>
                        <Text>VISIBLE</Text>
                        <Text>VISIBLE</Text>
                        <Text>VISIBLE</Text>
                    </View>
                </BottomSheet>

            </SafeAreaView>
        </>

    )
}