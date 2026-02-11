import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { initDB } from './db/create';
import TabNavigation from './screens/TabNavigation';



export default function App(){

    const [fontsLoaded, error] = useFonts({
        'Poppins-Light': require('./media/fonts/Poppins-Light.ttf'),
        'Poppins-Regular': require('./media/fonts/Poppins-Regular.ttf'),
        'Poppins-SemiBold': require('./media/fonts/Poppins-SemiBold.ttf'),
        'Poppins-Medium': require('./media/fonts/Poppins-Medium.ttf'),
    });

    if (!fontsLoaded && !error) {
        return null;
    }

    initDB()

    return (
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'grey' }}>
            <StatusBar />
            <NavigationContainer>
                <TabNavigation />
            </NavigationContainer>
        </GestureHandlerRootView>
    )
}