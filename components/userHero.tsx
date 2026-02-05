import { Image, Text, View } from 'react-native';
import UserHeroStyles from '../styles/userHeroStyles';

export default function UserHero(){
    return(
        <View style={UserHeroStyles.container}>
            <Image style={UserHeroStyles.profileImage} source={require('../media/img/avatar.png')}/>
            
            <View style={UserHeroStyles.userNameEmailContainer}>
                <Text style={UserHeroStyles.userName}>Nadula Shan</Text>
                <Text style={UserHeroStyles.email}>nadulashan@gmail.com</Text>
            </View>
        </View>
    )
}