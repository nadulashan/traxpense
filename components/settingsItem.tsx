import SettingsItemStyles from '@/styles/settingsItemStyles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, Text, View } from 'react-native';

interface SettingsItemTypes {
    itemName:string,
    itemIcon:React.ReactNode
}

export default function SettingsItem({ itemName, itemIcon }:SettingsItemTypes){
    return(
        <Pressable style={SettingsItemStyles.itemContainer}>
            <View style={SettingsItemStyles.iconitemNameContainer}>
                {itemIcon}
                <Text>{ itemName }</Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
        </Pressable>
    )
}
