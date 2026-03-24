import colors from '@/constants/colors';
import { useCheckContext } from '@/context/recordsContext';
import { getExpense, getIncomes, getTransfer } from '@/db/records/select';
import { priceWithComma } from '@/func/general';
import { getLongDate } from '@/func/time';
import CommonStyles from '@/styles/commonStyles';
import RecordStyles from '@/styles/recordsStyles';
import { ExpenseTypes, IncomeTypes, TransferTypes } from '@/types/recordsTypeItemType.schema';
import { useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import TransferItem from './recordsDetailsTransferItem';
import TypeItem from './recordsDetailsTypeItem';

export default function RecordsDetails() {


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
                                <TypeItem key={income.typeId} item={income}  type={'income'}/>
                            ))
                            :
                            <Text style={CommonStyles.NoActionText}>No Records</Text>
                        :
                        <ActivityIndicator size={'small'} color={colors.light.primary}/>
                    }
                    </View>
                </View>
                {
                    incomes?.length !== 0 ?
                    <View style={RecordStyles.RecordedTypeWrapper}>
                        <Text style={RecordStyles.RecordedTypeText}>Recorded Income</Text>
                        <Text style={RecordStyles.RecordedTypeText}>{priceWithComma(recordedIncome)}</Text>
                    </View>
                    : 
                    null
                }
                <View style={RecordStyles.TypeWrapper}>
                    <Text style={RecordStyles.TypeText}>Expense</Text>
                    <View style={RecordStyles.TypeItemsWrapper}>                    
                    {
                        expenses?
                            expenses.length !== 0 ?
                            expenses.map((expense) => (
                                <TypeItem key={expense.typeId} item={expense} type={'expense'}/>
                            ))
                            :
                            <Text style={CommonStyles.NoActionText}>No Records</Text>
                        :
                        <ActivityIndicator size={'small'} color={colors.light.primary}/>
                    }
                    </View>
                </View>
                {
                    expenses?.length !== 0 ?
                    <View style={RecordStyles.RecordedTypeWrapper}>
                        <Text style={RecordStyles.RecordedTypeText}>Recorded Expenses</Text>
                        <Text style={RecordStyles.RecordedTypeText}>{priceWithComma(recordedExpenses)}</Text>
                    </View>
                    :
                    null

                }
                {
                    transfers?
                        transfers.length !== 0 ?
                        <View style={RecordStyles.TypeWrapper}>
                            <Text style={RecordStyles.TypeText}>Transfers</Text>
                            <View style={RecordStyles.TypeItemsWrapper}>                    
                            {
                                transfers.map(transfer => (
                                    <TransferItem item={transfer} key={transfer.transferId} />
                                ))
                            }
                            </View>
                        </View>
                        :
                        null
                    :
                    <ActivityIndicator size={'small'} color={colors.light.primary}/>
                }
            </View>
        </ScrollView>
    )
}