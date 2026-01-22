import colors from "@/constants/colors";
import fonts from "@/constants/fonts";
import { StyleSheet } from "react-native";

const QuickActionsSectionStyles = StyleSheet.create({
    QuickActionsWrapper : {
        marginLeft:24,
        marginRight:24,
        justifyContent:'space-between',
        flexDirection:'row',
    },

    QuickActionWrapper : {
        alignItems:'center',
        gap:8
    },

    QuickActionButton : {
        height:66,
        width:66,
        borderWidth:1,
        borderColor:colors.light.primary,
        borderRadius:8,
        alignItems:'center',
        justifyContent:'center'
    },

    QuickActionName : {
        fontFamily:fonts.regular,
        fontSize:10,
        color:colors.light.primary
    }
})

export default QuickActionsSectionStyles