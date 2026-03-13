import { createStackNavigator } from "@react-navigation/stack";

import fonts from "@/constants/fonts";
import Entypo from '@expo/vector-icons/Entypo';
import Calendar from "./Calendar";
import CreateCustom from "./CreateCustom";
import Records from "./Records";

export default function RecordsStackNavigation(){
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator 
            initialRouteName="Records"  
            screenOptions={{
                animation:'slide_from_right', 
                headerShadowVisible:false,
                headerShown:false,
                headerTitleStyle:{
                    fontFamily:fonts.semiBold,
                    lineHeight:24
                },
            }}
            >
            <Stack.Screen name="Records" component={Records} />
            <Stack.Screen name="Calendar" component={Calendar} />
            <Stack.Screen name="CreateCustom" component={CreateCustom} options={{
                headerShown:true,
                headerBackImage:({tintColor}) => <Entypo name="chevron-left" size={24} color={tintColor} />
            }} />
        </Stack.Navigator>
    )
}