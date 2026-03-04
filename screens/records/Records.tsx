import CalendarListWrapper from "@/components/recordsCalendarListWrapper";
import RecordsDetails from "@/components/recordsDetails";
import { FocusedDateProviderContext } from "@/context/recordsContext";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Records(){

  const [ focusedDate, setFocusedDate ] = useState<string>('2026-01-24')
  const [ readyToFetch, setReadyToFetch ] = useState(true)

  function updateFocusedDate(date:string){
    setFocusedDate(date)
  }

  function updateReadyToFetch() {
    setReadyToFetch(!setReadyToFetch)
  }

  return (
      <SafeAreaView style={{backgroundColor:'#ffffff', flexDirection:'row', height:'100%'}} edges={['top', 'left', 'right']}>
        <FocusedDateProviderContext value={{focusedDate, updateFocusedDate, updateReadyToFetch}} >
          <CalendarListWrapper />
          <RecordsDetails />
        </FocusedDateProviderContext>
      </SafeAreaView>
  )
}