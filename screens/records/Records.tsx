import AddRecordButton from "@/components/addRecordButton";
import BottomSheetRecordAddItem from "@/components/bottomSheetRecordAddItem";
import BottomSheetRecordCreationMenu from "@/components/bottomSheetRecordCreationMenu";
import Transfers from "@/components/bottomSheetTransfer";
import UniversalSheetWrapper from "@/components/bottomSheetWrapper";
import CalendarListWrapper from "@/components/recordsCalendarListWrapper";
import CustomIncomeExpenseDetails from "@/components/recordsCustomIncomeExpenseDetails";
import RecordsDetails from "@/components/recordsDetails";
import ItemDetails from "@/components/recordsItemDetails";
import TransferDetails from "@/components/recordsTransferDetails";
import { FocusedDateProviderContext } from "@/context/recordsContext";
import { getCustomExpenses, getCustomIncomes } from "@/db/records/select";
import { closeBottomSheet, openBottomSheet, sheetNavigationDuplicationIdentify } from "@/func/bottomSheetfunc";
import { getLocalTime } from "@/func/time";
import { CustomTypeProps, TransferTypes, TypeProps } from "@/types/recordsTypeItemType.schema";
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetView } from "@gorhom/bottom-sheet";
import { useCallback, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

// This is the main Screen for displaying Records
//  there are 2 other screens for this stack
//  there are 4 components rendered by this screen
//    flexed for row calender date scroller and record display scroller
//    fixed button with absolute positioning, and a bottomsheet
//    
//                                BottomSheet
//                _____________________|______________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
//               CreationMenu                                                         Add Item                                                    Transfer                            CustomIncomeExpense                           IncomeExpenseDetails                       TransferDetails
//                    # Add Income                      _________________________________|____________________________                                # Create Transfer
//                    # Add Expense                    Form                          CategoryWrapper         AccountWrapper                       
//                    # Transfer                          # handles all states              # render                  # render
//                    # Create Journal                    # define all the functions         active categories        active accounts
//                                                        # fetching and storeing

export default function Records(){
  
  // This state has been lifted from 'AddItem'
  const [ currentAddItemScreen, setCurrentAddItemScreen ] = useState<'Form' | 'Category' | 'Account'>('Form')

  // Refresh Records Trigger
  const [ recordsRefreshTrigger, setRecordsRefreshTrigger ] = useState(0)

  const dateNow = getLocalTime().toISOString().split('T')[0] // set Focused Date to today
  const [ focusedDate, setFocusedDate ] = useState<string>(dateNow)
  const type = useRef< null | 'income' | 'expense' >(null)
 
  function updateFocusedDate(date:string){
    setFocusedDate(date)
  }

  // On Edit Press
  const isTransfer = useRef(false)

  function onEditPress() {

    if ( isTransfer.current ) {
      setCurrentSheetState('Transfer')
    } else {
      setCurrentSheetState('AddItem')
    }
  }

  // Handle mutlple states of bottom sheet - State
  const BOTTOMSHEET_STATE = {
    CreationMenu: () => <BottomSheetRecordCreationMenu
                          type={type}
                          navigateToAddItem={goToAddItem}
                          navigateToTransfer={goToTransfer}/>,

    AddItem:() => <BottomSheetRecordAddItem type={type.current} prevStates={prevSheetStates} focusedItem={focusedItem} setTitle={setTitle} currentScreen={currentAddItemScreen} setCurrentScreen={setCurrentAddItemScreen} goToAddItem={goToAddItem}/>,

    Transfer: () => <Transfers focusedItem={transferItem} />,

    // passed item is what is passed that can be edited (TypeItem) 
    // passedItemFromRecent has differenct types than passed item and cannot be edited
    // nonEditablePassedItem is items from custom journal which cannot be edited
    ItemDetails: () => <ItemDetails passedItem={focusedItem.current} onEditPress={onEditPress} nonEditablePassedItem={nonEditablePassedItemRef.current} passedItemFromRecent={undefined}/>,

    TransferDetails: () => <TransferDetails passedItem={transferItem.current} itemFromRecent={undefined} onEditPress={onEditPress}/>,

    CustomIncomeExpense: () => < CustomIncomeExpenseDetails 
                                        customTypeItem={customTypeItem}
                                        isCustomIncome={isCustomIncome.current}
                                        onCustomItemPress={switchNonEditableItem}/>,


  }
  const [ currentSheetState, setCurrentSheetState ] = useState< 'CreationMenu' | 'AddItem' | 'Transfer'  | 'ItemDetails' | 'TransferDetails' | 'CustomIncomeExpense'>('CreationMenu')
  const prevSheetStates = useRef<(() => void)[]>([goToMenu])
  const [ title, setTitle ] = useState('Edit Journal')
  
  const SheetContent = BOTTOMSHEET_STATE[currentSheetState]

  // Navigations
  function goToMenu() {
    setCurrentSheetState('CreationMenu')
    setTitle('Edit Journal')
  }
  
  function goToAddItem() {
    setCurrentSheetState('AddItem')
    setCurrentAddItemScreen('Form')

    let headerType: 'Income' | 'Expense';
    if ( type.current === 'income' ){
      headerType = 'Income'
    } else {
      headerType = 'Expense'
    }

    setTitle(`Add ${headerType}`)
    if ( prevSheetStates.current[ prevSheetStates.current.length - 1 ] !== goToAddItem ){
      prevSheetStates.current = [...prevSheetStates.current, goToAddItem]
    }
  }

  function goToTransfer() {
    setTitle('Add Transfer')
    setCurrentSheetState('Transfer')
    prevSheetStates.current = sheetNavigationDuplicationIdentify(prevSheetStates.current, goToTransfer)
  }

  function goToItemDetails() {
    setTitle('Details')
    setCurrentSheetState( 'ItemDetails' )
    prevSheetStates.current = sheetNavigationDuplicationIdentify(prevSheetStates.current, goToItemDetails)
  }

  function goToTransferDetails() {
    setCurrentSheetState('TransferDetails')
    setTitle('Transfer Details')
    prevSheetStates.current = sheetNavigationDuplicationIdentify(prevSheetStates.current, goToTransferDetails)
  }

  function onBackPress(){
    prevSheetStates.current.pop()
    prevSheetStates.current[prevSheetStates.current.length - 1]()
  }

  function goToCustomIncomeExpense() {    
    let headerType: 'Income' | 'Expense';
    if ( type.current === 'income' ) {
        headerType = 'Income'
    } else {
        headerType = 'Expense'
    }
    setTitle(`Custom ${headerType}`)           
    setCurrentSheetState( 'CustomIncomeExpense' )
    prevSheetStates.current = sheetNavigationDuplicationIdentify(prevSheetStates.current, goToCustomIncomeExpense)
  }
  

  // FOR ITEM DETAILS SHEET
  const focusedItem  = useRef<TypeProps | undefined>(undefined)
  const [ showGoBack, setShowGoBack ] = useState(false)

  async function switchItemDetail(item: TypeProps, clickedType: 'income' | 'expense' ) {
    nonEditablePassedItemRef.current = undefined
    setShowGoBack(false) // in case user fold the sheet by hand
    if ( clickedType === 'income' ) {
      type.current = 'income'
    } else {
      type.current = 'expense'
    }

    goToItemDetails()
    focusedItem.current = item
    openStateSheetCaller()
  }

  // Item Details for custom Items
  const nonEditablePassedItemRef = useRef<CustomTypeProps | undefined>(undefined)

  function switchNonEditableItem ( item: CustomTypeProps ) {
    focusedItem.current = undefined
    setShowGoBack(true)
    goToItemDetails()
    nonEditablePassedItemRef.current = item
    openStateSheetCaller()
  }

  // FOR TRANSFER DETAILS
  const transferItem = useRef< TransferTypes | undefined >(undefined)

  function switchTransferDetails(item:TransferTypes) {

    isTransfer.current = true

    transferItem.current = item
    goToTransferDetails()
    openStateSheetCaller()
  }


  // Handle Multiple ref of bottom sheet - Ref
  // const BOTTOM_REF = {

  //   CustomIncomeExpense: () => < CustomIncomeExpenseDetails 
  //                                       customTypeItem={customTypeItem}
  //                                       isCustomIncome={isCustomIncome.current}
  //                                       onCustomItemPress={switchNonEditableItem}/>,
  // }

  // const [ currentSheetRef, setCurrentSheetRef ]= useState< 'CustomIncomeExpense'>('CustomIncomeExpense')

  // const SheetRefContent = BOTTOM_REF[currentSheetRef]  

  // FOR CUSTOM INCOME EXPENSE
  const [ customTypeItem, setCustomTypeItem ] = useState<CustomTypeProps[] | null>(null)
  const isCustomIncome = useRef(false)
  
  // Open Custom Sheet
  async function switchCustom( type:'income' | 'expense' ) { 

    let fetchedCustomType: CustomTypeProps[];
    
    if ( type === 'income' ) {
        isCustomIncome.current = true
        fetchedCustomType = await getCustomIncomes(focusedDate)
    } else {
        isCustomIncome.current = false
        fetchedCustomType = await getCustomExpenses(focusedDate)
    }
    setCustomTypeItem(fetchedCustomType)
    goToCustomIncomeExpense()
    openStateSheetCaller()
  }

  // Open and Close Sheet Caller - State
  function openStateSheetCaller() {
    openBottomSheet(stateSheetRef)

  }
  
  function closeStateSheetCaller(){
    closeBottomSheet(stateSheetRef)
    focusedItem.current = undefined
    transferItem.current = undefined
    isTransfer.current = false
    setCurrentSheetState('CreationMenu')
    setShowGoBack(false)
    prevSheetStates.current = [goToMenu]
  }

  // Open and Close Sheet Caller - Ref
  // function openRefSheetCaller() {
  //   openBottomSheet(refSheetRef)
  // }
  
  // function closeRefSheetCaller(){
  //   closeBottomSheet(refSheetRef)
  // }
  
  // Bottom Sheet things including backdrop - State
  const stateSheetRef= useRef<BottomSheet>(null);
  const stateBackDrop = useCallback(( props:BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.5}
          onPress={() => {
              closeStateSheetCaller()
          }}  
      />
  ),[])

  // Bottom Sheet things including backdrop - Ref
  // const refSheetRef = useRef<BottomSheet>(null);
  // const refBackDrop = useCallback(( props:BottomSheetBackdropProps) => (
  //     <BottomSheetBackdrop
  //         {...props}
  //         disappearsOnIndex={-1}
  //         appearsOnIndex={0}
  //         opacity={0.5}
  //         onPress={() => {
  //             closeRefSheetCaller()
  //         }}  
  //     />
  // ),[])

  return (
      <SafeAreaView style={{backgroundColor:'#ffffff', flexDirection:'row', height:'100%'}} edges={['top', 'left', 'right']}>
        <FocusedDateProviderContext value={{focusedDate, 
                                            updateFocusedDate, 
                                            closeStateSheetCaller, 
                                            recordsRefreshTrigger, 
                                            setRecordsRefreshTrigger, 
                                            switchItemDetail,
                                            switchCustom,
                                            switchTransferDetails}} >
          <CalendarListWrapper />
          <RecordsDetails />

          <AddRecordButton openSheetCaller={openStateSheetCaller} />
          
          {/* <BottomSheet 
              index={-1} 
              enableDynamicSizing={true}
              enablePanDownToClose={true}
              ref={refSheetRef}
              backdropComponent={refBackDrop}
              >
              <BottomSheetView>
                {SheetRefContent()}
              </BottomSheetView>
          </BottomSheet> */}
          <BottomSheet 
              index={-1} 
              enableDynamicSizing={true}
              enablePanDownToClose={true}
              ref={stateSheetRef}
              backdropComponent={stateBackDrop}
              >
              <BottomSheetView>
                <UniversalSheetWrapper title={title} onBackPress={onBackPress} goBackavailable={prevSheetStates.current.length !== 1} onCrossPress={closeStateSheetCaller} >
                  {SheetContent()}
                </UniversalSheetWrapper>
              </BottomSheetView>
          </BottomSheet>
        </FocusedDateProviderContext>
      </SafeAreaView>
  )
}