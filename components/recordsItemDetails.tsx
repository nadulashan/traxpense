import colors from '@/constants/colors';
import { displayTimes, priceWithComma } from '@/func/general';
import CommonStyles from '@/styles/commonStyles';
import RecordStyles from '@/styles/recordsStyles';
import { PriceWithCommaProps, RecordsProps } from '@/types/homeProps';
import { TypeProps } from '@/types/recordsTypeItemType.schema';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import InfoText from './infoText';

interface ItemDetailsTypes {
    passedItem: TypeProps | undefined;
    passedItemFromRecent: RecordsProps | undefined;
    onEditPress: ( () => void ) | undefined;
}

export default function ItemDetails({
    passedItem,
    passedItemFromRecent,
    onEditPress
}:ItemDetailsTypes) {


    let item: TypeProps;
    if ( passedItemFromRecent ) {
        item = {
            typeId:passedItemFromRecent.id, 
            accountName:passedItemFromRecent.primaryAccountName, 
            isCustom:passedItemFromRecent.isCustom!, 
            accountBadge:passedItemFromRecent.primaryAccountBadge, 
            name:passedItemFromRecent.name!, 
            badge:passedItemFromRecent.badge!,
            comment:passedItemFromRecent.comment, 
            amount:passedItemFromRecent.amount, 
            createdDateTime:passedItemFromRecent.createdDateTime, 
            date:passedItemFromRecent.date,
            categoryId:0,
            accountId:0
        }
    } else {
        item = passedItem!
    }
    
    let amount: PriceWithCommaProps;
    if ( item ) {
        amount = priceWithComma(item.amount)
    } else {
        amount = { currency: 'NON', value: '00', decimal: '00'}
    }

    return (
        <View style={RecordStyles.DetailsWrapper}>
            {
                item?
                <>
                    <View style={RecordStyles.DetailsHeaderWrapper}>
                        <View style={RecordStyles.DetailsHeaderItem}>
                            <Text style={RecordStyles.DetailsHeaderMediumText}>{item.name}</Text>
                            <Text style={RecordStyles.DetailsHeaderLightText}>{displayTimes(item.createdDateTime)}</Text>
                        </View>
                        <View style={RecordStyles.DetailsHeaderItem}>
                            <Text style={RecordStyles.DetailsHeaderMediumText}>{ `${amount.currency}. ${amount.value}.${amount.decimal}` }</Text>
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
                        {
                            onEditPress?
                            <Pressable 
                                onPress={onEditPress}
                                style={[CommonStyles.BottomSheetButton, CommonStyles.BottomSheetPrimaryButton]}>
                                <Text style={CommonStyles.BottomSheetButtonText}>Edit</Text>
                            </Pressable>
                            :
                            <InfoText text={`A Record from the Journal of ${item.date}`} />
                        }
                    </View>
                </>
                :
                <ActivityIndicator size={'small'} color={colors.light.primary} />
            }
        </View>
    )
}