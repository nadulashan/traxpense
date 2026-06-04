import SettingsItem from '@/components/settingsItem';
import UserHero from '@/components/userHero';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '@/components/Header';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Octicons from '@expo/vector-icons/Octicons';

export default function Home(){

    return (
        <SafeAreaView style={{backgroundColor:'#ffffff'}} edges={['top', 'left', 'right']}>
            <ScrollView showsVerticalScrollIndicator={false}>
             
             <UserHero />

            <Header header='Accounts' button={undefined} wrapperAvailable={false} />
            <SettingsItem 
                itemIcon={<MaterialCommunityIcons name="wallet-outline" size={24} color="black" />} 
                itemName="Fund Accounts" 
                navigateTo="FundCreditAccounts"
                />
            <SettingsItem 
                itemIcon={<Octicons name="credit-card" size={24} color="black" />} 
                itemName="Credit Accounts" 
                navigateTo='FundCreditAccounts'/>

            <Header header='Income' button={undefined} wrapperAvailable={false} />
            <SettingsItem 
                itemIcon={<MaterialCommunityIcons name="cash" size={24} color="black" />} 
                itemName="Income Categories"
                navigateTo='IncomeExpenseCategory' />
            <SettingsItem 
                itemIcon={<MaterialCommunityIcons name="cash-clock" size={24} color="black" />} 
                itemName="Recurring Income" 
                navigateTo='Recurring'/>

            <Header header='Expenses' button={undefined} wrapperAvailable={false} />
            <SettingsItem 
                itemIcon={<MaterialCommunityIcons name="receipt-text-outline" size={24} color="black" />} 
                itemName="Expense Categories" 
                navigateTo='IncomeExpenseCategory'/>
            <SettingsItem 
                itemIcon={<MaterialCommunityIcons name="receipt-text-clock-outline" size={24} color="black" />} 
                itemName="Recurring Expenses" 
                navigateTo='Recurring'/>

            <Header header='General' button={undefined} wrapperAvailable={false} />
            <SettingsItem 
                itemIcon={<MaterialCommunityIcons name="theme-light-dark" size={24} color="black" />} 
                itemName="Theme | light" 
                navigateTo='null'/>
            <SettingsItem 
                itemIcon={<MaterialIcons name="currency-exchange" size={24} color="black" />} 
                itemName="Currency"
                navigateTo='Currency' />
            </ScrollView>
        </SafeAreaView>
    )
}

