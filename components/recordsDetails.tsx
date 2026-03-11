import colors from '@/constants/colors';
import { useCheckContext } from '@/context/recordsContext';
import { getExpense, getIncomes } from '@/db/records/select';
import { priceWithComma } from '@/func/general';
import CommonStyles from '@/styles/commonStyles';
import RecordStyles from '@/styles/recordsStyles';
import { ExpenseTypes, IncomeTypes } from '@/types/recordsTypeItemType.schema';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import TypeItem from './recordsDetailsTypeItem';


export default function RecordsDetails() {

    // Display Today Date
    const { focusedDate, recordsRefreshTrigger } = useCheckContext()
    const date = new Date(focusedDate)
    const options: Intl.DateTimeFormatOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: '2-digit' 
    };
    const displayDate = date.toLocaleDateString('en-US', options)

    // States
    const [ incomes, setIncomes ] = useState<IncomeTypes[] | null>(null)
    const [ expenses, setExpenses ] = useState<ExpenseTypes[] | null>(null)
    const [ recordedIncome, setRecordedIncome ] = useState(0)
    const [ recordedExpenses, setRecordedExpenses ] = useState(0)


    // Fetch
    async function fetchIncomesAndExpenses(date:string) {
        const fetchedIncomes = await getIncomes(date)
        const fetchedExpenses = await getExpense(date)
    
        setIncomes(fetchedIncomes)
        setExpenses(fetchedExpenses)
    }

    // Calculated Total
    function calculatedRecordedIncome() {
        if ( incomes ) {
            let total:number;
            total = 0
            incomes.forEach(income => {
                total = total + income.amount
            })
            setRecordedIncome(total)
        }
    }

    function calculatedRecordedExpenses() {
        if ( expenses ) {
            let total:number;
            total = 0
            expenses.forEach(expense => {
                total = total + expense.amount
            })
            setRecordedExpenses(total)
        }
    }


    useEffect(() => {
        fetchIncomesAndExpenses(focusedDate)
    }, [focusedDate, recordsRefreshTrigger])

    useEffect(() => {
        calculatedRecordedIncome()
    },[incomes])

    useEffect(() => {
        calculatedRecordedExpenses()
    },[expenses])

    return(
        <ScrollView>
            <View  style={RecordStyles.RecordDetailsWrapper}>
                <Text style={RecordStyles.DateText}>
                    {displayDate}
                </Text>
                <View style={RecordStyles.TypeWrapper}>
                    <Text style={RecordStyles.TypeText}>Income</Text>
                    <View style={RecordStyles.TypeItemsWrapper}>                    
                    {
                        incomes?
                            incomes.length !== 0 ?
                            incomes.map((income) => (
                                <TypeItem key={income.incomeId} item={income} />
                            ))
                            :
                            <Text style={CommonStyles.NoActionText}>No Records</Text>
                        :
                        <ActivityIndicator size={'small'} color={colors.light.primary}/>
                    }
                    </View>
                </View>
                <View style={RecordStyles.RecordedTypeWrapper}>
                    <Text style={RecordStyles.RecordedTypeText}>Recorded Income</Text>
                    <Text style={RecordStyles.RecordedTypeText}>{priceWithComma(recordedIncome)}</Text>
                </View>
                <View style={RecordStyles.TypeWrapper}>
                    <Text style={RecordStyles.TypeText}>Expense</Text>
                    <View style={RecordStyles.TypeItemsWrapper}>                    
                    {
                        expenses?
                            expenses.length !== 0 ?
                            expenses.map((expense) => (
                                <TypeItem key={expense.expenseId} item={expense} />
                            ))
                            :
                            <Text style={CommonStyles.NoActionText}>No Records</Text>
                        :
                        <ActivityIndicator size={'small'} color={colors.light.primary}/>
                    }
                    </View>
                </View>
                <View style={RecordStyles.RecordedTypeWrapper}>
                    <Text style={RecordStyles.RecordedTypeText}>Recorded Expenditure</Text>
                    <Text style={RecordStyles.RecordedTypeText}>{priceWithComma(recordedExpenses)}</Text>
                </View>
            </View>
        </ScrollView>
    )
}