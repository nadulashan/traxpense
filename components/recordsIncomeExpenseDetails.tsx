import colors from '@/constants/colors';
import { priceWithComma } from '@/func/general';
import CommonStyles from '@/styles/commonStyles';
import RecordStyles from '@/styles/recordsStyles';
import { ExpenseTypes, IncomeTypes, TransferTypes } from '@/types/recordsTypeItemType.schema';
import { ActivityIndicator, Text, View } from 'react-native';
import TypeItem from './recordsDetailsTypeItem';


interface RecordIncomeExpenseDetailsTypes{
    displayDate:string;
    incomes:IncomeTypes[] | null;
    recordedIncome:number;
    expenses:ExpenseTypes[] | null;
    recordedExpenses:number;
    switchCustom:( type:'income' | 'expense') => void;
    transfers: TransferTypes[] | null;
}

export default function RecordsIncomeExpenseDetails({
    displayDate,
    incomes,
    recordedIncome,
    expenses,
    recordedExpenses,
    switchCustom,
    transfers
}:RecordIncomeExpenseDetailsTypes) {
    return(
        
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
                                <TypeItem key={income.incomeId} item={income} switchCustom={switchCustom}  type={'income'}/>
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
                                <TypeItem key={expense.expenseId} item={expense} switchCustom={switchCustom} type={'expense'}/>
                            ))
                            :
                            <Text style={CommonStyles.NoActionText}>No Records</Text>
                        :
                        <ActivityIndicator size={'small'} color={colors.light.primary}/>
                    }
                    </View>
                </View>
                <View style={RecordStyles.RecordedTypeWrapper}>
                    <Text style={RecordStyles.RecordedTypeText}>Recorded Expenses</Text>
                    <Text style={RecordStyles.RecordedTypeText}>{priceWithComma(recordedExpenses)}</Text>
                </View>
                {
                    transfers?
                        transfers.length !== 0 ?
                        <View style={RecordStyles.TypeWrapper}>
                            <Text style={RecordStyles.TypeText}>Transfers</Text>
                            <View style={RecordStyles.TypeItemsWrapper}>                    
                            {
                                transfers.map(transfer => (
                                    <Text>{transfer.from_account_name}</Text>
                                ))
                            }
                            </View>
                        </View>
                        :
                        null
                    :
                    <ActivityIndicator size={'large'} color={colors.light.primary}/>
                }
        </View>
    )
}