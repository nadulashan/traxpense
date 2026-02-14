import FundCreditAccountsStyles from '@/styles/fundCreditAccountsStyles';
import { Pressable, Text, View } from 'react-native';

type AddAccountButtonProps = {
    openBottomSheet: () => void;
    setFocusedAccount:React.Dispatch<React.SetStateAction<{ accountId: number; name: string; badge: string; initialBalance: number; isActive: number; } | null>>;
    setRenderBottomSheet:React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddAccountButton({openBottomSheet, setFocusedAccount,setRenderBottomSheet}:AddAccountButtonProps){
    return (        

        <View style={FundCreditAccountsStyles.AddAccountButtonWrapper}>
            <Pressable
                onPress={() => {
                    setRenderBottomSheet(false)
                    openBottomSheet()
                    setFocusedAccount(null)
                    setRenderBottomSheet(true)
                }}
            >
                    <Text style={FundCreditAccountsStyles.AddAccountButtonText}>+ New</Text>
            </Pressable>
        </View>
    )
}