import { useCheckContext } from '@/context/recordsContext';
import RecordStyles from '@/styles/recordsStyles';
import { useNavigation } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function BottomSheetRecordCreationMenu() {

    const { navigateToAddItem, type, focusedDate } = useCheckContext()
    const navigation = useNavigation<any>()

    return (
        <View style={RecordStyles.MenuSheetWrapper}>
            <Pressable 
                onPress={() => {
                    type.current = 'income'
                    navigateToAddItem()
                }}
                style={RecordStyles.MenuAddItem}><Text style={RecordStyles.MenuText}>Add Income</Text></Pressable>
            <Pressable 
                style={RecordStyles.MenuAddItem}
                onPress={() => {
                    type.current = 'expense'
                    navigateToAddItem()
                }}    
            ><Text style={RecordStyles.MenuText}>Add Expense</Text></Pressable>
            <Pressable 
                onPress={() => navigation.navigate("AddRecords", {
                    focusedDate:focusedDate
                })}
                style={RecordStyles.MenuCreateJournal}><Text style={[RecordStyles.MenuText, RecordStyles.MenuJournalText]}>Create Custom</Text></Pressable>
        </View>
    )
}