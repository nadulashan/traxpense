import { priceWithComma } from '@/func/general';
import AccountsSection from '@/styles/accountsSectionStyles';
import { RecentAccountRecordsProps } from '@/types/homeProps';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Text, View } from 'react-native';


interface RecentItemProps {
    item: RecentAccountRecordsProps
    releventAccount: number;
}

export default function RecentOverview({item, releventAccount}:RecentItemProps){


    // secondary account is fetched to deal with transfers. income or expense is fetched as primaryAccountId and primaryAccountName. 
    // in transfers, primaryAccount{} will always be transferFrom{} which should be treated as expenses AND secondryAccount{} should be treated as incomes
    //  releventAccount ( acccount card which these records will display ) is used to identify whether this records is an income or expense. 
    // in transfers if primaryAccountId = relevent account - this is an expense
    let iconDirection: 'up' | 'down';
    let displyName: string | null;
    
    if ( item.type === 'income' || item.secondaryAccountId === releventAccount ) {
        iconDirection = 'down'
    } else {
        iconDirection = 'up'
    }

    if ( item.type === 'transfer' && item.primaryAccountId === releventAccount ){
        displyName = item.secondaryAccountName
    } else {
        displyName = item.primaryAccountName
    }

    const amount = priceWithComma(item.amount)

    return(
        <View style={AccountsSection.AccountCardRecentCard}>
            <View style={AccountsSection.AccountCardRecentTop}>
                <MaterialIcons name={ `keyboard-double-arrow-${iconDirection}` } size={16} color="white" />
                <Text style={AccountsSection.AccountCardRecentTopText}>{ displyName}</Text>
            </View>
            <Text style={AccountsSection.AccountCardRecentBottomText}>
                {amount.value}
                <Text style={AccountsSection.AccountCardRecentBottomTextDecimal}>.{amount.decimal}</Text>
            </Text>
        </View>
    )
}