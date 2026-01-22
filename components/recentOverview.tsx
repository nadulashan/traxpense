import AccountsSection from '@/styles/accountsSectionStyles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Text, View } from 'react-native';


interface Recent {
    type:string,
    amount:string,
    category:string
}

export default function RecentOverview({type, amount, category}:Recent){
    return(
        <View style={AccountsSection.AccountCardRecentCard}>
            <View style={AccountsSection.AccountCardRecentTop}>
                <MaterialIcons name="keyboard-double-arrow-up" size={16} color="white" />
                <Text style={AccountsSection.AccountCardRecentTopText}>{category}</Text>
            </View>
            <Text style={AccountsSection.AccountCardRecentBottomText}>{amount}</Text>
        </View>
    )
}