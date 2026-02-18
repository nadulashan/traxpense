import CategoryContentStyles from '@/styles/categoryContenStyles';
import Feather from '@expo/vector-icons/Feather';
import { Pressable, Text, View } from 'react-native';

type CategoryContentProps = {
    categoryName:string;
    categoryBadge:string;
}
export default function CategoriesContent({
    categoryName,
    categoryBadge
}:CategoryContentProps) {
    return(
            <View style={CategoryContentStyles.CategoryItemWrapper}>
                <View style={CategoryContentStyles.CategoryNameBadge}>
                    <View style={{height:20, width:20, backgroundColor:categoryBadge, borderRadius:10}}></View>
                    <Text style={CategoryContentStyles.CategoryNameText}>{categoryName}</Text>
                </View>
                <Pressable
                    onPress={() => console.log('ss')}
                >
                    <Feather name="edit-3" size={20} color="black" />
                </Pressable>
            </View>
    )
}