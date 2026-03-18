import { priceWithComma } from '@/func/general';
import CommonStyles from '@/styles/commonStyles';
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
                            <Text style={RecordStyles.DetailsHeaderMediumText}>{priceWithComma(item.amount)}</Text>
                            <View style={[RecordStyles.DetailsAccountWrapper, RecordStyles.DetailsPriceAccountWrapper]}>
                                <View style={[RecordStyles.TypeItemBadge, {backgroundColor:item.accountBadge}]}></View>
                                <Text style={RecordStyles.DetailsHeaderLightText}>{item.accountName}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={RecordStyles.DetailsComment}>
                        {
                            item.comment?
                            <Text style={RecordStyles.DetailsCommentText}>{ item.comment }</Text>
                            :
                            <Text style={[RecordStyles.DetailsCommentText, {color:'grey'}]}>No Comment</Text>
                        }
                    </View>
                    <View style={CommonStyles.BottomSheetButtonWrapper}>
                        <Pressable style={[CommonStyles.BottomSheetButton, CommonStyles.BottomSheetPrimaryButton]}>
                            <Text style={CommonStyles.BottomSheetButtonText}>Edit</Text>
                        </Pressable>
                    </View>
                </>
                :
                <Text>Something went wrong.</Text>
            }
        </View>
    )
}