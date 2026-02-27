import colors from "@/constants/colors";
import CommonStyles from "@/styles/commonStyles";
import RecurringStyles from "@/styles/recurringStyles";
import { RecurringCategory } from '@/types/recurring.schema';
import { ActivityIndicator, Text, View } from 'react-native';
import RecurringItem from "./recurringItem";

type RecurringCategoriesProps = {
    categories:RecurringCategory[];
    isCategoriesReady:boolean;
}

export default function RecurringContentWrapper({
    categories,
    isCategoriesReady
}: RecurringCategoriesProps){
    return(
        <View style={RecurringStyles.RecurringContentWrapper}>
            {isCategoriesReady? 
                <>

                {   categories.length !== 0 ? 
                    categories.map(category => (
                        <RecurringItem 
                        key = {category.categoryId}
                        name = { category.name } 
                        amount = { category.amount }
                        accountName = { category.accountName}
                        accountBadge = {category.accountBadge}
                        badge = { category.badge }
                        frequency = { category.recurringFrequency }
                        nextOccurance = { category.nextOccurrence }
                        lastOccurance = { category.lastOccurrence }
                        category  = { category }

                        />
                    ))
                    :
                    <Text style={[CommonStyles.NoActionText, {marginTop:24}]}>Looks like you don't have any Recurring Items.</Text>
                }
                </>
            :
                <View style={{minHeight:'100%', flexDirection:'column', justifyContent:'center'}}>
                    <ActivityIndicator size={'large'} color={colors.light.primary}/>
                </View>
            }
        </View>
    )
}