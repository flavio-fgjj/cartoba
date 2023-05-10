import {StyleSheet} from 'react-native';

// utils
import { adjust,hp,wp } from 'app/utils/adjustments';

export const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center', 
		width: '100%'
	},
	logoHeader: {
		width: wp(20),
		height: hp(38)
	},
	textHeader: {
		color: '#000',
		fontSize: adjust(16),
		fontWeight: '400', 
		paddingLeft: 5
	},
	viewLeft: {
		flexDirection: 'row',
		alignItems: 'center', 
	}
});