import { StyleSheet } from "react-native";
import colors from '../constants/colors';
import fonts from '../constants/fonts';

const userStyles = StyleSheet.create({
     image: {
        width: 44,
        height: 44,
        borderRadius: 22,
    },

  text: {
        fontSize: 20,
        color: colors.light.primary,
        fontFamily: fonts.semiBold
    },

  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  leftView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24
  },

  rightView: {
    alignItems: 'center',
  },
})


export default userStyles