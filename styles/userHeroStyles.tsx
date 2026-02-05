import fonts from "@/constants/fonts";
import { StyleSheet } from "react-native";

const UserHeroStyles = StyleSheet.create({
    container : {
        flexDirection:'column',
        marginTop:48,
        gap:24,
        alignItems:'center'
    },

    profileImage : {
        height:96,
        width:96,
        borderRadius:48
    },

    userNameEmailContainer : {
        gap:8,
        alignItems:'center'
    },

    userName : {
        fontFamily:fonts.semiBold,
        fontSize:28,
        lineHeight:32
    },

    email : {
        fontFamily:fonts.light,
        fontSize:12,
        lineHeight:16
    }
})

export default UserHeroStyles