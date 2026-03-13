import { priceWithComma } from '@/func/general';
import RecordStyles from '@/styles/recordsStyles';
import { ExpenseTypes, IncomeTypes } from '@/types/recordsTypeItemType.schema';
import Entypo from '@expo/vector-icons/Entypo';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Pressable, Text, View } from 'react-native';

interface TypeItemTypes{
    item:IncomeTypes | ExpenseTypes;
}

export default function TypeItem({
    item
}:TypeItemTypes){
    return (
        <Pressable style={RecordStyles.TypeItem}>
            <View style={RecordStyles.TypeItemBadgeName}>
                <View style={[RecordStyles.TypeItemBadge, item.isCustom? {backgroundColor:'grey'} : {backgroundColor:item.accountBadge}]}></View>
                <Text style={RecordStyles.TypeItemText}>{item.isCustom? 'Custom' : item.name}</Text>
                { item.comment? <EvilIcons name="comment" size={14} color="black" /> : null}
                { item.isCustom? <Entypo name="chevron-right" size={14} color="black" /> : null}
            </View>
            <Text style={RecordStyles.TypeItemText}>{priceWithComma(item.amount)}</Text>
        </Pressable>
    )
}