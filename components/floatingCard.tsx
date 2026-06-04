import CommonStyles from '@/styles/commonStyles'
import { View } from 'react-native'


export default function FloatingCard({children}:any) {
    return (
        <View style={[CommonStyles.dropShadow]}>
            {children}
        </View>
    )
}