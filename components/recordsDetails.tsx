import colors from '@/constants/colors';
import { useCheckContext } from '@/context/recordsContext';
import { getExpense, getIncomes } from '@/db/records/select';
import RecordStyles from '@/styles/recordsStyles';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import TypeItem from './recordsDetailsTypeItem';


export default function RecordsDetails() {

    // Display Today Date
    const { focusedDate } = useCheckContext()
    const date = new Date(focusedDate)
    const options: Intl.DateTimeFormatOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: '2-digit' 
    };
    const displayDate = date.toLocaleDateString('en-US', options)

    // States
    const [ incomes, setIncomes ] = useState<{ incomeId:number, accountName:string, accountBadge:string, name:string, comment:string | null, amount:number, time:string, date:string }[] | null>(null)
    const [ expenses, setExpenses ] = useState<{ expenseId:number, accountName:string, accountBadge:string, name:string, comment:string | null, amount:number, time:string, date:string }[] | null>(null)

    // Fetch
    async function fetchIncomesAndExpenses(date:string) {
        const fetchedIncomes = await getIncomes(date)
        const fetchedExpenses = await getExpense(date)
    
        setIncomes(fetchedIncomes)
        setExpenses(fetchedExpenses)
    }

    useEffect(() => {
        fetchIncomesAndExpenses(focusedDate)
    }, [focusedDate])

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
                        incomes.map((income) => (
                            <TypeItem key={income.incomeId} item={income} />
                        ))
                        :
                        <ActivityIndicator size={'small'} color={colors.light.primary}/>
                    }
                    </View>
                </View>
                <View style={RecordStyles.TypeWrapper}>
                    <Text style={RecordStyles.TypeText}>Expense</Text>
                    <View style={RecordStyles.TypeItemsWrapper}>                    
                    {
                        expenses?
                        expenses.map((expense) => (
                            <TypeItem key={expense.expenseId} item={expense} />
                        ))
                        :
                        <ActivityIndicator size={'small'} color={colors.light.primary}/>
                    }
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}