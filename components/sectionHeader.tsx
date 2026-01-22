import { Text } from 'react-native';
import { default as Headerstyles, default as universal } from '../styles/universal';
type PropTypes = {
    header : string;
}

export default function SectionHeader({header}:PropTypes){
    return (
        <Text style={[Headerstyles.sectionHeader,universal.screenWrapper]} >{header}</Text>
    )
}