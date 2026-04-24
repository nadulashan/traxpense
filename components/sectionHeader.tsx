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
}

export default function SectionHeader({ header, button }:PropTypes){
    return (
        <View style={[universal.screenWrapper, universal.headerWrapper]}>
            <Text style={Headerstyles.sectionHeader} >{header}</Text>
            {
                button?
                <Pressable onPress={button.onPress} style={CommonStyles.SquareButton}>
                    {button.icon}
                </Pressable>
                :
                null
            }
        </View>
    )
}