import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { handleInitialLaunch } from './db/appConfig/initialDate';
import { initDB } from './db/create';
import TabNavigation from './screens/TabNavigation';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);

    const [fontsLoaded] = useFonts({
        'Poppins-Light': require('./media/fonts/Poppins-Light.ttf'),
        'Poppins-Regular': require('./media/fonts/Poppins-Regular.ttf'),
        'Poppins-SemiBold': require('./media/fonts/Poppins-SemiBold.ttf'),
        'Poppins-Medium': require('./media/fonts/Poppins-Medium.ttf'),
    });

    useEffect(() => {
        async function prepare() {
            try {
                // 1. & 2. Run DB Init and First Launch check
                // We wrap these in a promise to ensure they complete
                await initDB();
                await handleInitialLaunch();
                
                // Add any future logic here (Tasks 4 & 5)
                
            } catch (e) {
                console.warn("Initialization Error:", e);
            } finally {
                // Once everything (except maybe fonts) is done
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    // This function is triggered when the root view finishes its first layout
    const onLayoutRootView = useCallback(async () => {
        if (appIsReady && fontsLoaded) {
            // Hide the splash screen immediately
            await SplashScreen.hideAsync();
        }
    }, [appIsReady, fontsLoaded]);

    // Don't render the actual app until both the logic is ready AND fonts are loaded
    if (!appIsReady || !fontsLoaded) {
        return null;
    }

    return (
        <GestureHandlerRootView 
            style={{ flex: 1, backgroundColor: 'grey' }} 
            onLayout={onLayoutRootView}
        >
            <StatusBar />
            <NavigationContainer>
                <TabNavigation />
            </NavigationContainer>
        </GestureHandlerRootView>
    );
}