import { createStackNavigator } from "@react-navigation/stack";

import Home from './Home';
import Notification from "./Notification";

export default function HomeStackNavigation(){
    const Stack = createStackNavigator();

    return(
        <Stack.Navigator 
            initialRouteName="Home"             
            screenOptions={{
                headerShown:false
            }}
            >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Notification" component={Notification} />
        </Stack.Navigator>
    )

}