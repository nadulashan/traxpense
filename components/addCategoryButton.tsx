import CommonStyles from '@/styles/commonStyles';
import { Pressable, Text, View } from 'react-native';

type AddCategoryProps = {
    openSheetCaller: () => void;
}

export default function AddCategoryButton({openSheetCaller}: AddCategoryProps){
    return (        

        <View style={CommonStyles.FloatingActionButtonWrapper}>
            <Pressable
                onPress={() => {
                    openSheetCaller()
                }}
            >
                    <Text style={CommonStyles.FloatingActionButtonText}>+ New</Text>
            </Pressable>
        </View>
    )
}