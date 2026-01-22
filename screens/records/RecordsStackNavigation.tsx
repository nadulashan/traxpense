import { createStackNavigator } from "@react-navigation/stack";

import AddRecords from "./AddRecords";
import Calendar from "./Calendar";
import Records from "./Records";

export default function RecordsStackNavigation(){
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator 
            initialRouteName="Records"             
            screenOptions={{
                headerShown:false
            }}
            >
            <Stack.Screen name="Records" component={Records} />
            <Stack.Screen name="Calendar" component={Calendar} />
            <Stack.Screen name="AddRecords" component={AddRecords} />
        </Stack.Navigator>
    )
}