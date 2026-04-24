import colors from "@/constants/colors";
import fonts from "@/constants/fonts";
import { StyleSheet } from "react-native";

const RecurringStyles = StyleSheet.create({
    Dropdown: {
        width:120
    },

    DropdownList: {
        fontFamily:fonts.light,
        fontSize:14
    },

    DropdownSelected: {
        fontFamily:fonts.light,
        fontSize:14
    },

    RecurringContentWrapper: {
        marginLeft:24,
        marginRight:24,
        marginTop:24,
        gap:8,
        minHeight:'100%',
        paddingBottom:16
    },

    RecurringItem: {
        borderColor:colors.light.primaryLight,
        borderWidth:1,
        borderRadius:8,
        backgroundColor:colors.light.primaryLight,
        overflow:'hidden',   
        padding:16,
        gap:16,
    },

    RecurrintItemPressable: {   
        gap:16,
    },

    BadgeNameArrow: {
        width:'100%',
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center'
    },

    BadgeName: {
        gap:8,
        flexDirection:'row'
    },

    Badge: {
        width:24,
        height:24,
        borderRadius:12,
    },

    NameText: {
        fontFamily:fonts.regular,
        fontSize:16,
    },

    TagsWrapper: {
        gap:8,
        flexDirection:'row'
    },

    Tag: {
        paddingLeft:16,
        paddingRight:16,
        paddingTop:6,
        paddingBottom:6,
        borderRadius:8,
        alignItems:'center'
    },

    TagAccountText: {
        fontFamily:fonts.medium,
        color:colors.light.white,
    },

    TagFrequencyText: {
        fontFamily:fonts.medium,
        color:'black'
    },

    ExecutionText: {
        fontFamily:fonts.light,
        fontSize:12,
        color:colors.light.accent
    },

    AmountText: {
        fontFamily:fonts.semiBold,
        fontSize:16
    },

    EditButton: {
        width:'100%',
        borderRadius:8,
        backgroundColor:colors.light.primary,
        paddingTop:12,
        paddingBottom:12
    },

    EditButtonText: {
        fontFamily:fonts.semiBold,
        fontSize: 14,
        color:colors.light.white,
        textAlign:'center'
    }
})

export default RecurringStyles