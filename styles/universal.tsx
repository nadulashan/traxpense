import { StyleSheet } from "react-native";
import colors from '../constants/colors';
import fonts from '../constants/fonts';

const universal = StyleSheet.create({
    screenWrapper: {
        paddingLeft:24,
        paddingRight:24,
        // marginTop:24,
    },

    headerWrapper: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        // backgroundColor:'pink'
    },

    sectionHeader: {
        fontFamily:fonts.medium,
        fontSize:20,
        color:colors.light.primary,
        marginTop:24,
        marginBottom:24
    },


})


export default universal