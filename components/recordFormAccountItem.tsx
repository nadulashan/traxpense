import CommonStyles from '@/styles/commonStyles';
import RecordStyles from '@/styles/recordsStyles';
import { ActiveAccountsProps } from '@/types/recordsTypeItemType.schema';
import { Pressable, Text, View } from 'react-native';

interface ItemTypes{
    badge:string;
    name:string;
    onAccountPress:(account:ActiveAccountsProps) => void;
    account: ActiveAccountsProps;
}

export default function AccountItem({
    badge,
    name,
    onAccountPress,
    account
}: ItemTypes){
    return (
        <Pressable 
            onPress={() => onAccountPress(account)}
            style={RecordStyles.CategoryElement}> 
            <View style={[CommonStyles.badge, {backgroundColor:badge}]}></View>
            <Text style={RecordStyles.CategoryElementText}>{name}</Text>
        </Pressable>
    )
}