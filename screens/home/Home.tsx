import { SafeAreaView } from 'react-native-safe-area-context';

import AccountCardsSection from '../../components/accountCardSection';
import User from '../../components/user';

import { View } from 'react-native';

export default function Home(){

    return (
        <SafeAreaView style={{backgroundColor:'#ffffff'}} edges={['top', 'left', 'right']}>
            <View >
                <User />
                < AccountCardsSection />
            </View>
        </SafeAreaView>
    )
}