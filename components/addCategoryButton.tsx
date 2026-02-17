import FundCreditAccountsStyles from '@/styles/fundCreditAccountsStyles';
import { Pressable, Text, View } from 'react-native';

type AddCategoryProps = {
    openSheetCaller: () => void;
}

export default function AddCategoryButton({openSheetCaller}: AddCategoryProps){
    return (        

        <View style={FundCreditAccountsStyles.AddAccountButtonWrapper}>
            <Pressable
                onPress={() => {
                    openSheetCaller()
                }}
            >
                    <Text style={FundCreditAccountsStyles.AddAccountButtonText}>+ New</Text>
            </Pressable>
        </View>
    )
}