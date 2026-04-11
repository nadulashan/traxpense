import colors from '@/constants/colors';
import { displayTimes, priceWithComma } from '@/func/general';
import CommonStyles from '@/styles/commonStyles';
import RecordStyles from '@/styles/recordsStyles';
import { PriceWithCommaProps, RecordsProps } from '@/types/homeProps';
import { TransferTypes } from '@/types/recordsTypeItemType.schema';
import Fontisto from '@expo/vector-icons/Fontisto';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import InfoText from './infoText';

interface ItemDetailsTypes {
    passedItem: TransferTypes | undefined;
    itemFromRecent: RecordsProps | undefined;
    onEditPress: ( () => void ) | undefined;
}

export default function TransferDetails({
    passedItem, 
    itemFromRecent,
    onEditPress
}:ItemDetailsTypes) {

    let item: TransferTypes;
    if ( itemFromRecent ) {
        item = {
            transferId:0,
            transferFrom:0,
            transferTo:0,
            comment:itemFromRecent.comment,
            amount:itemFromRecent.amount,
            createdDateTime:itemFromRecent.createdDateTime,
            date:itemFromRecent.date,
            from_account_name:itemFromRecent.primaryAccountName,
            from_account_badge:itemFromRecent.primaryAccountBadge,
            to_account_name:itemFromRecent.secondaryAccountName!,
            to_account_badge:itemFromRecent.secondaryAccountBadge!
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
                            <View style={{flexDirection:'row', gap:12, alignItems:'center'}}>
                                <Text style={RecordStyles.DetailsHeaderMediumText}>{item.from_account_name}</Text>
                                <Fontisto name="arrow-right-l" size={24} color="black" /> 
                                <Text style={RecordStyles.DetailsHeaderMediumText}>{item.to_account_name}</Text>
                            </View>
                            <Text style={RecordStyles.DetailsHeaderLightText}>{displayTimes(item.createdDateTime)}</Text>
                        </View>
                        <View style={RecordStyles.DetailsHeaderItem}>
                            <Text style={RecordStyles.DetailsHeaderMediumText}>{ `${amount.currency}. ${amount.value}.${amount.decimal}` }</Text>
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