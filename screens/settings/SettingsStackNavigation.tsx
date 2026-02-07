import { createStackNavigator } from "@react-navigation/stack";

import fonts from "@/constants/fonts";
import Entypo from '@expo/vector-icons/Entypo';
import FundCreditAccounts from "./FundCreditAccounts";
import IncomeExpenseCategory from "./IncomeExpenseCategory";
import Recurring from "./Recurring";
import Settings from "./Settings";
import Currency from "./currency";

export type SettingsStackParamList = {
    Settings:undefined,
    FundCreditAccounts: { screen:string },
    Recurring: { screen:string },
    IncomeExpenseCategory: { screen:string },
    Currency: { screen:string },
}

export default function TabNavigation(){

    const Stack = createStackNavigator<SettingsStackParamList>();

    return (
        <Stack.Navigator 
            initialRouteName="Settings" 
            screenOptions={{
                animation:'slide_from_right',
                headerShadowVisible:false,
                headerTitleStyle:{
                    fontFamily:fonts.semiBold,
                    lineHeight:24
                },
                headerBackImage: ({tintColor}) => <Entypo name="chevron-left" size={24} color={tintColor} />
            }}
            >
            <Stack.Screen name="Settings" component={Settings} options={{headerShown:false}}/>
            <Stack.Screen name="FundCreditAccounts" component={FundCreditAccounts} />
            <Stack.Screen name="Recurring" component={Recurring} />
            <Stack.Screen name="IncomeExpenseCategory" component={IncomeExpenseCategory} />
            <Stack.Screen name="Currency" component={Currency} />
        </Stack.Navigator>
    )
}