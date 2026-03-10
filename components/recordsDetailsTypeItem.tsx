import { priceWithComma } from '@/func/general';
import RecordStyles from '@/styles/recordsStyles';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Pressable, Text, View } from 'react-native';

interface TypeItemTypes{
    item:{ accountName:string, accountBadge:string, name:string, comment:string | null, amount:number, time:string, date:string };
}

export default function TypeItem({
    item
}:TypeItemTypes){
    return (
        <Pressable style={RecordStyles.TypeItem}>
            <View style={RecordStyles.TypeItemBadgeName}>
                <View style={[RecordStyles.TypeItemBadge, {backgroundColor:item.accountBadge}]}></View>
                <Text style={RecordStyles.TypeItemText}>{item.name}</Text>
                { item.comment? <EvilIcons name="comment" size={14} color="black" /> : null}
            </View>
            <Text style={RecordStyles.TypeItemText}>{priceWithComma(item.amount)}</Text>
        </Pressable>
    )
}