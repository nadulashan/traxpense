import { useCheckContext } from "@/context/recordsContext";
import { priceWithComma } from "@/func/general";
import RecordStyles from "@/styles/recordsStyles";
import { TransferTypes } from "@/types/recordsTypeItemType.schema";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, Text, View } from "react-native";

interface TransferItemTypes{
    item:TransferTypes;
}

export default function TransferItem({
    item
}:TransferItemTypes) {

    const { switchTransferDetails } = useCheckContext()
    const amount = priceWithComma(item.amount)

    return (
        <Pressable
            onPress={() => switchTransferDetails(item)}
            style={RecordStyles.TransferItemWrapper}>
            <View style={RecordStyles.TransferItemBankNames}>
                <View style={RecordStyles.TransferRowGap}>
                    <View style={[RecordStyles.TransferItemBadge, {backgroundColor:item.from_account_badge}]}></View>
                    <Text style={RecordStyles.TransferItemText}>{item.from_account_name}</Text>
                </View>
                <View style={RecordStyles.TransferItemArrowBank}>
                    <Ionicons name="return-down-forward" size={14} color="black" />
                    <View style={RecordStyles.TransferRowGap}>
                        <View style={[RecordStyles.TransferItemBadge, {backgroundColor:item.to_account_badge}]}></View>
                        <Text style={RecordStyles.TransferItemText}>{item.to_account_name}</Text>
                    </View>
                </View>
            </View>
            <Text style={RecordStyles.TypeItemText}>{ `${amount.value}.${amount.decimal}` }</Text>
        </Pressable>
    )
}