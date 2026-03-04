import colors from "@/constants/colors";
import fonts from "@/constants/fonts";
import { StyleSheet } from "react-native";

const RecordStyles = StyleSheet.create({
    CalendarButton: {
        height:44,
        width:84,
        margin:8,
        backgroundColor:colors.light.primary,
        borderRadius:8,
        alignItems:'center',
        justifyContent:'center'
    },

    DateItem: {
        height:120,
        width:84,
        marginLeft:8,
        marginRight:8,
        alignItems:'center',
        marginTop:40,
        justifyContent:'center',
        transform:[{scaleY:-1}],
    },

    DateItemSelected: {   
        backgroundColor:colors.light.primary,
        borderRadius:8
    },

    DateItemMonth: {
        fontFamily:fonts.light,
        fontSize:16
    },

    DateItemDate: {
        fontFamily:fonts.semiBold,
        fontSize:24
    },

    DateItemDay: {
        fontFamily:fonts.light,
        fontSize:16
    },

    SelectedText: {
        color:colors.light.white
    },

    ButtonListWrapper: {
        width:100,
        height:'100%',
    },

    ListWrapper: {
        width:'100%',
        height:'100%',
        // marginBottom:200,
        transform:[{scaleY:-1}]
    },

})

export default RecordStyles