import AddItemForm from '@/components/recordAddItemForm';
import TypeItem from '@/components/recordsDetailsTypeItem';
import colors from '@/constants/colors';
import { getLongDate } from '@/func/time';
import RecordStyles from '@/styles/recordsStyles';
import { useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function AddRecords({route}:any){

    const navigation = useNavigation()
    const { focusedDate } = route.params
    const longDate = getLongDate(focusedDate)

    // States
    const [ selectedAccount, setSelectedAccount ] = useState<{ accountId:number, accountName:string, accountBadge:string } | null>(null)
    const [ comment, setComment ] = useState<string>('')
    const [ ammountError, setAmountError ] = useState(false)
    const [ selectedCategory, setSelectedCategory ] = useState<{ categoryId:number, name:string, badge:string } | null>(null)
    const [ amount, setAmount ] = useState<string>('')

    const [ incomeArray, setIncomeArray ] = useState<{ categoryId:number, amount:number, accountId:number, comment:string | null }[] | null>(null)
    const [ expenseArray, setExpenseArray ] = useState<{ categoryId:number, amount:number, accountId:number, comment:string | null }[] | null>(null)

    // Handlers
    function onAddIncomePressHandler() {

    }
    function onAddExpensePressHandler() {

    }

    function handleIncomeCategorySelector() {
        
    }
    function handleExpenseCategorySelector() {
        
    }

    function handleAccountSelector() {

    }

    useEffect(() => {
        navigation.setOptions({title:longDate})
    })
    return (
        <ScrollView style={{backgroundColor:colors.light.white}}>
            <View style={RecordStyles.CreateJournalWrapper}>
                <Text style={RecordStyles.TypeText}>Income</Text>
                <View>
                    {
                        incomeArray?
                        incomeArray.map(incomeItem => (
                            <TypeItem item={incomeItem} />
                        ))
                    }
                     <AddItemForm 
                        amount={amount}
                        setAmount={setAmount}
                        onAddPressHandler={onAddIncomePressHandler}
                        comment={comment}
                        setComment={setComment}
                        amountError={ammountError}
                        setAmountError={setAmountError}
                        handleCategorySelector={handleIncomeCategorySelector}
                        selectedCategory={selectedCategory}
                        handleAccountSelector={handleAccountSelector}
                        selectedAccount={selectedAccount}
                    />
                </View>
                <Text style={RecordStyles.TypeText}>Expense</Text>
                <View>
                     <AddItemForm 
                        amount={amount}
                        setAmount={setAmount}
                        onAddPressHandler={onAddExpensePressHandler}
                        comment={comment}
                        setComment={setComment}
                        amountError={ammountError}
                        setAmountError={setAmountError}
                        handleCategorySelector={handleExpenseCategorySelector}
                        selectedCategory={selectedCategory}
                        handleAccountSelector={handleAccountSelector}
                        selectedAccount={selectedAccount}
                    />
                </View>
            </View>
        </ScrollView>
    )
}