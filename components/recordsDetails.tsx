import { useCheckContext } from '@/context/recordsContext';
import { ScrollView, Text, View } from 'react-native';


export default function RecordsDetails() {

    const { focusedDate } = useCheckContext()
    const date = new Date(focusedDate)
    const options: Intl.DateTimeFormatOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: '2-digit' 
    };


    const displayDate = date.toLocaleDateString('en-US', options)

    return(
        <ScrollView>
            <View>
                <Text>
                    {displayDate}
                </Text>
            </View>
        </ScrollView>
    )
}