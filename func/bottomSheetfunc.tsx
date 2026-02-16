import BottomSheet from "@gorhom/bottom-sheet";
import { Keyboard } from "react-native";

export function openBottomSheet(sheetRef:React.RefObject<BottomSheet | null>){
    sheetRef.current?.expand()
}

export function closeBottomSheet(sheetRef:React.RefObject<BottomSheet | null>){
    Keyboard.dismiss()
    setTimeout(() => {
    sheetRef.current?.close()
    },500)
}