import colors from '@/constants/colors';
import RecordStyles from '@/styles/recordsStyles';
import { ActivityIndicator, View } from 'react-native';
import CategoryItem from './recordFormCategoryItem';

interface CategoryWrapperTypes {
    categories:{ categoryId:number, name:string, badge:string }[] | null;
    onCategoryPress:(category: { categoryId: number; name: string; badge: string; }) => void;
    // selectedCategory:{ categoryId:number, name:string, badge:string };
    // setSelectedCategory:React.Dispatch<React.SetStateAction<{ categoryId:number, name:string, badge:string }>>;
}

export default function FormCategoryWrapper({
    categories,
    onCategoryPress
    // selectedCategory,
    // setSelectedCategory
}: CategoryWrapperTypes) {

    return (
        <View style={RecordStyles.CategoryElementWrapper}>
        {
            categories?
            categories.map((item) => (
                <CategoryItem key={item.categoryId} name={item.name} badge={item.badge} onCategoryPress={onCategoryPress} category={item}/>
            ))
            :
            <ActivityIndicator size={'small'} color={colors.light.primary} />
        }
        </View>
    )
}