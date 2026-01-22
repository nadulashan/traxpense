import { StyleSheet } from "react-native";
import colors from '../constants/colors';
import fonts from '../constants/fonts';

const universal = StyleSheet.create({
    screenWrapper: {
        marginLeft:24,
        marginRight:24,
        marginTop:24,
    },

    sectionHeader: {
        fontFamily:fonts.medium,
        fontSize:20,
        color:colors.light.primary,
        marginTop:24,
        marginBottom:24
    }
})


export default universal