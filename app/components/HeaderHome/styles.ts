import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
	headerHomeContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center', 
		width: '100%'
	},
	logoHeaderHome: {
		width: 20,
		height: 38
	},
	textHeaderHome: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold', 
		paddingLeft: 20
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
		backgroundColor: '#ff7b0d',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
				width: 0,
				height: 2,
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