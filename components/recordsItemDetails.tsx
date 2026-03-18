import { ExpenseTypes, IncomeTypes } from '@/types/recordsTypeItemType.schema';
import { Pressable, Text, View } from 'react-native';

interface ItemDetailsTypes {
    item: IncomeTypes | ExpenseTypes | undefined;
}

export default function ItemDetails({
    item
}:ItemDetailsTypes) {
    return (
        <View>
            {
                item?
                <>
                    <View>
                        <View>
                            <Text>Category</Text>
                            <Text>{item.time}</Text>
                        </View>
                        <View>
                            <Text>{item.amount}</Text>
                            <Text>{item.accountName}</Text>
                        </View>
                    </View>
                    <View>
                        <Text>{item.comment}</Text>
                    </View>
                    <View>
                        <Pressable><Text>Close</Text></Pressable>
                        <Pressable><Text>Edit</Text></Pressable>
                    </View>
                </>
                :
                <Text>Something went wrong.</Text>
            }
        </View>
    )
}