import colors from '@/constants/colors';
import { priceWithComma } from '@/func/general';
import CommonStyles from '@/styles/commonStyles';
import RecordStyles from '@/styles/recordsStyles';
import { CustomTypeProps } from '@/types/recordsTypeItemType.schema';
import { ActivityIndicator, Text, View } from 'react-native';
import CustomTypeItem from './recordsDetailsCustomTypeItem';


interface RecordCustomIncomeExpenseDetailsTypes{
    incomeItems:CustomTypeProps[] |  null;
    expenseItems:CustomTypeProps[] | null;
    customItemsSum:number;
    isCustomIncome:boolean
}

export default function CustomIncomeExpenseDetails({
    incomeItems,
    expenseItems,
    customItemsSum,
    isCustomIncome
}:RecordCustomIncomeExpenseDetailsTypes) {

    const amount = priceWithComma(customItemsSum)

    return(
        <View  style={{margin:16}}>
                <View style={RecordStyles.TypeWrapper}>
                    <Text style={RecordStyles.TypeText}>{isCustomIncome? 'Custom Income' : 'Custom Expense'}</Text>
                    <View style={RecordStyles.TypeItemsWrapper}>                    
                    {
                        isCustomIncome?
                            incomeItems ?
                                incomeItems.length !== 0 ?
                                incomeItems.map((items) => (
                                    <CustomTypeItem key={items.customTypeId} item={items} />
                                ))
                                :
                                <Text style={CommonStyles.NoActionText}>No Records</Text>
                            :
                            <ActivityIndicator size={'small'} color={colors.light.primary}/>
                        :
                            expenseItems ?
                                expenseItems.length !== 0 ?
                                expenseItems.map((items) => (
                                    <CustomTypeItem key={items.customTypeId} item={items} />
                                ))
                                :
                                <Text style={CommonStyles.NoActionText}>No Records</Text>
                            :
                            <ActivityIndicator size={'small'} color={colors.light.primary}/>
                    }
                    </View>
                </View>
                    
                <View style={RecordStyles.RecordedTypeWrapper}>
                    <Text style={RecordStyles.RecordedTypeText}>Recorded {isCustomIncome? 'Income' : 'Expenses'}</Text>
                    <Text style={RecordStyles.RecordedTypeText}>{ `${amount.currency}. ${amount.value}.${amount.decimal}` }</Text>
                </View>

                <Text style={RecordStyles.InfoText}>Balance is transferred to {isCustomIncome? 'Income' : 'Expenses'}</Text>
        </View>
    )
}