import CommonStyles from "@/styles/commonStyles";
import { Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

interface OptionsDisplayProps{
    itemsPerRow: number,
    options: any[],
    onOptionPress: ( label: string, value:string ) => void
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
        <View style={{maxHeight: 480}}>
        <ScrollView>
            {
                motherArray.map( motherItem => (
                    <View key={ motherItem[0].id } style={{width:'100%', alignItems:'center', justifyContent:'space-between', flexDirection:'row', marginBottom:16}} >
                        {
                            motherItem.map( item => (
                                <Pressable key={item.id} onPress={() => onOptionPress(item.label, item.value)} style={[CommonStyles.BottomSheetSelect, {paddingLeft:16, paddingRight:16, width:108,}]}>
                                    {
                                        isBadges?
                                        <View key={item.id} style={[CommonStyles.badge, {backgroundColor:item.value}]}></View>
                                        :
                                        <Text >{item.label}</Text>
                                    }
                                </Pressable>
                            ))
                        }
                    </View>
                ))
            }
        </ScrollView>
        </View>
    )
}