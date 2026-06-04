import { getCreditDetails, getRunningAmount } from "@/db/fundCreditAccounts/select";
import { PriceWithCommaProps } from "@/types/homeProps";
import { CustomTypeProps, TransferTypes, TypeProps } from "@/types/recordsTypeItemType.schema";

export function priceWithComma(amount:number):PriceWithCommaProps{
    // CURRENCY
    const currency = 'Rs'

    if ( amount === 0 ) {        
    return {currency: currency, value: '0', decimal: '00'}
    }
    const stringNumber = amount.toString()
    const arrNumber = stringNumber.split('')
    const oneHundredth = arrNumber.pop()!;
    const oneTenth = arrNumber.pop()!;
    arrNumber.reverse()

    let index = 0;
    let commaNumberArr:string[] = [];
    arrNumber.forEach(digit => {
        if (index == 3){
            commaNumberArr.unshift(',')
            index = 0
        }
        commaNumberArr.unshift(digit)
        index++
    })

    const decimal = `${oneTenth}${oneHundredth}`
    const commaNum = commaNumberArr.join('')
    return {currency: currency, value: commaNum, decimal: decimal}
}

export function displayTimes(time:string){
    return time.split('T').join(' @ ').split('.')[0]
}

export async function checkNegativeBalance( accountId: number, amount: string, focusedItem: React.RefObject<TypeProps | TransferTypes | CustomTypeProps | undefined> ) {
    const accountDetails = await getCreditDetails( accountId )
    const runningAmount = await getRunningAmount( accountId )

    const store = Number(amount) * 100

    if ( focusedItem  && focusedItem.current ) { // if App is performing an edit, New amount should be <= running
        if ( !accountDetails?.isCredit ) {
            return !( runningAmount >= (store - focusedItem.current.amount) )
        } else { // if its credit, new running should be >= - amount. 
            return !( runningAmount - (store - focusedItem.current.amount) >= ( - accountDetails.amount ) )
        }
    } else { // if App is performing a new Record, amount should be <= running
        if ( !accountDetails?.isCredit ) {
            return !( runningAmount >= store )
        } else { // if credit, running balance >= record amount
            return !( runningAmount - store >= ( - accountDetails.amount ) )
        }
    }
}

export function makeNamesPresentable( name: string, maxLength: number ) {

    if ( name.length < maxLength ) {
        return name
    }

    const arr = name.split('')
    let i = 0
    const newArr = arr.filter( item => {
        i++
        return ( i <= 3 || i > arr.length - 4 )
    })
    newArr.splice( 3, 0, '...' )
    return(newArr.join(''))
}