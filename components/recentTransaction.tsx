import colors from "@/constants/colors";
import { priceWithComma } from "@/func/general";
import RecentTransactionSectionStyles from "@/styles/recentTransactionSectionStyles";
import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';
import { Text, View } from "react-native";

interface RecentTransactionProps {
    transaction: any;
}

export default function RecentTransaction({ transaction }: RecentTransactionProps){

    const amount = priceWithComma(transaction.amount)

    return (
        <View style={RecentTransactionSectionStyles.RecentTransactionWrapper}>
            <View style={RecentTransactionSectionStyles.RecentTransactionLeft}>
                <View style={[ RecentTransactionSectionStyles.RecentTransactionLeftIcon, 
                    transaction.type === 'income'? { backgroundColor: colors.light.incomeBackground } 
                    : transaction.type === 'expense'? { backgroundColor: colors.light.expenseBackground }
                    : { backgroundColor: colors.light.primaryLight } ]}>

                    {
                    transaction.type === 'income'?  <Ionicons name="arrow-down-outline" size={24} color={colors.light.incomeForeground} />
                    : transaction.type === 'expense'?   <Ionicons name="arrow-up-outline" size={24} color={colors.light.expenseForeground} />
                    : <View style={{ transform: [ {rotate:'90deg'}] }}><Octicons name="arrow-switch" size={24} color={colors.light.primary}/></View>
                    }
                </View>
                <View style={RecentTransactionSectionStyles.RecentTransactionLeftRight}>
                    <View style={RecentTransactionSectionStyles.RecentTransactionLeftRightNameBadge}>
                        {
                            transaction.type === 'transfer'?
                            <View style={RecentTransactionSectionStyles.RecentTransactionLeftRightBadge}>
                                <View style={[ RecentTransactionSectionStyles.RecentTransactionLeftRightBadgeHalf, { backgroundColor: transaction.primaryAccountBadge } ]}></View>
                                <View style={[ RecentTransactionSectionStyles.RecentTransactionLeftRightBadgeHalf, { backgroundColor: transaction.secondaryAccountBadge } ]}></View>
                            </View>
                            :
                            <View style={[ RecentTransactionSectionStyles.RecentTransactionLeftRightBadge, { backgroundColor: transaction.primaryAccountBadge } ]}></View>
                        }
                        <Text style={RecentTransactionSectionStyles.RecentTransactionLeftName}>{ transaction.name }</Text>

                    </View>
                    <Text style={RecentTransactionSectionStyles.RecentTransactionLeftDate}>{ transaction.date }</Text>
                </View>
            </View>
            <Text style={[ RecentTransactionSectionStyles.RecentTransactionRight,
                    transaction.type === 'income'? { color: colors.light.incomeForeground } 
                    : transaction.type === 'expense'? { color: colors.light.expenseForeground }
                    : { color: colors.light.primary } ]}> { amount.value }
                        <Text style={ RecentTransactionSectionStyles.RecentTransactionRightDeciaml}>.{amount.decimal}</Text>
            </Text>
        </View>  
    )
}