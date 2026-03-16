import { useCheckContext } from '@/context/recordsContext';
import RecordStyles from '@/styles/recordsStyles';
import { useNavigation } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

interface CreationMenuTypes{
    navigateToAddItem: () => void;
    navigateToTransfer: () => void;
    type: React.RefObject<"income" | "expense" | null>;
}

export default function BottomSheetRecordCreationMenu({
    navigateToAddItem,
    type,
    navigateToTransfer
}:CreationMenuTypes) {

    const { focusedDate } = useCheckContext()
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
                style={RecordStyles.MenuAddItem}
                onPress={() => {
                    type.current = null
                    navigateToTransfer()
                }}    
            ><Text style={RecordStyles.MenuText}>Transfer</Text></Pressable>
            <Pressable 
                onPress={() => navigation.navigate("CreateCustom", {
                    focusedDate:focusedDate
                })}
                style={RecordStyles.MenuCreateJournal}><Text style={[RecordStyles.MenuText, RecordStyles.MenuJournalText]}>Create Custom</Text></Pressable>
        </View>
    )
}