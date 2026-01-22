import RecentTransactionSectionStyles from "@/styles/recentTransactionSectionStyles";
import { Pressable, Text } from "react-native";

interface FilterType {
    name: string;
}

export default function RecentTransactionFilter({name}:FilterType) {
    return (
        <Pressable style={RecentTransactionSectionStyles.RecentTransactionFilter}>
            <Text style={RecentTransactionSectionStyles.RecentTransactionFilterText}>
                {name}
            </Text>
        </Pressable>
    )
}