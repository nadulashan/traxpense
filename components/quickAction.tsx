import { Pressable, Text, View } from 'react-native';
import QuickActionsSectionStyles from '../styles/quickActionsSectionStyles';

interface QuickActionProps {
    icon:React.ReactNode;
    name: string;
    // onPress: () => void;

}

export default function QuickAction({icon, name}:QuickActionProps){
    return(
        <View style={QuickActionsSectionStyles.QuickActionWrapper}>
            <Pressable style = {QuickActionsSectionStyles.QuickActionButton}>
                {icon}
            </Pressable>
            <Text style = {QuickActionsSectionStyles.QuickActionName}>{name}</Text>
        </View>
    )
}