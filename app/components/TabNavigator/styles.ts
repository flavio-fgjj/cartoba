import { StyleSheet, Platform } from 'react-native';

import { colors } from 'app/colors';

// utils
import { hp } from 'app/utils/adjustments';

export const styles = StyleSheet.create({
	styleTabBar: {
		position: 'absolute',
		backgroundColor: colors.primary,
		borderTopWidth: 0,

		bottom: Platform.OS === 'android' ? 14 : 28,
		left: 14,
		right: 14,
		elevation:0,
		borderRadius: 4,
		height: hp(40),
		paddingBottom: 0, // Apenas no iOS para zerar o padding do IOS
	},
	stylesHeader: {
		//backgroundColor: '#ff7b0d',
		backgroundColor: colors.primary,
		height: hp(40), 
		
	}
});