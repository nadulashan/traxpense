import RecordStyles from "@/styles/recordsStyles";
import { Pressable, Text } from "react-native";

interface AddButtonTypes{
    onPress: () => void;
}

export default function AddButton({ onPress }: AddButtonTypes) {
    return (
        <Pressable onPress={onPress}>
            <Text style={RecordStyles.AddButton}>+ ADD</Text>
        </Pressable>
    )
}