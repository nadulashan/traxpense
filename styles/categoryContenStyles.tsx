import colors from "@/constants/colors";
import fonts from "@/constants/fonts";
import { StyleSheet } from "react-native";

const CategoryContentStyles = StyleSheet.create({
    CategoryItemWrapper:{
        flexDirection:'row',
        paddingRight:16,
        paddingLeft:16,
        backgroundColor:colors.light.primaryLight,
        borderRadius:8,
        justifyContent:'space-between',
        paddingTop:8,
        paddingBottom:8,
        marginBottom:8,
        alignItems:'center'
    },

    CategoryNameBadge:{
        gap:16,
        flexDirection:'row',
        alignItems:'center'
    },

    CategoryNameText:{
        fontSize:16,
        fontFamily:fonts.regular,
    }
})

export default CategoryContentStyles