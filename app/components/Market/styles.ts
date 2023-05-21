import {StyleSheet} from 'react-native';

// utils
import { adjust, hp, wp } from 'app/utils/adjustments';

export const styles = StyleSheet.create({
	container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
	shield: {
		borderRadius: adjust(40 / 2),
		width: wp(28.89), 
		height: hp(40),
		resizeMode: 'contain',
		backgroundColor: '#fff'
	},
	photo: {
		width: wp(35), 
		height: hp(50),
		resizeMode: 'contain',
		backgroundColor: '#fff'
	},
	pontos: {
		color: '#26ca5e', 
		fontSize: 20
	},
	price: {
		color: '#a0a0a0',
		fontSize: 15, 
		textAlign: 'right'
	}
});