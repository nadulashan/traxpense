import colors from '@/constants/colors';
import NotificationStyles from '@/styles/notificationStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Text, View } from 'react-native';

type NotificationProps ={ 
    message:string;
    type:'success' | 'error' | 'info'
}

export default function Notification({ message, type}:NotificationProps ){

    const iconColor = colors.light.white;
    let icon
    switch (type) {
        case 'success':
            icon = <MaterialIcons name="done" size={24} color={iconColor} />
            break;
        case 'error':
            icon = <MaterialCommunityIcons name="cancel" size={24} color={iconColor} />
            break;
        case 'info':
            icon = <Ionicons name="information" size={24} color={iconColor}  />
            break;
        default:
            break;
    }

    return(
        <View style={[NotificationStyles.NotifcationWrapper, NotificationStyles[type]]}>
            {icon}
            <Text style={NotificationStyles.NotificationText}>  |  {message}</Text>
        </View>
    )
}