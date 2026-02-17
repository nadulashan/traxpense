import colors from "@/constants/colors";
import fonts from "@/constants/fonts";
import { StyleSheet } from "react-native";

const FundCreditAccountsStyles = StyleSheet.create({

    AccountContentWrapper : {
        marginLeft:24,
        marginRight:24,
        marginTop:24,
        alignItems:'center',
    },

    AccountButtonWrapper:{
        width:'100%',
        alignItems:'center',
        gap:16,
        marginBottom:36
    },

    ManageButtonWrapper : {
        width:'100%',
        paddingTop:8,
        paddingBottom:8,
        backgroundColor:colors.light.white,
        borderRadius:8,
        borderWidth:2,
        borderColor:colors.light.primary
    },

    ManageButtonText : {
        fontFamily:fonts.medium,
        color:colors.light.primary,
        fontSize:16,
        textAlign:'center'
    },
    
    


})


export default FundCreditAccountsStyles;