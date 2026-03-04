import colors from '@/constants/colors';
import RecordStyles from '@/styles/recordsStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable } from 'react-native';

export default function CalenderButton() {
    return (
        <Pressable style={RecordStyles.CalendarButton}>
            <Ionicons name="calendar-outline" size={24} color={colors.light.white} />
        </Pressable>
    )
}