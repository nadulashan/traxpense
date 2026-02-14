import colors from "@/constants/colors";
import fonts from "@/constants/fonts";
import { StyleSheet } from "react-native";

const FundCreditAccountsStyles = StyleSheet.create({

    AddAccountButtonWrapper : {
        position:'absolute',
        width:36,
        height:36,
        bottom:360,
        left:36,
        backgroundColor:'black'
    },

    ContentWrapper : {
        marginLeft:24,
        marginRight:24,
        marginTop:24,
        alignItems:'center'
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
        lineHeight:18
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

    },

    BottomSheetButton:{
        flex:1,
        borderRadius:8
    },

    BottomSheetButtonText:{
        fontFamily:fonts.semiBold,
        color:colors.light.white,
        textAlign:'center'
    },

    BottomSheetSaveButton : {
        backgroundColor: colors.light.primary,
        paddingTop:16,
        paddingBottom:16,
    },

    InvalidResponse : {
        color:colors.light.red,
        fontSize:12,
        fontFamily:fonts.semiBold
    },

    MaximumWariningText  : {
        color:colors.light.accent,
        fontFamily:fonts.regular,
        textAlign:'center'
    }
})


export default FundCreditAccountsStyles;