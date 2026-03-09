import { useCheckContext } from '@/context/recordsContext';
import RecordStyles from '@/styles/recordsStyles';
import { Pressable, Text, View } from 'react-native';

export default function BottomSheetRecordCreationMenu() {

    const { navigateToAddItem, type } = useCheckContext()

    return (
        <View style={RecordStyles.MenuSheetWrapper}>
            <View style={RecordStyles.MenuAddItemWrapper}>
                <Pressable 
                    onPress={() => {
                        type.current = 'income'
                        navigateToAddItem()
                    }}
                    style={RecordStyles.MenuAddItem}><Text style={RecordStyles.MenuText}>Add an Income</Text></Pressable>
                <Pressable 
                    style={RecordStyles.MenuAddItem}
                    onPress={() => {
                        type.current = 'expense'
                        navigateToAddItem()
                    }}    
                ><Text style={RecordStyles.MenuText}>Add an Expense</Text></Pressable>
            </View>
            <Pressable style={RecordStyles.MenuCreateJournal}><Text style={[RecordStyles.MenuText, RecordStyles.MenuJournalText]}>Create a Journal</Text></Pressable>
        </View>
    )
}