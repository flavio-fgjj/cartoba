import {StyleSheet} from 'react-native';

// utils
import { adjust,hp,wp } from 'app/utils/adjustments';
import { colors } from 'app/colors';

export const styles = StyleSheet.create({
	headerHomeContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center', 
		width: '100%'
	},
	logoHeaderHome: {
		width: wp(20),
		height: hp(38)
	},
	textHeaderHome: {
		color: '#fff',
		fontSize: adjust(18),
		fontWeight: 'bold', 
		paddingLeft: 5
	},
	viewLeft: {
		flexDirection: 'row',
		alignItems: 'center', 
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: colors.primary,
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: wp(0),
			height: hp(2),
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
});