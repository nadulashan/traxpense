import FundCreditAccountsStyles from '@/styles/fundCreditAccountsStyles';
import { Pressable, Text, View } from 'react-native';

type AddAccountButtonProps = {
    openBottomSheet: () => void;
    setFocusedAccount:React.Dispatch<React.SetStateAction<{ accountId: number; name: string; badge: string; amount: number; isActive: number; } | null>>;
    setRenderBottomSheet:React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddCategoryButton(){
    return (        

        <View style={FundCreditAccountsStyles.AddAccountButtonWrapper}>
            <Pressable
                onPress={() => {
                    
                }}
            >
                    <Text style={FundCreditAccountsStyles.AddAccountButtonText}>+ New</Text>
            </Pressable>
        </View>
    )
}