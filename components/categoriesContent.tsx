import CategoryContentStyles from '@/styles/categoryContenStyles';
import Feather from '@expo/vector-icons/Feather';
import { Pressable, Text, View } from 'react-native';

type CategoryContentProps = {
    categoryName:string;
    categoryBadge:string;
    category:{categoryId:number, name:string; badge:string; isActive:number};
    setFocusedCategory:React.Dispatch<React.SetStateAction<undefined | {categoryId:number, name:string; badge:string; isActive:number}>>;
}
export default function CategoriesContent({
    categoryName,
    categoryBadge,
    setFocusedCategory,
    category
}:CategoryContentProps) {
    return(
            <View style={CategoryContentStyles.CategoryItemWrapper}>
                <View style={CategoryContentStyles.CategoryNameBadge}>
                    {category.badge? <View style={{height:24, width:24, backgroundColor:categoryBadge, borderRadius:12}}></View> : <View style={{height:24, width:24, backgroundColor:'grey', borderRadius:12}}></View>}
                    <Text style={CategoryContentStyles.CategoryNameText}>{categoryName}</Text>
                </View>
                <Pressable
                    onPress={() => setFocusedCategory(category)}
                >
                    <Feather name="edit-3" size={20} color="black" />
                </Pressable>
            </View>
    )
}