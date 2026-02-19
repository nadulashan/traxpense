import AddCategoryButton from '@/components/addCategoryButton';
import BottomSheetCategories from '@/components/bottomSheetCategories';
import CategoryContentWrapper from '@/components/categoryContentWrapper';
import { addNewExpenseCategory, addNewIncomeCategory } from '@/db/incomeExpenseCategories/insert';
import { getExpenseBadges, getExpenseCategories, getIncomeBadges, getIncomeCategories } from '@/db/incomeExpenseCategories/select';
import { suspendExpenseCategory, suspendIncomeCategory, updateExpenseCategory, updateIncomeCategory } from '@/db/incomeExpenseCategories/update';
import { badgeSorter, closeBottomSheet, openBottomSheet } from '@/func/bottomSheetfunc';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetView } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SettingsStackParamList } from './SettingsStackNavigation';

type Props = StackScreenProps<SettingsStackParamList, 'IncomeExpenseCategory'>

export default function IncomeExpenseCategory({route}:Props){

    // Setting up variables and names expenses or income
    const navigation = useNavigation()
    const { screen } = route.params
    
    // State variables
    const [ valiedBadges, setValiedBadges ] = useState< {label:null; badge:string}[] >([])
    const [ inputBadge, setInputBadge ] = useState('')
    const [ inputName, setInputName ] = useState('')
    const [ inputNameError, setInputNameError ] = useState(false)
    const [ categories, setCategories ] = useState<any>()
    const [ asyncDisabled, setAsyncDisabled ] = useState(false)
    const [ isSheetReady, setIsSheetReady ] = useState(false)
    const [ focusedCategory, setFocusedCategory ] = useState<undefined | {categoryId:number, name:string; badge:string; isActive:number}>()
    const [ showDangerText, setShowDangerText ] = useState(false)
    const incomeBadges = [
        {label:null, badge:'#1F3A5F'},
        {label:null, badge:'#274C77'},
        {label:null, badge:'#2F5D8A'},
        {label:null, badge:'#356F9D'},
        {label:null, badge:'#3C82AF'},
        {label:null, badge:'#4695C1'},
        {label:null, badge:'#4FA8D3'},
        {label:null, badge:'#5ABBDD'},
        {label:null, badge:'#67CEE6'},
        {label:null, badge:'#74E1EF'},
        {label:null, badge:'#3A3F7F'},
        {label:null, badge:'#4B4FA1'},
        {label:null, badge:'#5D60C3'},
        {label:null, badge:'#6F72E5'},
        {label:null, badge:'#8184FF'},
        {label:null, badge:'#2E6F6D'},
        {label:null, badge:'#3A8F8B'},
        {label:null, badge:'#4FB0AA'},
        {label:null, badge:'#66D1C8'},
        {label:null, badge:'#7FF2E6'},
    ]
    const expenseBadges = [
        {label:null, badge:'#5C1A1A'},
        {label:null, badge:'#7A1F1F'},
        {label:null, badge:'#992525'},
        {label:null, badge:'#B82B2B'},
        {label:null, badge:'#D63131'},
        {label:null, badge:'#7A2E00'},
        {label:null, badge:'#9C3B00'},
        {label:null, badge:'#BE4800'},
        {label:null, badge:'#E05500'},
        {label:null, badge:'#FF6200'},
        {label:null, badge:'#7A0044'},
        {label:null, badge:'#9A0057'},
        {label:null, badge:'#BA006A'},
        {label:null, badge:'#DA007D'},
        {label:null, badge:'#FF0090'},
        {label:null, badge:'#7A3F00'},
        {label:null, badge:'#9E5200'},
        {label:null, badge:'#C26600'},
        {label:null, badge:'#E67A00'},
        {label:null, badge:'#FF8F00'},
    ]

    // settting up variables according to the screen
    let type: 'expense' | 'income';
    let valiedTypeBadges:{label:null; badge:string}[];
    let fetchTypeBadges:() => Promise<{ badge: string; }[]>;
    let addTypeCategory:(name: string, badge: string) => Promise<void>;
    let fetchTypeCategories:() => Promise<{ categoryId: number; name: string; badge: string; isActive: number; }[]>;
    let suspendTypeCategory:(id:number) => void;
    let updateTypeCategory:(id:number, name:string, badge:string) => void;
    if ( screen == 'Income Categories' ){
        type = 'income'
        valiedTypeBadges = incomeBadges;
        fetchTypeBadges = getIncomeBadges;
        addTypeCategory = addNewIncomeCategory
        fetchTypeCategories = getIncomeCategories;
        suspendTypeCategory = suspendIncomeCategory;
        updateTypeCategory = updateIncomeCategory;
    } else {
        type = 'expense'
        valiedTypeBadges = expenseBadges;
        fetchTypeBadges = getExpenseBadges;
        addTypeCategory = addNewExpenseCategory
        fetchTypeCategories = getExpenseCategories;
        suspendTypeCategory = suspendExpenseCategory;
        updateTypeCategory = updateExpenseCategory
    }

    // func
    async function refreshBadges(){
        const fetchedBadges = await fetchTypeBadges()
        const sortedBadges:{badge:string; label:null}[] = badgeSorter(valiedTypeBadges,fetchedBadges)
        
        setValiedBadges(sortedBadges)
        // if (sortedBadges.length !== 0){
        //     setInputBadge(sortedBadges[0].badge)
        //     console.log('if runs')
        // }
    }

    async function refreshCategories(){
        const fetchedCategories = await fetchTypeCategories()
        setCategories(fetchedCategories)
    }

    function resetFields(){
        setInputName('')
    }

    async function refreashBadgesCategories(){
        setIsSheetReady(false)
        await refreshBadges()
        await refreshCategories()
        setIsSheetReady(true)
        console.log(categories)
    }

    // Callers
    function openSheetCaller(){
        openBottomSheet(sheetRef)
    }

    function closeSheetCaller(){
        closeBottomSheet(sheetRef)
        setInputNameError(false)
        setFocusedCategory(undefined)
        setShowDangerText(false)
    }

    // Button handlers
    async function saveHandler(){
        setIsSheetReady(false)
        setAsyncDisabled(true)
        await addTypeCategory(inputName,inputBadge)
        await refreashBadgesCategories()
        setAsyncDisabled(false)
        resetFields()
        closeSheetCaller()
        setIsSheetReady(true)
    }

    async function suspendHandler(){
        setAsyncDisabled(true)
        if (focusedCategory){
            suspendTypeCategory(focusedCategory.categoryId)
            await refreashBadgesCategories()
            closeSheetCaller()
            resetFields()
        }
        setAsyncDisabled(false)
    }

    async function updateHandler(){
        setAsyncDisabled(true)
        
        if (focusedCategory){
            updateTypeCategory(focusedCategory.categoryId, inputName, inputBadge)
            console.log('we are updated')
            await refreashBadgesCategories()
            console.log('we are refreshed')
            closeSheetCaller()
            resetFields()
        }
        setAsyncDisabled(false)
    }
    
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
        refreashBadgesCategories()
    },[])

    useEffect(() => {
        if (valiedBadges.length !== 0 ) {
            setInputBadge(valiedBadges[0].badge)
        }
    },[valiedBadges])

    useEffect(() => {
        if (focusedCategory){
            setInputName(focusedCategory.name)
            setInputBadge(focusedCategory.badge)
            openSheetCaller()
        } else {
            setInputName('')
        }
    },[focusedCategory])

    return (
        <>
            <SafeAreaView style={{backgroundColor:'#ffffff', flex:1}} edges={['top', 'left', 'right']}>
                <ScrollView showsVerticalScrollIndicator={false}>

                    <CategoryContentWrapper 
                        categories = {categories}
                        setFocusedCategory = {setFocusedCategory}
                    />

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
                            valiedBadges = {valiedBadges}
                            inputBadge = {inputBadge}
                            setInputBadge = {setInputBadge}
                            inputName = {inputName}
                            setInputName = {setInputName}
                            inputNameError = {inputNameError}
                            setInputNameError = {setInputNameError}
                            saveHandler = {saveHandler}
                            asyncDisabled = {asyncDisabled}
                            isSheetReady= {isSheetReady}
                            focusedCategory={focusedCategory}
                            suspendHandler = {suspendHandler}
                            updateHandler = {updateHandler}
                            showDangerText = {showDangerText}
                            setShowDangerText = {setShowDangerText}
                        />
                    </BottomSheetView>
                </BottomSheet>

            </SafeAreaView>
        </>
        
    )
}