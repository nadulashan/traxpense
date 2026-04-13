import CommonStyles from '@/styles/commonStyles';
import RecordStyles from '@/styles/recordsStyles';
import { ActiveAccountsProps } from '@/types/recordsTypeItemType.schema';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

interface ItemTypes{
    badge:string;
    name:string;
    onAccountPress:(account:ActiveAccountsProps) => void;
    account: ActiveAccountsProps;
    multiSelect: boolean;
}

export default function AccountItem({
    badge,
    name,
    onAccountPress,
    account,
    multiSelect
}: ItemTypes){

    const [ selected, setSelected ] = useState(false)

    return (
        <Pressable 
            onPress={() => {
                if ( multiSelect ) {
                    setSelected(val => !val)
                }
                onAccountPress(account)
            }}
            style={[ RecordStyles.CategoryElement, selected? RecordStyles.CategoryElementSelected : null ]}> 
            <View style={[CommonStyles.badge, {backgroundColor:badge}]}></View>
            <Text style={[ RecordStyles.CategoryElementText, selected? RecordStyles.CategoryElementTextSelected : null ]}>{name}</Text>
        </Pressable>
    )
}