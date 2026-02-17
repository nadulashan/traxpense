import colors from "@/constants/colors";
import fonts from "@/constants/fonts";
import { StyleSheet } from "react-native";

const CommonStyles = StyleSheet.create({

    FloatingActionButtonWrapper : {
        position:'absolute',
        // width:44,
        // height:44,
        borderRadius:8,
        bottom:24,
        right:24,
        backgroundColor:colors.light.primary,
        alignItems:'center',
        justifyContent:'center',
        paddingTop:8,
        paddingBottom:8,
        paddingLeft:16,
        paddingRight:16,
    },

    FloatingActionButtonText : {
        color:colors.light.white,
        fontSize:16,
        fontFamily:fonts.semiBold
    },

    ActivityIndicatorWrapper : {
        alignItems:'center',
        // backgroundColor:'pink',
        minHeight:'100%',
        justifyContent:'center',
        flex:1
    },
    
    BottomSheetWrapper: {
        margin:16,
        gap:16
    },

    BottomSheetFieldText : {
        fontFamily:fonts.light,
        fontSize:12
    },

    BottomSheetInput : {
        backgroundColor:colors.light.primaryLight,
        borderRadius:8,
        fontFamily:fonts.regular,
        fontSize:16,
        height:50,
        alignItems:'center'
    },

    BottomSheetBadgeWrapper : {
        flexDirection:'row',
        flex:1,
        justifyContent:'space-between',
        alignItems:'center'
    },

    BottomSheetButtonWrapper: {
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        gap:16
    },

    BottomSheetButton:{
        flex:1,
        borderRadius:8,
        paddingTop:16,
        paddingBottom:16,
    },

    BottomSheetButtonText:{
        fontFamily:fonts.semiBold,
        color:colors.light.white,
        textAlign:'center'
    },

    BottomSheetSecondaryButton : {
        backgroundColor: colors.light.red,
    },

    BottomSheetPrimaryButton : {
        backgroundColor: colors.light.primary,
    },

    InvalidResponse : {
        color:colors.light.red,
        fontSize:12,
        fontFamily:fonts.semiBold
    },

    NoActionText  : {
        color:colors.light.accent,
        fontFamily:fonts.regular,
        textAlign:'center'
    },

    NoActionDangerText  : {
        color:colors.light.red,
        fontFamily:fonts.semiBold,
        textAlign:'center'
    },


})


export default CommonStyles;