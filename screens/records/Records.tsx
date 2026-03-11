import AddRecordButton from "@/components/addRecordButton";
import BottomSheetRecordAddItem from "@/components/bottomSheetRecordAddItem";
import BottomSheetRecordCreationMenu from "@/components/bottomSheetRecordCreationMenu";
import CalendarListWrapper from "@/components/recordsCalendarListWrapper";
import RecordsDetails from "@/components/recordsDetails";
import { FocusedDateProviderContext } from "@/context/recordsContext";
import { closeBottomSheet, openBottomSheet } from "@/func/bottomSheetfunc";
import { getLocalTime } from "@/func/time";
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
//                _____________________|___________________________________________________
//               CreationMenu                                                         Add Item
//                    # Add Income                      _________________________________|____________________________
//                    # Add Expense                    Form                          CategoryWrapper         AccountWrapper
//                    # Create Journal                    # handles all states              # render                  # render
//                                                        # define all the functions         active categories        active accounts
//                                                        # fetching and storeing

export default function Records(){

  // Refresh Records Trigger
  const [ recordsRefreshTrigger, setRecordsRefreshTrigger ] = useState(0)

  const dateNow = getLocalTime().toISOString().split('T')[0] // set Focused Date to today
  const [ focusedDate, setFocusedDate ] = useState<string>(dateNow)
  const [ readyToFetch, setReadyToFetch ] = useState(true)
  const type = useRef< null | 'income' | 'expense' >(null)
 
  function updateFocusedDate(date:string){
    setFocusedDate(date)
  }

  function updateReadyToFetch() {
    setReadyToFetch(!setReadyToFetch)
  }

  // Handle mutlple states of bottom sheet
  const BOTTOMSHEET_STATE = {
    CreationMenu: BottomSheetRecordCreationMenu,
    AddItem:BottomSheetRecordAddItem
  }
  const [ currentSheetState, setCurrentSheetState ] = useState<'CreationMenu' | 'AddItem'>('CreationMenu')
  
  const SheetContent = BOTTOMSHEET_STATE[currentSheetState]

  function navigateToAddItem(){
    setCurrentSheetState('AddItem')
  }

  // Open and Close Sheet Caller
  function openSheetCaller() {
    openBottomSheet(sheetRef)

  }
  
  function closeSheetCaller(){
      closeBottomSheet(sheetRef)
      setCurrentSheetState('CreationMenu')
  }
  
  // Bottom Sheet things including backdrop
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

  return (
      <SafeAreaView style={{backgroundColor:'#ffffff', flexDirection:'row', height:'100%'}} edges={['top', 'left', 'right']}>
        <FocusedDateProviderContext value={{focusedDate, updateFocusedDate, updateReadyToFetch,  navigateToAddItem, type, closeSheetCaller, recordsRefreshTrigger, setRecordsRefreshTrigger}} >
          <CalendarListWrapper />
          <RecordsDetails />

          <AddRecordButton openSheetCaller={openSheetCaller} />
          
          <BottomSheet 
              index={-1} 
              enableDynamicSizing={true}
              enablePanDownToClose={true}
              ref={sheetRef}
              backdropComponent={backDrop}
              // onChange={handleSuspendNotificationState}
              >
              <BottomSheetView>
                < SheetContent />
              </BottomSheetView>
          </BottomSheet>
        </FocusedDateProviderContext>
      </SafeAreaView>
  )
}