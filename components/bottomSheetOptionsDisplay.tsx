import CommonStyles from "@/styles/commonStyles";
import { Pressable, Text, View } from "react-native";

interface OptionsDisplayProps{
    itemsPerRow: number,
    options: any[],
    onOptionPress: ( badge: string ) => void
    isBadges: boolean;
}

export default function OptionsDisplay({ itemsPerRow, options, onOptionPress, isBadges }: OptionsDisplayProps ) {


    function organizeArrays() {
        let array:any[][] = []
        let counter = 0
        let daughterArray:any = []
        options.forEach(option => {
            if ( counter === itemsPerRow ) {
                array.push(daughterArray)
                counter = 0
                daughterArray = []
            }
            daughterArray.push(option)
            counter ++
        })
        array.push(daughterArray)
        return array
    }

    const motherArray:any[][] = organizeArrays()


    organizeArrays()
    return (
        <View>
            {
                motherArray.map( motherItem => {
                    console.log(motherItem[0].id)
                    return(
                    <View key={ motherItem[0].id } style={{width:'100%', alignItems:'center', justifyContent:'space-between', flexDirection:'row', marginBottom:16}} >
                        {
                            motherItem.map( item => (
                                <Pressable key={item.id} onPress={() => onOptionPress(item.badge)} style={[CommonStyles.BottomSheetSelect, {paddingLeft:16, paddingRight:16}]}>
                                    {
                                        isBadges?
                                        <View key={item.id} style={[CommonStyles.badge, {backgroundColor:item.badge}]}></View>
                                        :
                                        <Text >{item.label}</Text>
                                    }
                                </Pressable>
                            ))
                        }
                    </View>
                )})
            }
        </View>
    )
}