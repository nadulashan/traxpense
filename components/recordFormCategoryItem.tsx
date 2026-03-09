import { Pressable, Text, View } from 'react-native';

interface ItemTypes{
    badge:string;
    name:string
}

export default function CategoryItem({
    badge,
    name
}: ItemTypes){
    return (
        <Pressable>
            <View></View>
            <Text>{name}</Text>
        </Pressable>
    )
}