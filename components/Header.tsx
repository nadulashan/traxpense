import CommonStyles from '@/styles/commonStyles';
import { ReactElement } from 'react';
import { Pressable, Text, View } from 'react-native';
import { default as Headerstyles, default as universal } from '../styles/universal';

interface ButtonProps{
    icon: ReactElement<any, any>;
    onPress: () => void;
}

type PropTypes = {
    header : string;
    button: ButtonProps | undefined; 
    wrapperAvailable:boolean
}

export default function Header({ header, button, wrapperAvailable }:PropTypes){
    return (
        <View style={[ !wrapperAvailable? universal.screenWrapper : null , universal.headerWrapper]}>
            <Text style={Headerstyles.sectionHeader} >{header}</Text>
            {
                button?
                <Pressable onPress={button.onPress} style={CommonStyles.SquareButton}>
                    <View style={{alignSelf:'flex-end'}}>
                    {button.icon}
                    </View>
                </Pressable>
                :
                null
            }
        </View>
    )
}