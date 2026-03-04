import { FocusedDateProviderContext } from "@/context/recordsContext";
import RecordStyles from "@/styles/recordsStyles";
import { FlashList } from "@shopify/flash-list";
import { RefObject, useContext, useRef } from "react";
import { Pressable, Text, View } from 'react-native';

function MyList(){
  const DATA = [
  { id: 1, day: 'MON', date: 26, month: 'Jan', exact: '2026-01-26' },
  { id: 2, day: 'SUN', date: 25, month: 'Jan', exact: '2026-01-25' },
  { id: 3, day: 'SAT', date: 24, month: 'Jan', exact: '2026-01-24' },
  { id: 4, day: 'FRI', date: 23, month: 'Jan', exact: '2026-01-23' },
  { id: 5, day: 'THU', date: 22, month: 'Jan', exact: '2026-01-22' },
  { id: 6, day: 'WED', date: 21, month: 'Jan', exact: '2026-01-21' },
  { id: 7, day: 'TUE', date: 20, month: 'Jan', exact: '2026-01-20' },
  { id: 8, day: 'MON', date: 19, month: 'Jan', exact: '2026-01-19' },
  { id: 9, day: 'SUN', date: 18, month: 'Jan', exact: '2026-01-18' },
  { id: 10, day: 'SAT', date: 17, month: 'Jan', exact: '2026-01-17' },
  { id: 11, day: 'FRI', date: 16, month: 'Jan', exact: '2026-01-16' },
  { id: 12, day: 'THU', date: 15, month: 'Jan', exact: '2026-01-15' },
  { id: 13, day: 'WED', date: 14, month: 'Jan', exact: '2026-01-14' },
  { id: 14, day: 'TUE', date: 13, month: 'Jan', exact: '2026-01-13' },
  { id: 15, day: 'MON', date: 12, month: 'Jan', exact: '2026-01-12' },
  { id: 16, day: 'SUN', date: 11, month: 'Jan', exact: '2026-01-11' },
  { id: 17, day: 'SAT', date: 10, month: 'Jan', exact: '2026-01-10' },
  { id: 18, day: 'FRI', date: 9, month: 'Jan', exact: '2026-01-09' },
  { id: 19, day: 'THU', date: 8, month: 'Jan', exact: '2026-01-08' },
  { id: 20, day: 'WED', date: 7, month: 'Jan', exact: '2026-01-07' },
  { id: 21, day: 'TUE', date: 6, month: 'Jan', exact: '2026-01-06' },
  { id: 22, day: 'MON', date: 5, month: 'Jan', exact: '2026-01-05' },
  { id: 23, day: 'SUN', date: 4, month: 'Jan', exact: '2026-01-04' },
  { id: 24, day: 'SAT', date: 3, month: 'Jan', exact: '2026-01-03' },
  { id: 25, day: 'FRI', date: 2, month: 'Jan', exact: '2026-01-02' },
  { id: 26, day: 'THU', date: 1, month: 'Jan', exact: '2026-01-01' },
  { id: 27, day: 'WED', date: 31, month: 'Dec', exact: '2025-12-31' },
  { id: 28, day: 'TUE', date: 30, month: 'Dec', exact: '2025-12-30' },
  { id: 29, day: 'MON', date: 29, month: 'Dec', exact: '2025-12-29' },
  { id: 30, day: 'SUN', date: 28, month: 'Dec', exact: '2025-12-28' },
  { id: 31, day: 'SAT', date: 27, month: 'Dec', exact: '2025-12-27' },
  { id: 32, day: 'FRI', date: 26, month: 'Dec', exact: '2025-12-26' },
  { id: 33, day: 'THU', date: 25, month: 'Dec', exact: '2025-12-25' },
  { id: 34, day: 'WED', date: 24, month: 'Dec', exact: '2025-12-24' },
  { id: 35, day: 'TUE', date: 23, month: 'Dec', exact: '2025-12-23' },
  { id: 36, day: 'MON', date: 22, month: 'Dec', exact: '2025-12-22' },
  { id: 37, day: 'SUN', date: 21, month: 'Dec', exact: '2025-12-21' },
  { id: 38, day: 'SAT', date: 20, month: 'Dec', exact: '2025-12-20' },
  { id: 39, day: 'FRI', date: 19, month: 'Dec', exact: '2025-12-19' },
  { id: 40, day: 'THU', date: 18, month: 'Dec', exact: '2025-12-18' },
  { id: 41, day: 'WED', date: 17, month: 'Dec', exact: '2025-12-17' },
  { id: 42, day: 'TUE', date: 16, month: 'Dec', exact: '2025-12-16' },
  { id: 43, day: 'MON', date: 15, month: 'Dec', exact: '2025-12-15' },
  { id: 44, day: 'SUN', date: 14, month: 'Dec', exact: '2025-12-14' },
  { id: 45, day: 'SAT', date: 13, month: 'Dec', exact: '2025-12-13' },
  { id: 46, day: 'FRI', date: 12, month: 'Dec', exact: '2025-12-12' },
  { id: 47, day: 'THU', date: 11, month: 'Dec', exact: '2025-12-11' },
  { id: 48, day: 'WED', date: 10, month: 'Dec', exact: '2025-12-10' },
  { id: 49, day: 'TUE', date: 9, month: 'Dec', exact: '2025-12-09' },
  { id: 50, day: 'MON', date: 8, month: 'Dec', exact: '2025-12-08' }
  ];

  const context = useContext(FocusedDateProviderContext)
  const itemHeight = 160
  const initialDate = useRef<string>(context?.focusedDate)
  const nextDate = useRef<string | undefined>(undefined)
  const listRef = useRef<any>(null)
  const scrolledValue = useRef<number>(0) // to remember scrolled amount in the past

  // output given String as  DATE
  function createDates(dateString:string){
    const [ year, month, date ] = dateString.split('-')
    const dateISO = new Date(dateString)
    return dateISO.getTime()
  }
  
  // Calculates the difference between initial and next date and scroll the list
  function handlePressedScroll(initialDate:RefObject<string | undefined>, nextDate:RefObject<string | undefined>){
    if ( initialDate.current && nextDate.current) {
      const millisecDiff = createDates(initialDate.current) - createDates(nextDate.current)
      const dateDiff = millisecDiff / ( 60*60*24*1000)
      const offsetPixels = dateDiff * itemHeight
      scrolledValue.current = scrolledValue.current + offsetPixels
      listRef.current?.scrollToOffset({
        offset:scrolledValue.current
      })
    }
  }

  function onDateItemPress(date:string){
    initialDate.current = context?.focusedDate
    context?.updateFocusedDate(date)
    nextDate.current = date
    handlePressedScroll(initialDate, nextDate) 
  }

  function handleScroll(e:any) {
    const scrolledAmount = e.nativeEvent.contentOffset.y
    console.log(scrolledAmount)
  }

  function handleReadytoFetch() {
    context?.updateReadyToFetch()
  }

  function renderItem ({item}:any) {    
      const selected = context?.focusedDate

      return(
      <Pressable 
          onPress={() => onDateItemPress(item.exact)}
          style={[RecordStyles.DateItem, item.exact === selected? RecordStyles.DateItemSelected : null]}>
          <Text style={[RecordStyles.DateItemMonth, item.exact === selected? RecordStyles.SelectedText : null]}>{item.month}</Text>
          <Text style={[RecordStyles.DateItemDate, item.exact === selected? RecordStyles.SelectedText : null]}>{item.date}</Text>
          <Text style={[RecordStyles.DateItemDay, , item.exact === selected? RecordStyles.SelectedText : null]}>{item.day}</Text>
      </Pressable>
      )
  }

  return (
    <View style={RecordStyles.ListWrapper}>
      <FlashList
        ref={listRef}
        data={DATA}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        // 1. Tell it the exact height of ONE item (e.g., 100 pixels)
        onScroll={handleScroll}
        scrollEventThrottle={16}
        // 2. The magic prop: Snap every 100 pixels
        snapToInterval={itemHeight} 
        
        // 3. Ensure it snaps to the top (start) of the item
        snapToAlignment="start" 
        
        // 4. Make the flick "stop" quickly so it doesn't skip 10 items
        decelerationRate="fast"
        onScrollBeginDrag={handleReadytoFetch}
        onMomentumScrollEnd={handleReadytoFetch}
      />
    </View>
  )
}

export default function DateList(){
    return (
        <MyList />
    )
}