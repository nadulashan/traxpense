import colors from '@/constants/colors';
import { displayTimes, priceWithComma } from '@/func/general';
import CommonStyles from '@/styles/commonStyles';
import RecordStyles from '@/styles/recordsStyles';
import { PriceWithCommaProps } from '@/types/homeProps';
import { TypeProps } from '@/types/recordsTypeItemType.schema';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

interface ItemDetailsTypes {
    item: React.RefObject< TypeProps | undefined>;
    onEditPress: () => void;
}

export default function ItemDetails({
    item,
    onEditPress
}:ItemDetailsTypes) {

    let amount: PriceWithCommaProps;
    if ( item.current ) {
        amount = priceWithComma(item.current.amount)
    } else {
        amount = { currency: 'NON', value: '00', decimal: '00'}
    }

    return (
        <View style={RecordStyles.DetailsWrapper}>
            {
                item.current?
                <>
                    <View style={RecordStyles.DetailsHeaderWrapper}>
                        <View style={RecordStyles.DetailsHeaderItem}>
                            <Text style={RecordStyles.DetailsHeaderMediumText}>{item.current.name}</Text>
                            <Text style={RecordStyles.DetailsHeaderLightText}>{displayTimes(item.current?.createdDateTime)}</Text>
                        </View>
                        <View style={RecordStyles.DetailsHeaderItem}>
                            <Text style={RecordStyles.DetailsHeaderMediumText}>{ `${amount.currency}. ${amount.value}.${amount.decimal}` }</Text>
                            <View style={[RecordStyles.DetailsAccountWrapper, RecordStyles.DetailsPriceAccountWrapper]}>
                                <View style={[RecordStyles.TypeItemBadge, {backgroundColor:item.current.accountBadge}]}></View>
                                <Text style={RecordStyles.DetailsHeaderLightText}>{item.current.accountName}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={RecordStyles.DetailsComment}>
                        {
                            item.current.comment?
                            <Text style={RecordStyles.DetailsCommentText}>{ item.current.comment }</Text>
                            :
                            <Text style={[RecordStyles.DetailsCommentText, {color:'grey'}]}>No Comment</Text>
                        }
                    </View>
                    <View style={CommonStyles.BottomSheetButtonWrapper}>
                        <Pressable 
                            onPress={onEditPress}
                            style={[CommonStyles.BottomSheetButton, CommonStyles.BottomSheetPrimaryButton]}>
                            <Text style={CommonStyles.BottomSheetButtonText}>Edit</Text>
                        </Pressable>
                    </View>
                </>
                :
                <ActivityIndicator size={'small'} color={colors.light.primary} />
            }
        </View>
    )
}