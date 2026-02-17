import CommonStyles from '@/styles/commonStyles'
import { Text, TextInput, View } from 'react-native'

export default function BottomSheetCategories(){

    return (
        <View style={CommonStyles.BottomSheetWrapper}>
            <View>
                <Text style={CommonStyles.BottomSheetFieldText}>Category Name:</Text>
                <TextInput 
                    style={CommonStyles.BottomSheetInput}
                />
            </View>

            <View style={CommonStyles.BottomSheetBadgeWrapper}>
            

            </View>
        </View>
    )
}