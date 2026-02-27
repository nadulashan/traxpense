import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Analysis from './analysis/Analysis';
import Home from './home/HomeStackNavigation';
import Records from './records/RecordsStackNavigation';
import Settings from './settings/SettingsStackNavigation';

import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Fontisto from '@expo/vector-icons/Fontisto';
import Octicons from '@expo/vector-icons/Octicons';

import colors from '../constants/colors';

export default function TabNavigation(){

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator 
            initialRouteName="SettingsStack" 
            screenOptions={{
                headerShown:false,
                tabBarShowLabel:false,
                tabBarInactiveTintColor:colors.light.accent,
                tabBarActiveTintColor:colors.light.primary,
                tabBarStyle: {height:80, paddingTop:12},                
                tabBarHideOnKeyboard:false
            }}
            >
            <Tab.Screen 
                name="HomeStack" 
                component={Home} 
                options={{
                    tabBarIcon: ({ focused, size, color }) => {
                       return focused ? <Octicons name="home-fill" size={size} color={color} /> : <Octicons name="home" size={size} color={color} />
                    }
                }}
                />
            <Tab.Screen 
                name="RecordsStack" 
                component={Records} 
                options={{
                    tabBarIcon: ({ focused, size, color }) => {
                        return focused? <Octicons name="list-unordered" size={size} color={color} /> : <Feather name="list" size={size} color={color} />
                    }
                }}
                />
            <Tab.Screen 
                name="AnalysisStack" 
                component={Analysis} 
                options={{
                    tabBarIcon: ({ focused, size, color}) => {
                        return focused ? <AntDesign name="pie-chart" size={size} color={color} /> : <Feather name="pie-chart" size={size} color={color} />
                    }
                }}
                />
            <Tab.Screen 
                name="SettingsStack" 
                component={Settings} 
                options={{
                    tabBarIcon: ({ focused, size,color }) => {
                        return focused? <Fontisto name="player-settings" size={size} color={color} /> : <Feather name="settings" size={size} color={color} />
                    }
                }}
                />
        </Tab.Navigator>
    )
}