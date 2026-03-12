export function getLocalTime():any{
    const date = new Date()
    const offset = date.getTimezoneOffset()
    const localTime = new Date(date.getTime() - (offset * 60 * 1000))
    // const time = localTime.toISOString().split('T').join(' ')
    return localTime
}

export function getLongDate(dateString:string) {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: '2-digit' 
    };
    return date.toLocaleDateString('en-US', options)
}

export function addOneYear(time:any){
    time.setMonth(time.getMonth() + 12)
}

export function addSixMonths(time:any){
    time.setMonth(time.getMonth() + 6)
}

export function addFourMonths(time:any){
    time.setMonth(time.getMonth() + 4)
}

export function addThreeMonths(time:any){
    time.setMonth(time.getMonth() + 3)
}

export function addOneMonth(time:any){
    time.setMonth(time.getMonth() + 1)
}

export function addSevenDays(time:any){
    time.setDate(time.getDate() + 7)
}

export function addOneDay(time:any){
    time.setDate(time.getDate() + 1)
}