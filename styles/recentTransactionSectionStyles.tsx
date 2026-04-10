import colors from "@/constants/colors";
import fonts from "@/constants/fonts";
import { StyleSheet } from "react-native";

const RecentTransactionSectionStyles = StyleSheet.create({
    RecentTransactionFilter : {
        // backgroundColor:colors.light.primary,
        borderRadius:16,
        marginLeft:24,
        borderWidth:1,
        borderColor:colors.light.primary
    },

    RecentTransactionFilterText : {
        paddingTop:8,
        paddingBottom:8,
        paddingLeft:24,
        paddingRight:24,
        fontFamily:fonts.light,
        // color:'white',
        fontSize:12
    },

    RecentTransactionsWrapper : {
        marginLeft:24,
        marginRight:24,
        marginTop:24,
        gap:24
    },

    RecentTransactionWrapper : {
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:16
    },

    RecentTransactionLeft : {
        flexDirection:'row',
        gap:16
    },

    RecentTransactionLeftIcon : {
        height:44,
        width:44,
        borderRadius:22,
        justifyContent:'center',
        alignItems:'center'
    },

    RecentTransactionLeftRight : {
        // backgroundColor:'grey',
        justifyContent:'center',
    },

    RecentTransactionLeftRightNameBadge : {
        flexDirection:'row',
        alignItems:'center',
        gap:8,
        // backgroundColor:'red'
    },

    RecentTransactionLeftName: {
        fontFamily:fonts.medium,
        fontSize:16
    },

    RecentTransactionLeftRightBadge : {
        height:16,
        width:16,
        borderRadius:8,
        // for transfer half badge
        flexDirection:'row',
        overflow:'hidden'
    },

    RecentTransactionLeftDate : {
        fontFamily:fonts.light,
        fontSize:12
    },
    RecentTransactionRight : {
        fontFamily:fonts.semiBold,
        fontSize:16,
    },

    RecentTransactionRightDeciaml: {
        fontFamily:fonts.light,
        fontSize:14
    },

    RecentTransactionLeftRightBadgeHalf: {
        height:16,
        width:8,
    }
})

export default RecentTransactionSectionStyles;