import AddRecordButton from "@/components/addRecordButton";
import BottomSheetRecordAddItem from "@/components/bottomSheetRecordAddItem";
import BottomSheetRecordCreationMenu from "@/components/bottomSheetRecordCreationMenu";
import Transfers from "@/components/bottomSheetTransfer";
import CalendarListWrapper from "@/components/recordsCalendarListWrapper";
import CustomIncomeExpenseDetails from "@/components/recordsCustomIncomeExpenseDetails";
import RecordsDetails from "@/components/recordsDetails";
import ItemDetails from "@/components/recordsItemDetails";
import { FocusedDateProviderContext } from "@/context/recordsContext";
import { getCustomExpenses, getCustomIncomes } from "@/db/records/select";
import { closeBottomSheet, openBottomSheet } from "@/func/bottomSheetfunc";
import { getLocalTime } from "@/func/time";
import { CustomExpenseTypes, CustomIncomeTypes } from "@/types/recordsTypeItemType.schema";
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

  // FOR CUSTOM INCOME EXPENSE
  const [ customIncomeItems, setCustomIncomeItems ] = useState<CustomIncomeTypes[] | null>(null)
  const [ customExpenseItems, setCustomExpenseItems ] = useState<CustomExpenseTypes[] | null>(null)
  const isCustomIncome = useRef(false)
  const customItemsSum = useRef(0)
  
  // Open Custom Sheet
  async function switchCustom( type:'income' | 'expense' ) {
        
    currentSheetRef.current = 'CustomIncomeExpense'
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

  // FOR ITEM DETAILS SHEET
  const [ focusedItem, setFocusedItem ] = useState<{ name:string, amount:number, comment:string, accountName:string, accountBadge:string, createdDateTime:string} | undefined>(undefined)

  async function switchItemDetail(item: { name:string, amount:number, comment:string, accountName:string, accountBadge:string, createdDateTime:string}) {
    currentSheetRef.current = 'ItemDetails'
    setFocusedItem(item)
    openRefSheetCaller()
  }

  // Handle mutlple states of bottom sheet - State
  const BOTTOMSHEET_STATE = {
    CreationMenu: () => <BottomSheetRecordCreationMenu
                          type={type}
                          navigateToAddItem={navigateToAddItem}
                          navigateToTransfer={navigateToTransfer}/>,

    AddItem:() => <BottomSheetRecordAddItem type={type}/>,

    Transfer: () => <Transfers />,

    CustomIncomeExpense: () => < CustomIncomeExpenseDetails 
                                        incomeItems={customIncomeItems}
                                        expenseItems={customExpenseItems}
                                        customItemsSum={customItemsSum.current}
                                        isCustomIncome={isCustomIncome.current}/>,

    ItemDetails: () => <ItemDetails item={focusedItem}/>
  }
  const [ currentSheetState, setCurrentSheetState ] = useState< 'CreationMenu' | 'AddItem' | 'Transfer'>('CreationMenu')
  
  const SheetContent = BOTTOMSHEET_STATE[currentSheetState]

  // Handle Multiple ref of bottom sheet - Ref
  const BOTTOM_REF = {
    CustomIncomeExpense: () => < CustomIncomeExpenseDetails 
                                        incomeItems={customIncomeItems}
                                        expenseItems={customExpenseItems}
                                        customItemsSum={customItemsSum.current}
                                        isCustomIncome={isCustomIncome.current}/>,

    ItemDetails: () => <ItemDetails item={focusedItem}/>,


  }

  const currentSheetRef = useRef< 'ItemDetails' | 'CustomIncomeExpense' >('ItemDetails')

  const SheetRefContent = BOTTOM_REF[currentSheetRef.current]

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
    setCurrentSheetState('CreationMenu')
  }

  // Open and Close Sheet Caller - Ref
  function openRefSheetCaller() {
    openBottomSheet(refSheetRef)

  }
  
  function closeRefSheetCaller(){
    closeBottomSheet(refSheetRef)
    setFocusedItem(undefined)
    setCustomIncomeItems(null)
    setCustomExpenseItems(null)
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
        <FocusedDateProviderContext value={{focusedDate, updateFocusedDate, closeStateSheetCaller, recordsRefreshTrigger, setRecordsRefreshTrigger, switchItemDetail}} >
          <CalendarListWrapper />
          <RecordsDetails switchCustom={switchCustom}/>

          <AddRecordButton openSheetCaller={openStateSheetCaller} />
          
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
        </FocusedDateProviderContext>
      </SafeAreaView>
  )
}