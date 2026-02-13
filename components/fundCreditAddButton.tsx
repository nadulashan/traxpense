import FundCreditAccountsStyles from '@/styles/fundCreditAccountsStyles';
// import FontAwesome6 from '@expo/vector-icons/FontAwesome6';<FontAwesome6 name="add" size={16} color={colors.light.white} />
import { Pressable, Text, View } from 'react-native';

type ButtonProps = {
    handlePress: () => void;
    refreashFields:() => Promise<void>;
}

export default function FundCreditAddButton({ handlePress,refreashFields }: ButtonProps){
    return(
        <View style={FundCreditAccountsStyles.AddButtonContainer}>
            <Pressable 
                onPress={() => {
                    handlePress()
                    refreashFields()
                }}
                style={FundCreditAccountsStyles.AddButton}>
                <Text style ={FundCreditAccountsStyles.AddButtonText}> ADD NEW ACCOUNT</Text>
            </Pressable>
        </View>
        )
}