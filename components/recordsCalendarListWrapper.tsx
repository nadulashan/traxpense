import RecordStyles from '@/styles/recordsStyles';
import { View } from 'react-native';
import CalenderButton from "./recordsCalenderButton";
import DateList from "./recordsDateList";

export default function CalendarListWrapper() {
    return (
        <View style={RecordStyles.ButtonListWrapper}>
            <CalenderButton />
            <DateList />
        </View>
    )
}