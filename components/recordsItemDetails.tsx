import { priceWithComma } from '@/func/general';
import RecordStyles from '@/styles/recordsStyles';
import { ExpenseTypes, IncomeTypes } from '@/types/recordsTypeItemType.schema';
import { Pressable, Text, View } from 'react-native';

interface ItemDetailsTypes {
    item: IncomeTypes | ExpenseTypes | undefined;
}

export default function ItemDetails({
    item
}:ItemDetailsTypes) {

    // Setup date time for display
    const dateTime = item?.createdDateTime.split('.')[0].split('T')
    const displayDateTime = dateTime?.join(' @ ')

    return (
        <View style={RecordStyles.DetailsWrapper}>
            {
                item?
                <>
                    <View style={RecordStyles.DetailsHeaderWrapper}>
                        <View style={RecordStyles.DetailsHeaderItem}>
                            <Text style={RecordStyles.DetailsHeaderMediumText}>{item.name}</Text>
                            <Text style={RecordStyles.DetailsHeaderLightText}>{displayDateTime}</Text>
                        </View>
                        <View style={RecordStyles.DetailsHeaderItem}>
                            <Text style={[RecordStyles.DetailsHeaderMediumText, RecordStyles.TextAlignLeft]}>{priceWithComma(item.amount)}</Text>
                            <View style={RecordStyles.DetailsAccountWrapper}>
                                <View style={[RecordStyles.TransferItemBadge, {backgroundColor:item.accountBadge}]}></View>
                                <Text style={[RecordStyles.DetailsHeaderLightText, RecordStyles.TextAlignLeft]}>{item.accountName}</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text>{item.comment}</Text>
                    </View>
                    <View>
                        <Pressable><Text>Close</Text></Pressable>
                        <Pressable><Text>Edit</Text></Pressable>
                    </View>
                </>
                :
                <Text>Something went wrong.</Text>
            }
        </View>
    )
}