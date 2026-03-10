import { useCheckContext } from '@/context/recordsContext';
import { getExpense, getIncomes } from '@/db/records/select';
import RecordStyles from '@/styles/recordsStyles';
import { useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';


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

    // Fetch
    async function fetchIncomesAndExpenses(date:string) {
        await getIncomes(date)
        await getExpense(date)
    }

    useEffect(() => {
        fetchIncomesAndExpenses(focusedDate)
    }, [focusedDate])

    return(
        <ScrollView style={RecordStyles.RecordDetailsWrapper}>
            <Text style={RecordStyles.DateText}>
                {displayDate}
            </Text>
            <View style={RecordStyles.TypeWrapper}>
                <Text style={RecordStyles.TypeText}>Income</Text>
            </View>
            <View style={RecordStyles.TypeWrapper}>
                <Text style={RecordStyles.TypeText}>Expense</Text>
            </View>
        </ScrollView>
    )
}