import colors from "@/constants/colors";
import { priceWithComma } from "@/func/general";
import RecentTransactionSectionStyles from "@/styles/recentTransactionSectionStyles";
import { RecordsProps } from "@/types/homeProps";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';
import { Text, View } from "react-native";

interface RecentTransactionProps {
    transaction: RecordsProps;
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
                                <View style={[ 
                                    RecentTransactionSectionStyles.RecentTransactionLeftRightBadgeHalf, {  backgroundColor: transaction.primaryAccountBadge } ]}></View>
                                {
                                    transaction.secondaryAccountBadge?
                                        <View style={[ RecentTransactionSectionStyles.RecentTransactionLeftRightBadgeHalf, { backgroundColor: transaction.secondaryAccountBadge } ]}></View>
                                    :
                                    null
                                }
                            </View>
                            :
                            <View style={[ RecentTransactionSectionStyles.RecentTransactionLeftRightBadge, 
                                    transaction.primaryAccountBadge? {  backgroundColor: transaction.primaryAccountBadge } : { backgroundColor:'grey' }
                            ]}></View>
                        }
                        <Text style={RecentTransactionSectionStyles.RecentTransactionLeftName}>{ transaction.name? transaction.name : 'Custom' }</Text>

                        { transaction.isCustom? <Entypo name="chevron-right" size={14} color="black" /> : null}
                        { transaction.comment? <FontAwesome6 name="comment-alt" size={10} color="black" />  : null}

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