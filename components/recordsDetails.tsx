import { useCheckContext } from '@/context/recordsContext';
import { getExpense, getIncomes, getTransfer } from '@/db/records/select';
import { getLongDate } from '@/func/time';
import { ExpenseTypes, IncomeTypes, TransferTypes } from '@/types/recordsTypeItemType.schema';
import { useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import RecordsIncomeExpenseDetails from './recordsIncomeExpenseDetails';

interface RecordDetailsTypes{
    switchCustom:(type: "income" | "expense") => Promise<void>;
}

export default function RecordsDetails({switchCustom}:RecordDetailsTypes) {


    // Display Today Date
    const { focusedDate, recordsRefreshTrigger } = useCheckContext()
    const navigation = useNavigation()
    
    const displayDate = getLongDate(focusedDate)

    // States
    const [ incomes, setIncomes ] = useState<IncomeTypes[] | null>(null)
    const [ expenses, setExpenses ] = useState<ExpenseTypes[] | null>(null)
    const [ transfers, setTransfers ] = useState<TransferTypes[] | null>(null)
    const [ recordedIncome, setRecordedIncome ] = useState(0)
    const [ recordedExpenses, setRecordedExpenses ] = useState(0)

    const [ currentScreen, setCurrentScreen ] = useState<'IncomeExpenseDetails' | 'CustomIncomeExpenseDetails'>('IncomeExpenseDetails')

    // Fetch
    async function fetchIncomesAndExpenses() {
        const fetchedIncomes = await getIncomes(focusedDate)
        const fetchedExpenses = await getExpense(focusedDate)
    
        setIncomes(fetchedIncomes)
        setExpenses(fetchedExpenses)
    }

    async function fetchTransfers() {
        const fetchedTransfers = await getTransfer(focusedDate)
        setTransfers(fetchedTransfers)
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
        setIncomes(null)
        setExpenses(null)
        setTransfers(null)
        fetchIncomesAndExpenses()
        fetchTransfers()
    }, [focusedDate, recordsRefreshTrigger])

    useEffect(() => {
        calculatedRecordedIncome()
    },[incomes])

    useEffect(() => {
        calculatedRecordedExpenses()
    },[expenses])

    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         fetchIncomesAndExpenses()
    //     });

    //     return unsubscribe;
    // }, [navigation]);
    
    return(
        <ScrollView>
            <RecordsIncomeExpenseDetails
                                        displayDate={displayDate}
                                        incomes={incomes}
                                        recordedIncome={recordedIncome}
                                        expenses={expenses}
                                        recordedExpenses={recordedExpenses}
                                        switchCustom={switchCustom}
                                        transfers={transfers}
                                    />
        </ScrollView>
    )
}