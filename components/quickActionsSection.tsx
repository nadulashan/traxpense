import colors from '@/constants/colors';
import QuickActionsSectionStyles from '../styles/quickActionsSectionStyles';
import SectionHeader from "./Header";
import QuickAction from "./quickAction";

import { View } from 'react-native';

import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function QuickActionsSection(){

    const iconSize = 24;
    const iconColor = colors.light.primary

    return (
        <>
            <SectionHeader header="Quick Actions" />
            <View style={QuickActionsSectionStyles.QuickActionsWrapper}>
                <QuickAction icon={<Entypo name="plus" size={iconSize} color={iconColor} />} name="Add Record" />
                <QuickAction icon={<Ionicons name="wallet-outline" size={iconSize} color={iconColor} />} name="Accounts" />
                <QuickAction icon={<FontAwesome5 name="money-bill-alt" size={iconSize} color={iconColor} />} name="Category" />
                <QuickAction icon={<Feather name="calendar" size={iconSize} color={iconColor} />} name="Calendar" />
            </View>
        </>
    )
}