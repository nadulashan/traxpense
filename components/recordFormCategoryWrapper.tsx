import { View } from 'react-native';
import CategoryItem from './recordFormCategoryItem';

interface CategoryWrapperTypes {
    categories:{ categoryId:number, name:string, badge:string }[];
    selectedCategory:{ categoryId:number, name:string, badge:string };
    setSelectedCategory:React.Dispatch<React.SetStateAction<{ categoryId:number, name:string, badge:string }>>;
}

export default function FormCategoryWrapper({
    categories,
    selectedCategory,
    setSelectedCategory
}: CategoryWrapperTypes) {

    return (
        <View>
        {
            categories.map((item) => (
                <CategoryItem name={item.name} badge={item.badge} />
            ))
        }
        </View>
    )
}