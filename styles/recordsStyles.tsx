import colors from "@/constants/colors";
import fonts from "@/constants/fonts";
import { StyleSheet } from "react-native";

const RecordStyles = StyleSheet.create({

    // Date List
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


    // Floating Button
    FloatingButton: {
        height:56,
        width:56,
        borderRadius:28
    },

    // Creation Menu
    MenuSheetWrapper: {
        flexDirection:'column',
        gap:16,
        padding:16
    },

    MenuAddItemWrapper: {
        flexDirection:'row',
        gap:16,
    },

    MenuAddItem: {
        flex:1,
        height:50,
        borderWidth:1,
        borderColor:colors.light.primary,
        borderRadius:8,
        justifyContent:'center'
    },

    MenuCreateJournal: {
        backgroundColor:colors.light.primary,
        borderRadius:8,
        flex:1,
        height:50,        
        justifyContent:'center'
    },

    MenuText: {
        fontFamily:fonts.medium,
        fontSize:14,
        color:colors.light.primary,
        textAlign:'center',
    },

    MenuJournalText: {
        color:colors.light.white
    },


    // Add Income/Expense
    AddItemWrapper: {
        width:'100%',
        flexDirection:'column',
        gap:16
    },

    AddItemAmountAccountWrapper: {
        flexDirection:'row',
        gap:16
    },

    AddItemSelect: {
        flex:1,
        backgroundColor:colors.light.primaryLight,
        borderRadius:8,
        fontSize:16,
        height:50,
        justifyContent:'center',
    },

    AddItemSelectAmountWrapper: {
        flex:3,
    },

    AddItemSelectAmount: {
        fontSize:14
    },

    AddItemSelectAccount: {
        flex:2
    },  

    AddItemSelectText: {
        fontFamily:fonts.regular,
        fontSize:14,
        paddingLeft:4,
        color:'grey'
    },

    CategoryElementWrapper: {
        padding:8,
        gap:8
    },

    CategoryElement: {
        width:'100%',
        padding:8,
        borderRadius:8,
        backgroundColor:colors.light.primaryLight,
        flexDirection:'row',
        gap:8,
        alignItems:'center',
        overflow:'hidden'
    },

    CategoryElementText: {
        fontSize:14,
        fontFamily:fonts.regular,
    },

    // Record Details
    RecordDetailsWrapper: {
        gap:16,
    },

    DateText: {
        paddingTop:4,
        fontFamily:fonts.light,
        fontSize:20,
    },

    TypeWrapper: {
        minHeight:128
    },

    TypeText: {
        fontFamily:fonts.semiBold,
        fontSize:24
    },

    TypeItemsWrapper: {
        gap:8,
        marginRight:16
    },

    TypeItem:{
        flexDirection:'row',
        justifyContent:'space-between'
    },

    TypeItemBadgeName: {
        flexDirection:'row',
        alignItems:'center',
        gap:8
    },

    TypeItemBadge: {
        height:16,
        width:16,
        borderRadius:8,
    },

    TypeItemText: {
        fontFamily:fonts.regular,
        fontSize:14,
        justifyContent:'center',
    },
})

export default RecordStyles