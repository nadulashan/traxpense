import colors from '@/constants/colors';
import CommonStyles from '@/styles/commonStyles';
import RecordStyles from '@/styles/recordsStyles';
import { ActiveAccountsProps } from '@/types/recordsTypeItemType.schema';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import AccountItem from './recordFormAccountItem';

interface MultiSelectProps{
    available: boolean;
    primaryButtonFunction: () => void;
    secondaryButtonFunction: () => void;
}

interface CategoryWrapperTypes {
    accounts: ActiveAccountsProps[] | null;
    onAccountPress:(account: ActiveAccountsProps) => void ;
    multiSelect: MultiSelectProps | undefined;
}

export default function FormAccountWrapper({
    accounts,
    onAccountPress,
    multiSelect
}: CategoryWrapperTypes) {

    let multiSelectAvailable: boolean;
    if ( multiSelect ) {
        multiSelectAvailable = true
    } else {
        multiSelectAvailable = false
    } 

    return (
        <View style={RecordStyles.CategoryElementWrapper}>
        {
            accounts?
            
                accounts.length !== 0 ?
                accounts.map((item) => (
                    <AccountItem key={item.accountId} name={item.accountName} badge={item.accountBadge} onAccountPress={onAccountPress} account={item} multiSelect={multiSelectAvailable}/>
                ))
                :
                <Text style={CommonStyles.NoActionText}>Looks like there aren't active acounts you are looking for</Text>
            :
            <ActivityIndicator size={'small'} color={colors.light.primary} />
        }
        {
            multiSelect?
            <View style={[ CommonStyles.BottomSheetButtonWrapper, {marginTop:16} ]}>
                <Pressable 
                    onPress={multiSelect.secondaryButtonFunction}
                    style={[ CommonStyles.BottomSheetButton, CommonStyles.BottomSheetSecondaryButton ]}>
                    <Text style={CommonStyles.BottomSheetButtonText}>Close</Text>
                </Pressable>
                <Pressable 
                    onPress={multiSelect.primaryButtonFunction}
                    style={[ CommonStyles.BottomSheetButton, CommonStyles.BottomSheetPrimaryButton ]}>
                    <Text style={CommonStyles.BottomSheetButtonText}>Filter</Text>
                </Pressable>
            </View>
            :
            null
        }
        </View>
    )
}