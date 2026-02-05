import SettingsHeader from '@/components/settingsHeader';
import SettingsItem from '@/components/settingsItem';
import UserHero from '@/components/userHero';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Octicons from '@expo/vector-icons/Octicons';

export default function Home(){

    return (
        <SafeAreaView style={{backgroundColor:'#ffffff'}} edges={['top', 'left', 'right']}>
            <ScrollView 
                showsVerticalScrollIndicator={false}
            >
             
             <UserHero />

            <SettingsHeader header='Accounts' />
            <SettingsItem 
                itemIcon={<MaterialCommunityIcons name="wallet-outline" size={24} color="black" />} 
                itemName="Fund Accounts" />
            <SettingsItem 
                itemIcon={<Octicons name="credit-card" size={24} color="black" />} 
                itemName="Credit Accounts" />

            <SettingsHeader header='Income' />
            <SettingsItem 
                itemIcon={<MaterialCommunityIcons name="cash" size={24} color="black" />} 
                itemName="Income Categories" />
            <SettingsItem 
                itemIcon={<MaterialCommunityIcons name="cash-clock" size={24} color="black" />} 
                itemName="Fixed Income" />

            <SettingsHeader header='Expenses' />
            <SettingsItem 
                itemIcon={<MaterialCommunityIcons name="receipt-text-outline" size={24} color="black" />} 
                itemName="Expense Categories" />
            <SettingsItem 
                itemIcon={<MaterialCommunityIcons name="receipt-text-clock-outline" size={24} color="black" />} 
                itemName="Fixed Expenses" />

            <SettingsHeader header='General' />
            <SettingsItem 
                itemIcon={<MaterialCommunityIcons name="theme-light-dark" size={24} color="black" />} 
                itemName="Theme | light" />
            <SettingsItem 
                itemIcon={<MaterialIcons name="currency-exchange" size={24} color="black" />} 
                itemName="Currency" />

            </ScrollView>
        </SafeAreaView>
    )
}