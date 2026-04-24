import colors from '@/constants/colors';
import CommonStyles from '@/styles/commonStyles';
import { ActivityIndicator, Text, View } from 'react-native';
import CategoriesContent from './categoriesContent';

type CategoryContentWrapperProps = {
    categories:{categoryId:number, name:string; badge:string; isActive:number}[];
    setFocusedCategory:React.Dispatch<React.SetStateAction<undefined | {categoryId:number, name:string; badge:string; isActive:number}>>;
}

export default function CategoryContentWrapper({categories,setFocusedCategory}:CategoryContentWrapperProps){
    return (
        <View style={{marginLeft:24, marginRight:24, marginTop:24, minHeight:'100%'}}>
            {categories?
                categories.length == 0?
                <View>
                    <Text style={CommonStyles.NoActionText}>Looks like you don't have any categories. Create one to start organizing</Text>
                </View>
                :
                categories.map(category => (
                    <CategoriesContent key= {category.categoryId} categoryName={category.name} categoryBadge={category.badge} category={category} setFocusedCategory={setFocusedCategory} />
                ))
            :
            <View style={CommonStyles.ActivityIndicatorWrapper}>
                    <ActivityIndicator 
                        size='large'
                        color={colors.light.primary}
                    />
            </View>
            }
        </View>
    )
}