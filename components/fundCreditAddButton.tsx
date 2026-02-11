import FundCreditAccountsStyles from '@/styles/fundCreditAccountsStyles';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Pressable, Text, View } from 'react-native';

type ButtonProps = {
    handlePress: () => void
}

export default function FundCreditAddButton({ handlePress }: ButtonProps){
    return(
        <View>
            <Pressable 
                onPress={handlePress}
                style={FundCreditAccountsStyles.AddButton}>
                <Text><FontAwesome6 name="add" size={24} color="black" /></Text>
            </Pressable>
        </View>
        )
}