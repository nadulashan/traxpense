import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { SettingsStackParamList } from './SettingsStackNavigation';

type Props = StackScreenProps<SettingsStackParamList, 'Recurring'>

export default function Recurring({route}:Props){

    const navigation = useNavigation()
    const { screen } = route.params

    useEffect(() => {
        navigation.setOptions({title:screen})
    },[])

    return (
        <View>
            <Text>{screen}</Text>
        </View>
    )
}