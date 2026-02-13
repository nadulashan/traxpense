import colors from "@/constants/colors";
import fonts from "@/constants/fonts";
import { StyleSheet } from "react-native";

const FundCreditAccountsStyles = StyleSheet.create({
    AddButtonContainer : {
        // position:'absolute',
        // bottom:16,
        // right:16,
        // // backgroundColor:colors.light.white,
        // paddingTop:8,
        // paddingBottom:8,
        // paddingLeft:24,
        // paddingRight:24,
        // borderRadius:8,
        // // borderColor:colors.light.primary
        marginLeft:24,
        marginRight:24,
       
    },

    AddButton : {
        width:360,
        backgroundColor:colors.light.primary,
        alignItems:'center',
        justifyContent:'center',
        paddingTop:12,
        paddingBottom:12,
        borderRadius:8,
    },

    AddButtonText : {
        color:colors.light.white,
        fontFamily:fonts.medium,
        fontSize:16,
        lineHeight:16
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

    BottomSheetSuspend : {   
        backgroundColor:colors.light.red
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
    },

    ContentWrapper : {
        marginLeft:24,
        marginRight:24,
        marginTop:24,
        alignItems:'center'
    },

    CardManageButtonWrapper : {
        marginBottom:36,
        gap:16,
    },

    ManageButton : {
        paddingTop:8,
        paddingBottom:8,
        width:360,
        borderWidth:1,
        borderColor:colors.light.primary,
        alignItems:'center',
        borderRadius:8
    },

    ManageButtonText : {
        fontFamily:fonts.medium,
        textAlign:'center'
    },

    ConditionalText : {
        fontFamily:fonts.regular,
        textAlign:'center',
        paddingTop:24,
        paddingBottom:36,
        color:colors.light.accent
    }
})


export default FundCreditAccountsStyles;