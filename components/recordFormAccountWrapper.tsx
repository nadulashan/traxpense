import colors from '@/constants/colors';
import CommonStyles from '@/styles/commonStyles';
import RecordStyles from '@/styles/recordsStyles';
import { ActiveAccountsProps } from '@/types/recordsTypeItemType.schema';
import { ActivityIndicator, Text, View } from 'react-native';
import AccountItem from './recordFormAccountItem';

interface MultiSelectProps{
    available: boolean;
    primaryButtonFunction: ( accIds: number[] ) => void;
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
        </View>
    )
}