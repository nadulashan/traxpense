import RecentTransactionSectionStyles from "@/styles/recentTransactionSectionStyles";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Text, View } from "react-native";

interface RecentTransactionProps {
    date: string;
    category: string;
    amount:string;
}

export default function RecentTransaction({ date, category, amount}: RecentTransactionProps){
    return (
        <View style={RecentTransactionSectionStyles.RecentTransactionWrapper}>
            <View style={RecentTransactionSectionStyles.RecentTransactionLeft}>
                <View style={RecentTransactionSectionStyles.RecentTransactionLeftIcon}>
                    <MaterialIcons name="keyboard-double-arrow-up" size={24} color="white" />
                </View>
                <View style={RecentTransactionSectionStyles.RecentTransactionLeftRight}>
                    <View style={RecentTransactionSectionStyles.RecentTransactionLeftRightNameBadge}>

                        <View style={RecentTransactionSectionStyles.RecentTransactionLeftRightBadge}></View>
                        <Text style={RecentTransactionSectionStyles.RecentTransactionLeftName}>{category}</Text>

                    </View>
                    <Text style={RecentTransactionSectionStyles.RecentTransactionLeftDate}>{date}</Text>
                </View>
            </View>
            <Text style={RecentTransactionSectionStyles.RecentTransactionRight}>{amount}</Text>
        </View>
    )
}