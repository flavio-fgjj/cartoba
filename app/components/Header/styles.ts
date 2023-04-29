import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center', 
		width: '100%'
	},
	logoHeader: {
		width: 20,
		height: 38
	},
	textHeader: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold', 
		paddingLeft: 20
	},
	viewLeft: {
		flexDirection: 'row',
		alignItems: 'center', 
	}
});