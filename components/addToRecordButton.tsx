import RecordStyles from '@/styles/recordsStyles';
import { Pressable, Text, View } from 'react-native';

type AddCategoryProps = {
    onPress: () => void;
    isActive:boolean
}

export default function AddToRecordButton({ onPress,isActive }: AddCategoryProps){
    console.log(isActive)
    return (        

        <View style={[RecordStyles.FloatingBottomStickButton, !isActive? RecordStyles.FloatingBottomStickButtonDisabled : null]}>
            <Pressable
                onPress={onPress}
                disabled={!isActive}
            >
                <Text style={RecordStyles.FloatingBottomStickButtonText}>Transfer Balance to Journal</Text>
            </Pressable>
        </View>
    )
}