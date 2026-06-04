import { getAnalysisActiveAccounts, getAnalysisActiveCreitAccounts } from '@/db/analysis/select';
import { makeNamesPresentable, priceWithComma } from '@/func/general';
import AnalysisStyles from '@/styles/analysisStyles';
import { AnalysisActiveAccountsFinalProps, AnalysisActiveAccountsProps } from '@/types/analysis';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import FloatingCard from './floatingCard';
import Header from './Header';
import InfoText from './infoText';


export default function AnalysisOverview(){

  const [ pieData, setPieData ] = useState< AnalysisActiveAccountsFinalProps[] | undefined>(undefined)
  const [ fundBalanceSum, setFundBalanceSum ] = useState(0)
  const [ creditBalanceSum, setCreditBalanceSum ] = useState(0)
  const [ focusedIndex, setFocusedIndex ] = useState(0)

  const fundBalance = priceWithComma(fundBalanceSum)
  const creditBalance = priceWithComma(creditBalanceSum)


    function calculateSum( arr: AnalysisActiveAccountsProps[] ) {
        let sum = 0
        arr.forEach( item => {
            sum = sum + item.value
        })
        return sum
    }

    function makePercentages( tot: number, arr: AnalysisActiveAccountsProps[] ) {
        // This function calculates the percentage values for each time
        // and finds the index with the largest decimal value
        // then adds ( 100 - displayPercentage ) value to the item with largest decimal

        let highestDecimal = 0
        let highestDecimalIndex = -1
        let percentageSum = 0
        let index = 0
        const updatedItems = arr.map( item => {
            const rawPercentage = (item.value / tot) * 100
            const decimalValue = rawPercentage % 1
            const displayPercentage = Math.round(rawPercentage)
            const thisDecimalIsGreater = decimalValue > highestDecimal

            percentageSum = percentageSum + displayPercentage
            highestDecimal = thisDecimalIsGreater ? decimalValue : highestDecimal
            highestDecimalIndex = thisDecimalIsGreater ? index : highestDecimalIndex
            index++
            return {...item, percentage: displayPercentage }
        })
        updatedItems[highestDecimalIndex].percentage = updatedItems[highestDecimalIndex].percentage + 100 - percentageSum
        return updatedItems
    }

  async function fetchActiveAccounts() {
    const fetch = await getAnalysisActiveAccounts()
    
    // Make 0 indexed item focused
    // const firstItem = { ...fetch[0], focused: true }
    // fetch.splice( 0, 1, firstItem)
    const tot = calculateSum(fetch)

    // 
    setPieData(makePercentages( tot, fetch))
    setFundBalanceSum(tot)

    // CREDIT    
    const creditFetch = await getAnalysisActiveCreitAccounts()
    
    setCreditBalanceSum(calculateSum(creditFetch))
  }

  useEffect(() => {
    fetchActiveAccounts()
  }, [] )

    return (
        <FloatingCard>
            <Header header='Overview' button={undefined} wrapperAvailable={true}/>
            <View style={AnalysisStyles.overview}>
                <View style={AnalysisStyles.OverviewDetails}>
                    <View>
                        <Text style={AnalysisStyles.FundText}>Fund Balance</Text>                        
                        <Text style={AnalysisStyles.FundBalance}>
                        <Text style={AnalysisStyles.FundCurrency}>{ fundBalance.currency}. </Text>
                        { fundBalance.value }
                        <Text style={AnalysisStyles.FundDecimal}>.{ fundBalance.decimal }</Text>
                    </Text>
                    </View>
                    <View>
                        <Text style={AnalysisStyles.FundText}>Credit Used</Text>                        
                        <Text style={AnalysisStyles.FundBalance}>
                        <Text style={AnalysisStyles.FundCurrency}>{ creditBalance.currency}. </Text>
                        { creditBalance.value }
                        <Text style={AnalysisStyles.FundDecimal}>.{ creditBalance.decimal }</Text>
                        </Text>
                    </View>
                </View>
                <View style={{width:128, height:128, justifyContent:'center'}}>
                    {
                        pieData?
                            pieData.length !== 0?                            
                            <PieChart 
                                data={pieData} 
                                donut 
                                innerRadius={48}
                                radius={64}
                                focusOnPress
                                toggleFocusOnPress={false}
                                // inwardExtraLengthForFocused ={50}
                                onPress={(_: AnalysisActiveAccountsProps, index: number) => {
                                    setFocusedIndex( index )
                                }}
                                centerLabelComponent={() => {
                                    if ( focusedIndex === -1 ){
                                        return null
                                    }
                                    const focusedItem = pieData[focusedIndex]

                                    return (
                                        <View style={AnalysisStyles.centerComponent}>
                                            <Text style={AnalysisStyles.centerComponentPercText} >{focusedItem.percentage}%</Text>
                                            <Text style={AnalysisStyles.centerComponentAccountName}>{makeNamesPresentable(focusedItem.accountName, 9)}</Text>
                                        </View>
                                        
                                    )
                                }}
                                />
                            :
                            <InfoText text='No Data' />
                        :
                        <ActivityIndicator size={'small'} />
                    }
                </View>
            </View>
        </FloatingCard>
    )
}