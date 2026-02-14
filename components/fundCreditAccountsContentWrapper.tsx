import FundCreditAccountsStyles from '@/styles/fundCreditAccountsStyles';
import { Pressable, Text, View } from 'react-native';

type ContentWrapperProps = {
    openBottomSheet: () => void;
}

export default function FundCreditAccountsContentWrapper({
    openBottomSheet
}:ContentWrapperProps) {
   
    return(
        <View style={FundCreditAccountsStyles.ContentWrapper}>

            <View style={FundCreditAccountsStyles.AddAccountButtonWrapper}>
                <Pressable
                    onPress={openBottomSheet}
                >
                    <Text>ADD NEW ACCOUNT</Text>
                </Pressable>
            </View>
        </View>
    )
}