import {StyleSheet} from 'react-native';
import { Dimensions } from 'react-native';

// constants
const windowHeight = Dimensions.get('window').height;

// utils
import { wp, hp, adjust } from '../../utils/adjustments';

export const styles = StyleSheet.create({
	player: {
		borderRadius: adjust(40 / 2),
		width: wp(28.89), 
		height: hp(40),
		resizeMode: 'contain',
		backgroundColor: '#fff'
	},
	coach: {
		borderRadius: adjust(40 / 2),
		width: wp(28.89), 
		height: hp(40),
		resizeMode: 'contain',
		backgroundColor: '#c3c3c3'
	},
	goalkeeper: {
		borderRadius: adjust(40 / 2),
		width: wp(28.89), 
		height: hp(40),
		resizeMode: 'contain',
		backgroundColor: '#fff'
	}, 
  viewPlayer: {
    alignItems: 'center',
    height: hp(70),
  },
  playerName: {
    backgroundColor: '#1c813e', 
    textAlign: 'center', 
    color: '#aaa', 
    marginTop: 3, 
    borderRadius: 4, 
    paddingHorizontal: 10, 
    overflow: 'hidden',
    fontSize: adjust(10)
  },
  playerPrice: {
    backgroundColor: '#fff', 
    textAlign: 'center', 
    color: '#000', 
    marginTop: 2, 
    borderRadius: 4, 
    overflow: 'hidden', 
    paddingHorizontal: 10, 
    marginBottom: 3,
    fontSize: adjust(10)
  },
	cap: {
    position: 'absolute', 
    left: windowHeight <= 480 ? 5 : 2, 
    top: windowHeight <= 480 ? 12 : 18,
    backgroundColor: '#ff7400', 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: windowHeight <= 480 ? adjust(30 / 2) : adjust(25 / 2),
    width: wp(20), 
    height: windowHeight <= 480 ? hp(30) : hp(25), 
    paddingHorizontal: 5
  },
  capText: {
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 11
  },
});