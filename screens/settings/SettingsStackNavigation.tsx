import { createStackNavigator } from "@react-navigation/stack";

import CreditCards from "./CreditCards";
import ExpenseCategory from "./ExpenseCategory";
import FundAccounts from "./FundAccounts";
import Settings from "./Settings";
import Subscriptions from "./Subscriptions";

export default function TabNavigation(){

    const Stack = createStackNavigator();

    return (
        <Stack.Navigator 
            initialRouteName="Settings"             
            screenOptions={{
                headerShown:false
            }}
            >
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="FundAccounts" component={FundAccounts} />
            <Stack.Screen name="CreditCards" component={CreditCards} />
            <Stack.Screen name="Subscriptions" component={Subscriptions} />
            <Stack.Screen name="ExpenseCategory" component={ExpenseCategory} />
        </Stack.Navigator>
    )
}