import fonts from "@/constants/fonts";
import { StyleSheet } from "react-native";

const AnalysisStyles = StyleSheet.create({
    overview:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between'
    },

    OverviewDetails: {
        flexDirection:'column',
        justifyContent:'space-evenly'
    },

    FundText: {
        fontSize:14,
        fontFamily:fonts.light
    },

    FundCurrency: {
        fontFamily:fonts.regular,
        fontSize:18
    },

    FundBalance: {
        fontFamily:fonts.semiBold,
        fontSize:18
    },

    FundDecimal: {
        fontFamily:fonts.light,
        fontSize:14
    },

    centerComponent: {
        flexDirection:'column',
        alignItems:'center',
        // justifyContent:'center',
        // backgroundColor:'coral'
    },

    centerComponentPercText: {
        fontFamily:fonts.semiBold,
        fontSize:28,
        lineHeight:32
    },

    centerComponentAccountName: {
        fontFamily:fonts.light,
        fontSize:12,
        lineHeight:13
    }
})

export default AnalysisStyles