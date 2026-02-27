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

export function badgeSorterAcc(valiedBadges:{ label: null; badge: string; }[], fetchedBadges:{ accountBadge: string; }[]):{ label: null; badge: string; }[] {
    const sortedBadges = valiedBadges.filter(badge => {
                            let isValied = true;
                            fetchedBadges.forEach(fetchedBadge => {
                                if ( fetchedBadge.accountBadge == badge.badge )  {
                                    isValied = false;
                                }
                            })
                            return isValied;
                        })
    return sortedBadges
}
export function badgeSorter(valiedBadges:{ label: null; badge: string; }[], fetchedBadges:{ badge: string; }[]):{ label: null; badge: string; }[] {
    const sortedBadges = valiedBadges.filter(badge => {
                            let isValied = true;
                            fetchedBadges.forEach(fetchedBadge => {
                                if ( fetchedBadge.badge == badge.badge )  {
                                    isValied = false;
                                }
                            })
                            return isValied;
                        })
    return sortedBadges
}


export function checkTypes(input: string): boolean {
    if (input.trim() === "") return false;
    return Number.isFinite(Number(input));
}