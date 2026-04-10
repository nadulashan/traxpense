import { getCreditDetails, getRunningAmount } from "@/db/fundCreditAccounts/select";
import { CustomTypeProps, TransferTypes, TypeProps } from "@/types/recordsTypeItemType.schema";

export function priceWithComma(amount:number):{currency: string, value: string, decimal: string}{
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
    const currency = 'Rs'
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