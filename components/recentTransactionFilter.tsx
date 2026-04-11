import RecentTransactionSectionStyles from "@/styles/recentTransactionSectionStyles";
import { Pressable, Text } from "react-native";

interface FilterType {
    name: string;
    isActive: boolean;
    onPress: () => void;
}

export default function RecentTransactionFilter({ name, isActive, onPress }:FilterType) {
    return (
        <Pressable style={[RecentTransactionSectionStyles.RecentTransactionFilter, isActive? RecentTransactionSectionStyles.RecentTransactionFilterActive : null]} 
            onPress={onPress}>
            <Text style={[RecentTransactionSectionStyles.RecentTransactionFilterText, isActive? RecentTransactionSectionStyles.RecentTransactionFilterTextActive : null]}>
                {name}
            </Text>
        </Pressable>
    )
}