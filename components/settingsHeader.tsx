import SettingsHeaderStyles from '@/styles/settingsHeaderStyles';
import { Text } from 'react-native';

interface HeaderType {
    header:string
}

export default function SettingsHeader({header}:HeaderType){
    return(
        <>
            <Text style={SettingsHeaderStyles.header}>{header}</Text>
        </>
    )
}