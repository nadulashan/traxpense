import colors from '@/constants/colors';
import CommonStyles from '@/styles/commonStyles';
import Entypo from '@expo/vector-icons/Entypo';
import { ReactNode } from 'react';
import { Pressable, Text, View } from "react-native";

interface UniversalSheetWrapperProps{
    title: string;
    onBackPress: () => void | undefined;
    goBackavailable: boolean
    onCrossPress: () => void;
    children: ReactNode;
}

export default function UniversalSheetWrapper({ title, onBackPress, goBackavailable, onCrossPress, children }: UniversalSheetWrapperProps) {

    const buttonInactiveColor = colors.light.accent
    const buttonActiveColor = 'black'

    return (
        <View style={{margin:16}}>
            <View style={CommonStyles.BottomSheetHeaderWrapper}>
                <Pressable onPress={ () => {
                    if ( goBackavailable ) {
                        onBackPress()
                    }    
                }} style={CommonStyles.BottomSheetHeaderButton} >
                    <Entypo name="chevron-left" size={24} color={ goBackavailable? buttonActiveColor : buttonInactiveColor} />
                </Pressable>
                <Text style={CommonStyles.BottomSheetHeaderText}>{title}</Text>
                <Pressable onPress={onCrossPress} style={CommonStyles.BottomSheetHeaderButton} >
                    <Entypo name="cross" size={24} color={buttonActiveColor} />
                </Pressable>
            </View>
            {/* <View style={CommonStyles.BottomSheetHeaderBreaker}></View> */}
            <View>
                {children}
            </View>
        </View>
    )
}