import AddCategoryButton from '@/components/addCategoryButton';
import BottomSheetCategories from '@/components/bottomSheetCategories';
import OptionsDisplay from '@/components/bottomSheetOptionsDisplay';
import UniversalSheetWrapper from '@/components/bottomSheetWrapper';
import CategoryContentWrapper from '@/components/categoryContentWrapper';
import { addNewExpenseCategory, addNewIncomeCategory } from '@/db/incomeExpenseCategories/insert';
import { getExpenseBadges, getExpenseCategories, getIncomeBadges, getIncomeCategories } from '@/db/incomeExpenseCategories/select';
import { suspendExpenseCategory, suspendIncomeCategory, updateExpenseCategory, updateIncomeCategory } from '@/db/incomeExpenseCategories/update';
import { badgeSorter, closeBottomSheet, openBottomSheet, sheetNavigationDuplicationIdentify } from '@/func/bottomSheetfunc';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetView } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SettingsStackParamList } from './SettingsStackNavigation';

type Props = StackScreenProps<SettingsStackParamList, 'IncomeExpenseCategory'>

export default function IncomeExpenseCategory({route}:Props){

    // Setting up variables and names expenses or income
    const navigation = useNavigation()
    const { screen } = route.params
    
    // State variables
    const [ valiedBadges, setValiedBadges ] = useState< {id: number, label:null; value:string}[] >([])
    const [ inputBadge, setInputBadge ] = useState('')
    const [ inputName, setInputName ] = useState('')
    const [ inputNameError, setInputNameError ] = useState(false)
    const [ categories, setCategories ] = useState<any>()
    const [ asyncDisabled, setAsyncDisabled ] = useState(false)
    const [ isSheetReady, setIsSheetReady ] = useState(false)
    const [ focusedCategory, setFocusedCategory ] = useState<undefined | {categoryId:number, name:string; badge:string; isActive:number}>()
    const [ showDangerText, setShowDangerText ] = useState(false)
    const incomeBadges = [
        {id: 1, label:null, value:'#1F3A5F'},
        {id: 2, label:null, value:'#274C77'},
        {id: 3, label:null, value:'#2F5D8A'},
        {id: 4, label:null, value:'#356F9D'},
        {id: 5, label:null, value:'#3C82AF'},
        {id: 6, label:null, value:'#4695C1'},
        {id: 7, label:null, value:'#4FA8D3'},
        {id: 8, label:null, value:'#5ABBDD'},
        {id: 9, label:null, value:'#67CEE6'},
        {id: 10, label:null, value:'#74E1EF'},
        {id: 11, label:null, value:'#3A3F7F'},
        {id: 12, label:null, value:'#4B4FA1'},
        {id: 13, label:null, value:'#5D60C3'},
        {id: 14, label:null, value:'#6F72E5'},
        {id: 15, label:null, value:'#8184FF'},
        {id: 16, label:null, value:'#2E6F6D'},
        {id: 17, label:null, value:'#3A8F8B'},
        {id: 18, label:null, value:'#4FB0AA'},
        {id: 19, label:null, value:'#66D1C8'},
        {id: 20, label:null, value:'#7FF2E6'},
    ]
    const expenseBadges = [
        {id: 1, label:null, value:'#5C1A1A'},
        {id: 2, label:null, value:'#7A1F1F'},
        {id: 3, label:null, value:'#992525'},
        {id: 4, label:null, value:'#B82B2B'},
        {id: 5, label:null, value:'#D63131'},
        {id: 6, label:null, value:'#7A2E00'},
        {id: 7, label:null, value:'#9C3B00'},
        {id: 8, label:null, value:'#BE4800'},
        {id: 9, label:null, value:'#E05500'},
        {id: 10, label:null, value:'#FF6200'},
        {id: 11, label:null, value:'#7A0044'},
        {id: 12, label:null, value:'#9A0057'},
        {id: 13, label:null, value:'#BA006A'},
        {id: 14, label:null, value:'#DA007D'},
        {id: 15, label:null, value:'#FF0090'},
        {id: 16, label:null, value:'#7A3F00'},
        {id: 17, label:null, value:'#9E5200'},
        {id: 18, label:null, value:'#C26600'},
        {id: 19, label:null, value:'#E67A00'},
        {id: 20, label:null, value:'#FF8F00'},
    ]

    // settting up variables according to the screen
    let type: 'Expense' | 'Income';
    let valiedTypeBadges:{id: number, label:null; value:string}[];
    let fetchTypeBadges:() => Promise<{ badge: string; }[]>;
    let addTypeCategory:(name: string, badge: string) => Promise<void>;
    let fetchTypeCategories:() => Promise<{ categoryId: number; name: string; badge: string; isActive: number; }[]>;
    let suspendTypeCategory:(id:number) => void;
    let updateTypeCategory:(id:number, name:string, badge:string) => void;
    if ( screen == 'Income Categories' ){
        type = 'Income'
        valiedTypeBadges = incomeBadges;
        fetchTypeBadges = getIncomeBadges;
        addTypeCategory = addNewIncomeCategory
        fetchTypeCategories = getIncomeCategories;
        suspendTypeCategory = suspendIncomeCategory;
        updateTypeCategory = updateIncomeCategory;
    } else {
        type = 'Expense'
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
        const sortedBadges:{id: number, value:string; label:null}[] = badgeSorter(valiedTypeBadges,fetchedBadges)
        
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
    }

    // Callers
    function openSheetCaller(){
        openBottomSheet(sheetRef)
        goToForm()
    }

    function closeSheetCaller(){
        closeBottomSheet(sheetRef)
    }

    function resetSheetStates(){        
        setInputNameError(false)
        setFocusedCategory(undefined)
        setShowDangerText(false)
        prevScreens.current = []
    }

    // Button handlers
    async function saveHandler(){
        if ( inputName === '' || inputName.trim().length === 0 ) {
            setInputNameError(true)
        } else {
            setInputNameError(false)
        }

        if ( !inputNameError ) {
            setIsSheetReady(false)
            setAsyncDisabled(true)
            await addTypeCategory(inputName,inputBadge)
            await refreashBadgesCategories()
            setAsyncDisabled(false)
            resetFields()
            closeSheetCaller()
            setIsSheetReady(true)
        }
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
            await refreashBadgesCategories()
            closeSheetCaller()
            resetFields()
        }
        setAsyncDisabled(false)
    }

    function handleBadgePress( value: string ) {
        setInputBadge(value)
        goBack()
    }

    // Sheets 
    const SCREENS = {
        Form: () => <BottomSheetCategories
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
                            openBadgeScreen={goToBadges}
                        />,
        Badges: () => <OptionsDisplay itemsPerRow={5} options={valiedBadges} isBadges={true} onOptionPress={handleBadgePress}/>
    }
    const [ currentScreen, setCurrentScreen ] = useState< 'Form' | 'Badges' >('Form')
    const prevScreens = useRef<( () => void )[]>([])
    const [ title, setTitle ] = useState('')
    const Screen = SCREENS[currentScreen]

    function goToForm(){
        setCurrentScreen('Form')
        setTitle(`Add ${type} Category`)
        prevScreens.current = sheetNavigationDuplicationIdentify( prevScreens.current, goToForm )
    }
    function goToBadges(){
        setCurrentScreen('Badges')
        setTitle('Select a Badge')
        prevScreens.current = sheetNavigationDuplicationIdentify( prevScreens.current, goToBadges )
    }
    function goBack(){
        prevScreens.current.pop()
        prevScreens.current[prevScreens.current.length - 1]()
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
            setInputBadge(valiedBadges[0].value)
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
            <View style={{backgroundColor:'#ffffff', flex:1}}>
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
                    onChange={ index => {
                        if ( index === -1 ) {
                            resetSheetStates()
                        }
                    }}
                    >
                    <BottomSheetView>
                        <UniversalSheetWrapper onBackPress={goBack} onCrossPress={closeSheetCaller} title={title} goBackavailable={prevScreens.current.length !== 1}>
                            {Screen()}
                        </UniversalSheetWrapper>
                    </BottomSheetView>
                </BottomSheet>

            </View>
        </>
        
    )
}