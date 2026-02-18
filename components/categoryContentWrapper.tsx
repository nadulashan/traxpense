import CommonStyles from '@/styles/commonStyles';
import { Text, View } from 'react-native';
import CategoriesContent from './categoriesContent';

type CategoryContentWrapperProps = {
    categories:{categoryId:number, name:string; badge:string; isActive:number}[];
}

export default function CategoryContentWrapper({categories}:CategoryContentWrapperProps){
    return (
        <View style={{marginLeft:24, marginRight:24}}>
            {categories?
                categories.length == 0?
                <View>
                    <Text style={CommonStyles.NoActionText}>Looks like you don't have any categories. Create one to start organizing</Text>
                </View>
                :
                categories.map(category => (
                    <CategoriesContent key= {category.categoryId} categoryName={category.name} categoryBadge={category.badge} />
                ))
            :
            <Text>Loading</Text>
            }
        </View>
    )
}