import CommonStyles from '@/styles/commonStyles';
import RecordStyles from '@/styles/recordsStyles';
import { Pressable, Text, View } from 'react-native';

interface ItemTypes{
    badge:string;
    name:string;
    onCategoryPress:(category: { categoryId: number; name: string; badge: string; }) => void
    category: { categoryId:number, name:string, badge:string };
}

export default function CategoryItem({
    badge,
    name,
    onCategoryPress,
    category
}: ItemTypes){
    return (
        <Pressable 
            onPress={() => onCategoryPress(category)}
            style={RecordStyles.CategoryElement}> 
            <View style={[CommonStyles.badge, {backgroundColor:badge}]}></View>
            <Text style={RecordStyles.CategoryElementText}>{name}</Text>
        </Pressable>
    )
}