import AddCategoryButton from '@/components/addCategoryButton';
import BottomSheetCategories from '@/components/bottomSheetCategories';
import { openBottomSheet } from '@/func/bottomSheetfunc';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetView } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { useCallback, useEffect, useRef } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SettingsStackParamList } from './SettingsStackNavigation';

type Props = StackScreenProps<SettingsStackParamList, 'IncomeExpenseCategory'>

export default function IncomeExpenseCategory({route}:Props){

    // Setting up variables and names expenses or income
    const navigation = useNavigation()
    const { screen } = route.params
    let type: 'expense' | 'income';
    if ( screen == 'Income Categories' ){
        type = 'income'
    } else {
        type = 'expense'
    }
    
    // Callers
    function openSheetCaller(){
        openBottomSheet(sheetRef)
    }
    
    const sheetRef = useRef<BottomSheet>(null);
    const backDrop = useCallback(( props:BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            opacity={0.5}
            onPress={() => {
            }}  
        />
    ),[])

    useEffect(() => {
        navigation.setOptions({title:screen})
    },[])

    return (
        <>
            <SafeAreaView style={{backgroundColor:'#ffffff', flex:1}} edges={['top', 'left', 'right']}>
                <ScrollView showsVerticalScrollIndicator={false}>

                </ScrollView>
                
                <AddCategoryButton openSheetCaller={openSheetCaller}/>

                <BottomSheet 
                    index={-1} 
                    enableDynamicSizing={true}
                    enablePanDownToClose={true}
                    ref={sheetRef}
                    backdropComponent={backDrop}
                    // onChange={handleSuspendNotificationState}
                    >
                    <BottomSheetView>
                        <BottomSheetCategories
                        />
                    </BottomSheetView>
                </BottomSheet>

            </SafeAreaView>
        </>
        
    )
}