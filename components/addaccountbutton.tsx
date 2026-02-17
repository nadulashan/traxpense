import CommonStyles from '@/styles/commonStyles';
import { Pressable, Text, View } from 'react-native';

type AddAccountButtonProps = {
    openBottomSheet: () => void;
    setFocusedAccount:React.Dispatch<React.SetStateAction<{ accountId: number; name: string; badge: string; amount: number; isActive: number; } | null>>;
    setRenderBottomSheet:React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddAccountButton({openBottomSheet, setFocusedAccount,setRenderBottomSheet}:AddAccountButtonProps){
    return (        

        <View style={CommonStyles.FloatingActionButtonWrapper}>
            <Pressable
                onPress={() => {
                    setRenderBottomSheet(false)
                    openBottomSheet()
                    setFocusedAccount(null)
                    setRenderBottomSheet(true)
                }}
            >
                    <Text style={CommonStyles.FloatingActionButtonText}>+ New</Text>
            </Pressable>
        </View>
    )
}