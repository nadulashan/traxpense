import colors from '@/constants/colors';
import CommonStyles from '@/styles/commonStyles';
import RecordStyles from '@/styles/recordsStyles';
import { ActivityIndicator, Text, View } from 'react-native';
import CategoryItem from './recordFormCategoryItem';

interface CategoryWrapperTypes {
    categories:{ categoryId:number, name:string, badge:string }[] | null;
    onCategoryPress:(category: { categoryId: number; name: string; badge: string; }) => void;
}

export default function FormCategoryWrapper({
    categories,
    onCategoryPress
}: CategoryWrapperTypes) {

    return (
        <View style={RecordStyles.CategoryElementWrapper}>
        {
            categories?
            
                categories.length !== 0 ?
                categories.map((item) => (
                    <CategoryItem key={item.categoryId} name={item.name} badge={item.badge} onCategoryPress={onCategoryPress} category={item}/>
                ))
                :
                <Text style={CommonStyles.NoActionText}>Looks like there aren't active categories you are looking for</Text>
            :
            <ActivityIndicator size={'small'} color={colors.light.primary} />
        }
        </View>
    )
}