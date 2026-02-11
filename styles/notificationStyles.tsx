import colors from "@/constants/colors";
import fonts from "@/constants/fonts";
import { StyleSheet } from "react-native";

const NotificationStyles = StyleSheet.create({
    NotifcationWrapper : {
        position:'absolute',
        top:16,
        height:48,
        width:'90%',
        alignSelf:'center',
        alignItems:'center',
        // justifyContent:'baseline',
        borderRadius: 8,
        zIndex: 999,
        elevation: 5,
        flexDirection:'row',
        paddingLeft:16
    },

    NotificationText : {
        fontFamily:fonts.regular,
        fontSize:16,
        lineHeight:16,
        color:colors.light.white
    },

    success : {
        backgroundColor:'#2E7D32'
    },

    error: {
        backgroundColor: '#C62828',
    },
    info: {
        backgroundColor: '#1565C0',
    },
})

export default NotificationStyles