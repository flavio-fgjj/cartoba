import {StyleSheet} from 'react-native';
import {colors} from '../../colors';
import { adjust, hp, wp } from 'app/utils/adjustments';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontWeight: 'bold',

    fontSize: 20,
    textAlign: 'center',
  },
  coffText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  shield: {
		borderRadius: adjust(40 / 2),
		width: wp(28.89), 
		height: hp(40),
		resizeMode: 'contain',
		backgroundColor: '#fff'
	}
});