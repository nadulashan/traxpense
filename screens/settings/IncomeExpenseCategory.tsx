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
        {id: 1, label:null, badge:'#1F3A5F'},
        {id: 2, label:null, badge:'#274C77'},
        {id: 3, label:null, badge:'#2F5D8A'},
        {id: 4, label:null, badge:'#356F9D'},
        {id: 5, label:null, badge:'#3C82AF'},
        {id: 6, label:null, badge:'#4695C1'},
        {id: 7, label:null, badge:'#4FA8D3'},
        {id: 8, label:null, badge:'#5ABBDD'},
        {id: 9, label:null, badge:'#67CEE6'},
        {id: 10, label:null, badge:'#74E1EF'},
        {id: 11, label:null, badge:'#3A3F7F'},
        {id: 12, label:null, badge:'#4B4FA1'},
        {id: 13, label:null, badge:'#5D60C3'},
        {id: 14, label:null, badge:'#6F72E5'},
        {id: 15, label:null, badge:'#8184FF'},
        {id: 16, label:null, badge:'#2E6F6D'},
        {id: 17, label:null, badge:'#3A8F8B'},
        {id: 18, label:null, badge:'#4FB0AA'},
        {id: 19, label:null, badge:'#66D1C8'},
        {id: 20, label:null, badge:'#7FF2E6'},
    ]
    const expenseBadges = [
        {id: 1, label:null, badge:'#5C1A1A'},
        {id: 2, label:null, badge:'#7A1F1F'},
        {id: 3, label:null, badge:'#992525'},
        {id: 4, label:null, badge:'#B82B2B'},
        {id: 5, label:null, badge:'#D63131'},
        {id: 6, label:null, badge:'#7A2E00'},
        {id: 7, label:null, badge:'#9C3B00'},
        {id: 8, label:null, badge:'#BE4800'},
        {id: 9, label:null, badge:'#E05500'},
        {id: 10, label:null, badge:'#FF6200'},
        {id: 11, label:null, badge:'#7A0044'},
        {id: 12, label:null, badge:'#9A0057'},
        {id: 13, label:null, badge:'#BA006A'},
        {id: 14, label:null, badge:'#DA007D'},
        {id: 15, label:null, badge:'#FF0090'},
        {id: 16, label:null, badge:'#7A3F00'},
        {id: 17, label:null, badge:'#9E5200'},
        {id: 18, label:null, badge:'#C26600'},
        {id: 19, label:null, badge:'#E67A00'},
        {id: 20, label:null, badge:'#FF8F00'},
    ]

    // settting up variables according to the screen
    let type: 'Expense' | 'Income';
    let valiedTypeBadges:{id: number, label:null; badge:string}[];
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
    }

    // Callers
    function openSheetCaller(){
        openBottomSheet(sheetRef)
        goToForm()
    }

    function closeSheetCaller(){
        closeBottomSheet(sheetRef)
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
                    // onChange={handleSuspendNotificationState}
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