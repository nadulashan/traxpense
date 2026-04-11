import { priceWithComma } from '@/func/general';
import RecordStyles from '@/styles/recordsStyles';
import { CustomTypeProps } from '@/types/recordsTypeItemType.schema';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Pressable, Text, View } from 'react-native';

interface TypeItemTypes{
    item:CustomTypeProps;
    onPress: ( item: CustomTypeProps ) => void;
}

export default function CreateCustomCustomTypeItem({
    item,
    onPress
}:TypeItemTypes){

    return (
        <Pressable onPress={ () => onPress(item) } style={RecordStyles.TypeItem}>
            <View style={RecordStyles.TypeItemBadgeName}>
                <View style={[RecordStyles.TypeItemBadge, {backgroundColor:item.accountBadge}]}></View>
                <Text style={RecordStyles.TypeItemText}>{ item.name }</Text>
                { item.comment? <EvilIcons name="comment" size={14} color="black" /> : null}
            </View>
            <Text style={RecordStyles.TypeItemText}>{priceWithComma(item.amount).value}</Text>
        </Pressable>
    )
}