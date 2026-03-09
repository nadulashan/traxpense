import { useCheckContext } from "@/context/recordsContext";
import RecordStyles from "@/styles/recordsStyles";
import { FlashList } from "@shopify/flash-list";
import { RefObject, useEffect, useRef } from "react";
import { Pressable, Text, View } from 'react-native';


function createDates(dateString:string){
  const [ year, month, date ] = dateString.split('-')
  const dateISO = new Date(dateString)
  return dateISO
}

function milliToDate(milli:number){
  return new Date (milli)
}

function MyList(){

  const fetchedInitialDateString = '2026-01-04'
  const today = new Date().toISOString().split('T')[0] // get today's date only
  const todayDate = createDates(today)
  const fetchedDate = createDates(fetchedInitialDateString)
  const dayLength = (todayDate.getTime() - fetchedDate.getTime()) / ( 60*60*24*1000 ) + 3 // difference between today and launch day + one day for today + 2 forward days
  const startingDate = new Date(todayDate.setDate(todayDate.getDate() + 2))
  const monthArray = [
    'Jan', 'Feb', 'Mar', 'Apr', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ]
  const dayArray = [
    'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'
  ]


  const datelist = Array.from({ length: dayLength }, (_, i ) => {

    const newStartingDate = new Date(startingDate)
    const exactDate =  milliToDate( newStartingDate.setDate( newStartingDate.getDate() - i) )
    const exactDateString = exactDate.toISOString().split('T')[0]

    return ({
    id:i,
    day:dayArray[ exactDate.getDay() ],
    month:monthArray[ exactDate.getMonth() ],
    date:exactDate.getDate(),
    exact: exactDateString
    })
  }) 

  const { focusedDate, updateFocusedDate, updateReadyToFetch } = useCheckContext()
  const itemHeight = 160
  const initialDate = useRef<string>(focusedDate)
  const nextDate = useRef<string | undefined>(undefined)
  const listRef = useRef<any>(null)
  const scrolledValue = useRef<number>(0) // to remember scrolled amount in the past

  // output given String as  DATE
  
  // Calculates the difference between initial and next date and scroll the list
  function handlePressedScroll(initialDate:RefObject<string | undefined>, nextDate:RefObject<string | undefined>){
    if ( initialDate.current && nextDate.current) {
      const millisecDiff = createDates(initialDate.current).getTime() - createDates(nextDate.current).getTime()
      const dateDiff = millisecDiff / ( 60*60*24*1000)
      const offsetPixels = dateDiff * itemHeight
      scrolledValue.current = scrolledValue.current + offsetPixels
      listRef.current?.scrollToOffset({
        offset:scrolledValue.current
      })
    }
  }

  function onDateItemPress(date:string){
    initialDate.current = focusedDate
    updateFocusedDate(date)
    nextDate.current = date
    handlePressedScroll(initialDate, nextDate) 
  }

  function handleReadytoFetch() {
    updateReadyToFetch()
  }

  function renderItem ({item}:any) {    
      const selected = focusedDate

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

  
  useEffect(() => {
  updateFocusedDate(datelist[2].exact)
  },[])
   
  return (
    <View style={RecordStyles.ListWrapper}>
      <FlashList
        ref={listRef}
        data={datelist}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToInterval={itemHeight} 
        snapToAlignment="start" 
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