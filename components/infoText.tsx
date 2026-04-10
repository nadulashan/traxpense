import CommonStyles from '@/styles/commonStyles';
import { Text } from 'react-native';

interface Props{
    text: string;
}

export default function InfoText({ text }: Props){

    return (
        <Text style={CommonStyles.NoActionText}>{ text }</Text>
    )
}