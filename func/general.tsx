export function priceWithComma(amount:number):string{
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

    commaNumberArr.push('.')
    commaNumberArr.push(oneTenth)
    commaNumberArr.push(oneHundredth)
    const commaNum = commaNumberArr.join('')
    return `Rs. ${commaNum}`
}

export function displayTimes(time:string){
    return time.split('T').join(' @ ').split('.')[0]
}