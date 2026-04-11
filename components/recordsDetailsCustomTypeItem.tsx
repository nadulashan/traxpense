import { priceWithComma } from '@/func/general';
import RecordStyles from '@/styles/recordsStyles';
import { CustomTypeProps } from '@/types/recordsTypeItemType.schema';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Pressable, Text, View } from 'react-native';

interface TypeItemTypes{
    item:CustomTypeProps;
    onPress: (item: CustomTypeProps )  => void;
}

export default function CustomTypeItem({
    item,
    onPress
}:TypeItemTypes){

    const amount = priceWithComma(item.amount)

    return (
        <Pressable style={RecordStyles.TypeItem} onPress={() => onPress(item)}>
            <View style={RecordStyles.TypeItemBadgeName}>
                <View style={[RecordStyles.TypeItemBadge, {backgroundColor:item.accountBadge}]}></View>
                <Text style={RecordStyles.TypeItemText}>{ item.name }</Text>
                { item.comment?  <FontAwesome6 name="comment-alt" size={10} color="black" />  : null}
            </View>
            <Text style={RecordStyles.TypeItemText}>{ `${amount.currency}. ${amount.value}.${amount.decimal}` }</Text>
        </Pressable>
    )
}