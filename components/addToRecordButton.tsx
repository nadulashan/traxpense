import colors from '@/constants/colors';
import RecordStyles from '@/styles/recordsStyles';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

type AddCategoryProps = {
    onPress: () => void;
    isActive:boolean
    creatingRelations:boolean;
}

export default function AddToRecordButton({ onPress,isActive, creatingRelations }: AddCategoryProps){
    return (        

        <View style={[RecordStyles.FloatingBottomStickButton, !isActive || creatingRelations? RecordStyles.FloatingBottomStickButtonDisabled : null]}>
            <Pressable
                onPress={onPress}
                disabled={!isActive}
            >
                {creatingRelations? <ActivityIndicator size={'small'} color={colors.light.primary} /> : null }
                <Text style={RecordStyles.FloatingBottomStickButtonText}>Transfer Balance to Journal</Text>
            </Pressable>
        </View>
    )
}