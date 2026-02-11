import colors from "@/constants/colors";
import fonts from "@/constants/fonts";
import { StyleSheet } from "react-native";

const FundCreditAccountsStyles = StyleSheet.create({
    AddButtonContainer : {
        position:'absolute',
        bottom:16,
        right:16,
        // backgroundColor:colors.light.white,
        paddingTop:8,
        paddingBottom:8,
        paddingLeft:24,
        paddingRight:24,
        borderRadius:8,
        // borderColor:colors.light.primary
       
    },

    AddButton : {
        width:'90%',
        backgroundColor:colors.light.primary,
    },

    AddButtonText : {
        color:colors.light.white,
        fontFamily:fonts.regular
    },

    BottomSheetWrapper: {
        margin:16,
        // paddingBottom:36
    },

    BottomSheetNameBadgeWrapper : {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'baseline',
        gap:16,
        marginTop:32,
        marginRight:16
    },

    BottomSheetNameBalance : {
        borderBottomWidth:1,
        borderColor:colors.light.primary,
        fontFamily:fonts.regular,
        marginBottom:32,
        includeFontPadding:false,
        // backgroundColor:'red'
        paddingBottom: 4,
        // paddingTop: 0,
        paddingLeft: 0,
        fontSize:16
    },

    BottomSheetName : {
        flex:8
    },


    BottomSheetDropdown : {
        flex:1,
        height:24,
        fontFamily:fonts.medium,
        // backgroundColor:'red'
    },

    BottomSheetButtonWrapper : {
        flexDirection:'row',
        gap:16,
        justifyContent:'space-between'
    },

    BottomSheetButtons : {
        flex:1,
        height:48,
        borderRadius:8,
        alignItems:'center',
        justifyContent:'center'
    },

    BottomSheetButtonText : {
        fontFamily:fonts.semiBold
    },

    BottomSheetCancel : {   
        backgroundColor:colors.light.primaryLight
    },

    BottomSheetSave : {   
        backgroundColor:colors.light.primary
    },
    BottomSheetSaveText : {
        color:colors.light.white
    },
    MaxAccountText : {
        fontFamily:fonts.light,
        color:colors.light.accent,
        fontSize:16,
        marginTop:64,
        marginBottom:64,
        textAlign:'center'
    }
})


export default FundCreditAccountsStyles;