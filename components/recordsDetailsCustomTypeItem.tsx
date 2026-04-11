import { priceWithComma } from '@/func/general';
import RecordStyles from '@/styles/recordsStyles';
import { CustomTypeProps } from '@/types/recordsTypeItemType.schema';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Text, View } from 'react-native';

interface TypeItemTypes{
    item:CustomTypeProps;
}

export default function CustomTypeItem({
    item
}:TypeItemTypes){

    const amount = priceWithComma(item.amount)

    return (
        <View style={RecordStyles.TypeItem}>
            <View style={RecordStyles.TypeItemBadgeName}>
                <View style={[RecordStyles.TypeItemBadge, {backgroundColor:item.accountBadge}]}></View>
                <Text style={RecordStyles.TypeItemText}>{ item.name }</Text>
                { item.comment? <EvilIcons name="comment" size={14} color="black" /> : null}
            </View>
            <Text style={RecordStyles.TypeItemText}>{ `${amount.currency}. ${amount.value}.${amount.decimal}` }</Text>
        </View>
    )
}