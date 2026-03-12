import colors from '@/constants/colors';
import CommonStyles from '@/styles/commonStyles';
import RecordStyles from '@/styles/recordsStyles';
import Feather from '@expo/vector-icons/Feather';
import { Pressable, View } from 'react-native';

type AddCategoryProps = {
    openSheetCaller: () => void;
}

export default function AddRecordButton({ openSheetCaller }: AddCategoryProps){
    return (        

        <View style={[ CommonStyles.FloatingActionButtonWrapper, RecordStyles.FloatingButton]}>
            <Pressable
                onPress={openSheetCaller}
            >
                    <Feather name="edit" size={24} color={colors.light.white} />
            </Pressable>
        </View>
    )
}