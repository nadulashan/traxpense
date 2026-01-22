import { Image, Text, View } from 'react-native';

import universal from '@/styles/universal';
import colors from '../constants/colors';
import userStyles from '../styles/userStyles';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function User(){
    return (
        <View style={[userStyles.wrapper, universal.screenWrapper]}>
            <View style={userStyles.leftView}>
                <Image style={userStyles.image} source={require('../media/img/avatar.png')}/>
                <Text style={userStyles.text}>Nadula Shan</Text>
            </View>
            <View style={userStyles.rightView}>
                <MaterialIcons name="notifications-none" size={32} color={colors.light.primary} />
            </View>
        </View>
    )
}