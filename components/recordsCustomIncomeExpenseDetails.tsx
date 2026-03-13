import colors from '@/constants/colors';
import { priceWithComma } from '@/func/general';
import CommonStyles from '@/styles/commonStyles';
import RecordStyles from '@/styles/recordsStyles';
import { CustomExpenseTypes, CustomIncomeTypes } from '@/types/recordsTypeItemType.schema';
import Entypo from '@expo/vector-icons/Entypo';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import CustomTypeItem from './recordsDetailsCustomTypeItem';


interface RecordCustomIncomeExpenseDetailsTypes{
    displayDate:string;
    incomeItems:CustomIncomeTypes[] |  null;
    expenseItems:CustomExpenseTypes[] | null;
    customItemsSum:number;
    switchCustom:( type:'income' | 'expense') => void;
    goPrevScreen:() => void;
    isCustomIncome:boolean
}

export default function RecordsCustomIncomeExpenseDetails({
    displayDate,
    incomeItems,
    expenseItems,
    customItemsSum,
    switchCustom,
    goPrevScreen,
    isCustomIncome
}:RecordCustomIncomeExpenseDetailsTypes) {
    return(
        <View  style={RecordStyles.RecordDetailsWrapper}>
                <Pressable
                    onPress={goPrevScreen}
                    style={{flexDirection:'row', gap:16, alignItems:'center'}}>
                <Entypo name="chevron-left" size={36} color="black" /> 
                <Text style={RecordStyles.DateText}>
                    {displayDate}
                </Text>
                </Pressable>
                <View style={RecordStyles.TypeWrapper}>
                    <Text style={RecordStyles.TypeText}>{isCustomIncome? 'Custom Income' : 'Custom Expense'}</Text>
                    <View style={RecordStyles.TypeItemsWrapper}>                    
                    {
                        isCustomIncome?
                            incomeItems ?
                                incomeItems.length !== 0 ?
                                incomeItems.map((items) => (
                                    <CustomTypeItem key={items.customIncomeId} item={items} />
                                ))
                                :
                                <Text style={CommonStyles.NoActionText}>No Records</Text>
                            :
                            <ActivityIndicator size={'small'} color={colors.light.primary}/>
                        :
                            expenseItems ?
                                expenseItems.length !== 0 ?
                                expenseItems.map((items) => (
                                    <CustomTypeItem key={items.customExpenseId} item={items} />
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
                    <Text style={RecordStyles.RecordedTypeText}>{priceWithComma(customItemsSum)}</Text>
                </View>

                <Text style={RecordStyles.InfoText}>Balance is transferred to {isCustomIncome? 'Income' : 'Expenses'}</Text>
        </View>
    )
}