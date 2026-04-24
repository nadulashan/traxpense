import CommonStyles from '@/styles/commonStyles';
import { Pressable, Text } from 'react-native';

type AddAccountButtonProps = {
    openBottomSheet: () => void;
    setFocusedAccount:React.Dispatch<React.SetStateAction<{ accountId: number; accountName: string; accountBadge: string; amount: number; isActive: number; } | null>>;
}

export default function AddAccountButton({openBottomSheet, setFocusedAccount}:AddAccountButtonProps){
    return (        

        <Pressable style={CommonStyles.FloatingActionButtonWrapper} onPress={() => {
                    openBottomSheet()
                    setFocusedAccount(null)
                }}>
                    <Text style={CommonStyles.FloatingActionButtonText}>+ New</Text>
        </Pressable>
    )
}