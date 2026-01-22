import { Pressable, Text } from "react-native-gesture-handler";
import AccountSection from "../styles/accountsSectionStyles";

export default function AddAccountCard(){
    function pressed(){
        console.log("pressed")
    }

    return (
        <Pressable style={[ AccountSection.AddAccountCard, AccountSection.AccountCardStyles]} onPress={pressed}>
            <Text style={AccountSection.AddAccountCardText}>+ Add Account</Text>
        </Pressable>
    )
}