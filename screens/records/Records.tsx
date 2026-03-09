import AddRecordButton from "@/components/addRecordButton";
import BottomSheetRecordAddItem from "@/components/bottomSheetRecordAddItem";
import BottomSheetRecordCreationMenu from "@/components/bottomSheetRecordCreationMenu";
import CalendarListWrapper from "@/components/recordsCalendarListWrapper";
import RecordsDetails from "@/components/recordsDetails";
import { FocusedDateProviderContext } from "@/context/recordsContext";
import { closeBottomSheet, openBottomSheet } from "@/func/bottomSheetfunc";
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetView } from "@gorhom/bottom-sheet";
import { useCallback, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

// This is the main Screen for displaying Records
//  there are 2 other screens for this stack
//  there are 5 components rendered by this screen
//    flexed for row calender date scroller and record display scroller
//    fixed button with absolute positioning, and two bottom sheets
//       

export default function Records(){

  const [ focusedDate, setFocusedDate ] = useState<string | undefined>(undefined)
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
        <FocusedDateProviderContext value={{focusedDate, updateFocusedDate, updateReadyToFetch,  navigateToAddItem, type}} >
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