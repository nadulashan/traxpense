import { ItemContext } from '@/context/recurringContext';
import { displayTimes, priceWithComma } from '@/func/general';
import CommonStyles from '@/styles/commonStyles';
import RecurringStyles from '@/styles/recurringStyles';
import { RecurringCategory } from '@/types/recurring.schema';
import Feather from '@expo/vector-icons/Feather';
import { useContext, useRef } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';

type ItemProps = {
    name:string;
    amount: number;
    badge:string;
    accountName:string;
    accountBadge:string;
    frequency:string;
    nextOccurance:string;
    lastOccurance:string;
    category:RecurringCategory;
}

export default function RecurringItem({
    name,
    amount,
    badge,
    accountName,
    frequency,
    accountBadge,
    nextOccurance,
    lastOccurance,
    category
}:ItemProps){

    const handleEdit = useContext(ItemContext)

    const height = useRef( new Animated.Value(60)).current;
    const chevronDirection = useRef( new Animated.Value(0)).current;
    const isExpanded = useRef(false)

    const angle = chevronDirection.interpolate({
        inputRange: [ 0, 1 ],
        outputRange: [ "0deg", '180deg' ]
    });

    function handleExpand(){
        if ( !isExpanded.current ) {
            Animated.timing(height, {
                toValue:280,
                duration:200,
                useNativeDriver:false
            }).start()
            Animated.timing(chevronDirection, {
                toValue:1,
                duration:200,
                useNativeDriver:true
            }).start()
        } else {            
            Animated.timing(height, {
                toValue:60,
                duration:200,
                useNativeDriver:false
            }).start()
            Animated.timing(chevronDirection, {
                toValue:0,
                duration:200,
                useNativeDriver:true
            }).start()
        }
        isExpanded.current = !isExpanded.current
    }



    return(
        <Animated.View style={[RecurringStyles.RecurringItem, {height:height}]}>
            <Pressable onPress={(handleExpand)} style={RecurringStyles.RecurrintItemPressable}>
            <View style={RecurringStyles.BadgeNameArrow}>
                <View style={RecurringStyles.BadgeName}>
                    {
                        category.isActive === 1 ? <View style={[RecurringStyles.Badge, {backgroundColor:badge}]}></View> : <View style={[RecurringStyles.Badge, {backgroundColor:'grey'}]}></View>
                    }
                    
                    <Text style={RecurringStyles.NameText}>{name}</Text>
                </View>
                <Animated.View 
                    style = {{transform:[{rotateZ:angle}]}}>
                                <Feather name='chevron-down' size={24} color="black" />
                </Animated.View>
            </View>
            <View style={RecurringStyles.TagsWrapper}>
                <View style={[RecurringStyles.Tag,{backgroundColor:accountBadge}]}><Text style={RecurringStyles.TagAccountText}>{accountName}</Text></View>
                <View style={[RecurringStyles.Tag,{borderColor:'black', borderWidth:1}]}><Text style={RecurringStyles.TagFrequencyText}>{frequency}</Text></View>
            </View>
            <View>
                <Text  style={RecurringStyles.ExecutionText}>Last Execution: {lastOccurance? displayTimes(lastOccurance) : '-'}</Text>
                <Text style={RecurringStyles.ExecutionText}>Next Execution: {nextOccurance? displayTimes(nextOccurance) : '-'}</Text>
            </View>
            <Text style={RecurringStyles.AmountText}>{priceWithComma(amount)}</Text>
            </Pressable>
            {
                category.isActive === 1 ?
                <Pressable 
                onPress={() => handleEdit(category)}
                style={RecurringStyles.EditButton}><Text style={RecurringStyles.EditButtonText}>Edit</Text>
                </Pressable>
                :
                <Text style={[CommonStyles.NoActionText, {paddingTop:10}]}>This Category is suspended</Text>
            }
            
        </Animated.View>
    )
}