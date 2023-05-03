import {StyleSheet, Platform} from 'react-native';

export const styles = StyleSheet.create({
	styleTabBar: {
		position: 'absolute',
		backgroundColor: '#ff7b0d',
		borderTopWidth: 0,

		bottom: Platform.OS === 'android' ? 14 : 28,
		left: 14,
		right: 14,
		elevation:0,
		borderRadius: 4,
		height: 40,
		paddingBottom: 0, // Apenas no iOS para zerar o padding do IOS
	},
	stylesHeader: {
		backgroundColor: '#ff7b0d',
		height: 40, 
		opacity: 0.8
	}
});