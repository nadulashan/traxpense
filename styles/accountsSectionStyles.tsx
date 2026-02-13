import colors from "@/constants/colors";
import fonts from "@/constants/fonts";
import { StyleSheet } from "react-native";

const AccountsSection = StyleSheet.create({
    AccountCardStyles: {
        height:224,
        width:360,
        // marginLeft:24,
        overflow:'hidden', // To ensure android respect borderRadius
        marginTop:2,
        marginBottom:2,
    },

    AccountCardMain:{
        flexDirection:'column',
        marginLeft:24,
        marginTop:24,
        flex:2
    },
    AccountCardBadgeName:{
        flexDirection:'row',
        alignItems:'center',
        gap:24
    },
    AccountCardBadge:{
        width:24,
        height:24,
        borderRadius:12
    },
    AccountCardName:{
        fontSize:20,
        color:'#fff',
        fontFamily:fonts.regular
    },
    AccountCardBalance:{
        fontSize:32,
        fontFamily:fonts.semiBold,
        color:'#fff'
    },

    AccountCardRecentContainer:{
        marginLeft:24,
        marginRight:24,
        flexDirection:'row',
        flex:1,
        justifyContent:'space-between'
    },

    AccountCardRecentCard:{
        flexDirection:'column',
    },

    AccountCardRecentTop:{
        flexDirection:'row'
    },

    AccountCardRecentTopText:{
       color:'white',
       marginLeft: 8,
       fontFamily:fonts.light,
       fontSize:12
    },
    AccountCardRecentBottomText:{
       color:'white',
       fontFamily:fonts.semiBold,
       fontSize:12,
       marginLeft:4 // to make it have the same initial margin as arrow icon
    },
    AddAccountCard: {
        backgroundColor:colors.light.primaryLight,
        borderRadius:8,
        borderWidth:2,
        borderColor:colors.light.primary,
        justifyContent:'center',
        alignItems:'center'
    },
    AddAccountCardText: {
        fontSize:24,
        fontFamily:fonts.semiBold,
        color:colors.light.primary
    },
})


export default AccountsSection