import AddRecordButton from "@/components/addRecordButton";
import BottomSheetRecordAddItem from "@/components/bottomSheetRecordAddItem";
import BottomSheetRecordCreationMenu from "@/components/bottomSheetRecordCreationMenu";
import Transfers from "@/components/bottomSheetTransfer";
import CalendarListWrapper from "@/components/recordsCalendarListWrapper";
import CustomIncomeExpenseDetails from "@/components/recordsCustomIncomeExpenseDetails";
import RecordsDetails from "@/components/recordsDetails";
import ItemDetails from "@/components/recordsItemDetails";
import TransferDetails from "@/components/recordsTransferDetails";
import { FocusedDateProviderContext } from "@/context/recordsContext";
import { getCustomExpenses, getCustomIncomes } from "@/db/records/select";
import { closeBottomSheet, openBottomSheet } from "@/func/bottomSheetfunc";
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
                          navigateToAddItem={navigateToAddItem}
                          navigateToTransfer={navigateToTransfer}/>,

    AddItem:() => <BottomSheetRecordAddItem type={type} focusedItem={focusedItem}/>,

    Transfer: () => <Transfers focusedItem={transferItem} />,

    
    ItemDetails: () => <ItemDetails item={focusedItem} onEditPress={onEditPress}/>,

    TransferDetails: () => <TransferDetails item={transferItem} onEditPress={onEditPress}/>


  }
  const [ currentSheetState, setCurrentSheetState ] = useState< 'CreationMenu' | 'AddItem' | 'Transfer'  | 'ItemDetails' | 'TransferDetails' >('CreationMenu')
  
  const SheetContent = BOTTOMSHEET_STATE[currentSheetState]
  

  // FOR ITEM DETAILS SHEET
  const [ focusedItem, setFocusedItem ] = useState<TypeProps | undefined>(undefined)

  async function switchItemDetail(item: TypeProps, clickedType: 'income' | 'expense' ) {

    if ( clickedType === 'income' ) {
      type.current = 'income'
    } else {
      type.current = 'expense'
    }

    setCurrentSheetState( 'ItemDetails' )
    setFocusedItem(item)
    openStateSheetCaller()
  }

  // FOR TRANSFER DETAILSCommonStyles.NoActionDangerText
  const [ transferItem, setTransferItem ] = useState< TransferTypes | undefined >(undefined)

  function switchTransferDetails(item:TransferTypes) {

    isTransfer.current = true

    setTransferItem(item)
    setCurrentSheetState('TransferDetails')
    openStateSheetCaller()
  }


  // Handle Multiple ref of bottom sheet - Ref
  const BOTTOM_REF = {

    CustomIncomeExpense: () => < CustomIncomeExpenseDetails 
                                        incomeItems={customIncomeItems}
                                        expenseItems={customExpenseItems}
                                        customItemsSum={customItemsSum.current}
                                        isCustomIncome={isCustomIncome.current}/>,
  }

  const [ currentSheetRef, setCurrentSheetRef ]= useState< 'CustomIncomeExpense'>('CustomIncomeExpense')

  const SheetRefContent = BOTTOM_REF[currentSheetRef]  

  // FOR CUSTOM INCOME EXPENSE
  const [ customIncomeItems, setCustomIncomeItems ] = useState<CustomTypeProps[] | null>(null)
  const [ customExpenseItems, setCustomExpenseItems ] = useState<CustomTypeProps[] | null>(null)
  const isCustomIncome = useRef(false)
  const customItemsSum = useRef(0)
  
  // Open Custom Sheet
  async function switchCustom( type:'income' | 'expense' ) {        
    setCurrentSheetRef( 'CustomIncomeExpense' )
    if ( type === 'income' ) {
        customItemsSum.current = 0
        isCustomIncome.current = true
        const fetchedCustomIncomes = await getCustomIncomes(focusedDate)
        setCustomIncomeItems(fetchedCustomIncomes)
        setCustomExpenseItems(null)
        fetchedCustomIncomes.forEach(item => {
            customItemsSum.current = customItemsSum.current + item.amount
        })
    } else {
        customItemsSum.current = 0
        isCustomIncome.current = false
        const fetchedCustomExpenses = await getCustomExpenses(focusedDate)
        setCustomExpenseItems(fetchedCustomExpenses)
        setCustomIncomeItems(null)
        fetchedCustomExpenses.forEach(item => {
            customItemsSum.current = customItemsSum.current + item.amount
        })
    }
    
    openRefSheetCaller()
  }

  // NAVIGATORS
  function navigateToAddItem(){
    setCurrentSheetState('AddItem')
  }

  function navigateToTransfer(){
    setCurrentSheetState('Transfer')
  }

  // Open and Close Sheet Caller - State
  function openStateSheetCaller() {
    openBottomSheet(stateSheetRef)

  }
  
  function closeStateSheetCaller(){
    closeBottomSheet(stateSheetRef)
    setFocusedItem(undefined)
    setTransferItem(undefined)
    isTransfer.current = false
    setCurrentSheetState('CreationMenu')
  }

  // Open and Close Sheet Caller - Ref
  function openRefSheetCaller() {
    openBottomSheet(refSheetRef)
  }
  
  function closeRefSheetCaller(){
    closeBottomSheet(refSheetRef)
  }
  
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
  const refSheetRef = useRef<BottomSheet>(null);
  const refBackDrop = useCallback(( props:BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.5}
          onPress={() => {
              closeRefSheetCaller()
          }}  
      />
  ),[])

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
          
          <BottomSheet 
              index={-1} 
              enableDynamicSizing={true}
              enablePanDownToClose={true}
              ref={refSheetRef}
              backdropComponent={refBackDrop}
              >
              <BottomSheetView>
                {SheetRefContent()}
              </BottomSheetView>
          </BottomSheet>
          <BottomSheet 
              index={-1} 
              enableDynamicSizing={true}
              enablePanDownToClose={true}
              ref={stateSheetRef}
              backdropComponent={stateBackDrop}
              >
              <BottomSheetView>
                {SheetContent()}
              </BottomSheetView>
          </BottomSheet>
        </FocusedDateProviderContext>
      </SafeAreaView>
  )
}