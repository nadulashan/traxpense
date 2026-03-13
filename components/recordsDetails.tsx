import { useCheckContext } from '@/context/recordsContext';
import { getCustomExpenses, getCustomIncomes, getExpense, getIncomes } from '@/db/records/select';
import { getLongDate } from '@/func/time';
import { CustomExpenseTypes, CustomIncomeTypes, ExpenseTypes, IncomeTypes } from '@/types/recordsTypeItemType.schema';
import { useNavigation } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView } from 'react-native';
import RecordsCustomIncomeExpenseDetails from './recordsCustomIncomeExpenseDetails';
import RecordsIncomeExpenseDetails from './recordsIncomeExpenseDetails';


export default function RecordsDetails() {


    // Display Today Date
    const { focusedDate, recordsRefreshTrigger } = useCheckContext()
    const navigation = useNavigation()
    
    const displayDate = getLongDate(focusedDate)

    // States
    const [ incomes, setIncomes ] = useState<IncomeTypes[] | null>(null)
    const [ expenses, setExpenses ] = useState<ExpenseTypes[] | null>(null)
    const [ customIncomeItems, setCustomIncomeItems ] = useState<CustomIncomeTypes[] | null>(null)
    const [ customExpenseItems, setCustomExpenseItems ] = useState<CustomExpenseTypes[] | null>(null)
    const isCustomIncome = useRef(false)
    const customItemsSum = useRef(0)
    const [ recordedIncome, setRecordedIncome ] = useState(0)
    const [ recordedExpenses, setRecordedExpenses ] = useState(0)

    const [ currentScreen, setCurrentScreen ] = useState<'IncomeExpenseDetails' | 'CustomIncomeExpenseDetails'>('IncomeExpenseDetails')

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

    //Switch to Custom screen
    async function switchCustom( type:'income' | 'expense' ) {
         
        if ( type === 'income' ) {
            customItemsSum.current = 0
            isCustomIncome.current = true
            const fetchedCustomIncomes = await getCustomIncomes(focusedDate)
            setCustomIncomeItems(fetchedCustomIncomes)
            setCustomExpenseItems(null)
            fetchedCustomIncomes.forEach(item => {
                customItemsSum.current = customItemsSum.current + item.amount
            })
        } else {
            customItemsSum.current = 0
            isCustomIncome.current = false
            const fetchedCustomExpenses = await getCustomExpenses(focusedDate)
            setCustomExpenseItems(fetchedCustomExpenses)
            setCustomIncomeItems(null)
            fetchedCustomExpenses.forEach(item => {
                customItemsSum.current = customItemsSum.current + item.amount
            })
        }

        setCurrentScreen('CustomIncomeExpenseDetails')
    }

    function goPrevScreen() {
        setCurrentScreen('IncomeExpenseDetails')
    }

    const SCREENS = {
        IncomeExpenseDetails : () => <RecordsIncomeExpenseDetails
                                        displayDate={displayDate}
                                        incomes={incomes}
                                        recordedIncome={recordedIncome}
                                        expenses={expenses}
                                        recordedExpenses={recordedExpenses}
                                        switchCustom={switchCustom}
                                    />,
        CustomIncomeExpenseDetails: () => <RecordsCustomIncomeExpenseDetails
                                        displayDate={displayDate}
                                        incomeItems={customIncomeItems}
                                        expenseItems={customExpenseItems}
                                        customItemsSum={customItemsSum.current}
                                        switchCustom={switchCustom}
                                        goPrevScreen={goPrevScreen}
                                        isCustomIncome={isCustomIncome.current}
                                    />,
    }
    const showScreen = SCREENS[currentScreen]


    useEffect(() => {
        fetchIncomesAndExpenses(focusedDate)
    }, [focusedDate, recordsRefreshTrigger])

    useEffect(() => {
        calculatedRecordedIncome()
    },[incomes])

    useEffect(() => {
        calculatedRecordedExpenses()
    },[expenses])

    useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
        fetchIncomesAndExpenses(focusedDate)
    });

    return unsubscribe;
    }, [navigation]);
    
    return(
        <ScrollView>
            {showScreen()}
        </ScrollView>
    )
}