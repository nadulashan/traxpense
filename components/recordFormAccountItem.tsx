import colors from '@/constants/colors';
import CommonStyles from '@/styles/commonStyles';
import RecordStyles from '@/styles/recordsStyles';
import { ActiveAccountsProps } from '@/types/recordsTypeItemType.schema';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
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
            style={[ RecordStyles.CategoryElement]}> 
            <View style={{height:20, overflow:'hidden'}}>            
                <View style={[CommonStyles.badge, {backgroundColor:badge, alignItems:'center', justifyContent:'center'}]}>
                {
                    selected?
                    <FontAwesome5 name="check" size={12} color={colors.light.primaryLight} />
                    :
                    null
                }
                </View>
            </View>
            <Text style={[ RecordStyles.CategoryElementText]}>{name}</Text>
        </Pressable>
    )
}