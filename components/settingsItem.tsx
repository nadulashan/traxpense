import SettingsItemStyles from '@/styles/settingsItemStyles';
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { Pressable, Text, View } from 'react-native';

interface SettingsItemTypes {
    itemName:string,
    itemIcon:React.ReactNode,
    navigateTo:string
}

export default function SettingsItem({ itemName, itemIcon, navigateTo }:SettingsItemTypes){

    const navigation = useNavigation<any>()

    if (itemName == 'Theme | light' || itemName == "Theme | dark"){
        return(
            <Pressable 
                style={SettingsItemStyles.itemContainer} >

                <View style={SettingsItemStyles.iconitemNameContainer}>
                    {itemIcon}
                    <Text style={SettingsItemStyles.itemName}>{ itemName }</Text>
                </View>

            </Pressable>
        )
    } else {
        return(
            <Pressable 
                style={SettingsItemStyles.itemContainer}
                onPress={() => navigation.navigate(navigateTo, {screen:itemName})}
                >

                <View style={SettingsItemStyles.iconitemNameContainer}>
                    {itemIcon}
                    <Text style={SettingsItemStyles.itemName}>{ itemName }</Text>
                </View>

                <Entypo name="chevron-right" size={24} color="black" />

            </Pressable>
        )
    }
}
