import { priceWithComma } from '@/func/general';
import RecordStyles from '@/styles/recordsStyles';
import { CustomExpenseTypes, CustomIncomeTypes } from '@/types/recordsTypeItemType.schema';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Pressable, Text, View } from 'react-native';

interface TypeItemTypes{
    item:CustomIncomeTypes | CustomExpenseTypes;
}

export default function CreateCustomCustomTypeItem({
    item
}:TypeItemTypes){

    return (
        <Pressable style={RecordStyles.TypeItem}>
            <View style={RecordStyles.TypeItemBadgeName}>
                <View style={[RecordStyles.TypeItemBadge, {backgroundColor:item.accountBadge}]}></View>
                <Text style={RecordStyles.TypeItemText}>{ item.name }</Text>
                { item.comment? <EvilIcons name="comment" size={14} color="black" /> : null}
            </View>
            <Text style={RecordStyles.TypeItemText}>{priceWithComma(item.amount)}</Text>
        </Pressable>
    )
}