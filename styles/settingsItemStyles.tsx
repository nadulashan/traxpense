import colors from "@/constants/colors";
import fonts from "@/constants/fonts";
import { StyleSheet } from "react-native";

const SettingsItemStyles = StyleSheet.create({
    itemContainer :{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:8,
        marginLeft:24,
        marginRight:24,
        paddingTop:8,
        paddingBottom:8,
        paddingLeft:16,
        paddingRight:16,
        backgroundColor:colors.light.primaryLight,
        borderRadius:8
    },

    iconitemNameContainer : {
        flexDirection:'row',
        alignItems:'center',
        gap:8
    },

    itemName : {
        fontSize:14,
        fontFamily:fonts.regular
    }
})

export default SettingsItemStyles