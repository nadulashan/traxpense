import { useCheckContext } from '@/context/recordsContext';
import { priceWithComma } from '@/func/general';
import RecordStyles from '@/styles/recordsStyles';
import { ExpenseTypes, IncomeTypes } from '@/types/recordsTypeItemType.schema';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Pressable, Text, View } from 'react-native';

interface TypeItemTypes{
    item:IncomeTypes | ExpenseTypes;
    type:'income' | 'expense';
}

export default function TypeItem({
    item,
    type,
}:TypeItemTypes){

    const { switchItemDetail, switchCustom } = useCheckContext() 

    return (
        <Pressable 
            onPress={() => {
                item.isCustom? switchCustom(type) : switchItemDetail(item, type)
            }}
            style={RecordStyles.TypeItem}>
            <View style={RecordStyles.TypeItemBadgeName}>
                <View style={[RecordStyles.TypeItemBadge, item.isCustom? {backgroundColor:'grey'} : {backgroundColor:item.accountBadge}]}></View>
                <Text style={RecordStyles.TypeItemText}>{item.isCustom? 'Custom' : item.name}</Text>
                { item.comment? <FontAwesome6 name="comment-alt" size={10} color="black" />  : null}
                { item.isCustom? <Entypo name="chevron-right" size={14} color="black" /> : null}
            </View>
            <Text style={RecordStyles.TypeItemText}>{priceWithComma(item.amount)}</Text>
        </Pressable>
    )
}