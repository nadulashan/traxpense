import colors from '@/constants/colors';
import { priceWithComma } from '@/func/general';
import CommonStyles from '@/styles/commonStyles';
import RecordStyles from '@/styles/recordsStyles';
import { TransferTypes } from '@/types/recordsTypeItemType.schema';
import Fontisto from '@expo/vector-icons/Fontisto';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

interface ItemDetailsTypes {
    item: TransferTypes | undefined;
    onEditPress: () => void;
}

export default function TransferDetails({
    item, 
    onEditPress
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
                            <View style={{flexDirection:'row', gap:12, alignItems:'center'}}>
                                <Text style={RecordStyles.DetailsHeaderMediumText}>{item.from_account_name}</Text>
                                <Fontisto name="arrow-right-l" size={24} color="black" /> 
                                <Text style={RecordStyles.DetailsHeaderMediumText}>{item.to_account_name}</Text>
                            </View>
                            <Text style={RecordStyles.DetailsHeaderLightText}>{displayDateTime}</Text>
                        </View>
                        <View style={RecordStyles.DetailsHeaderItem}>
                            <Text style={RecordStyles.DetailsHeaderMediumText}>{priceWithComma(item.amount)}</Text>
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