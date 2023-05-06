import {StyleSheet} from 'react-native';
import { Dimensions } from 'react-native';

// constants
const windowHeight = Dimensions.get('window').height;

// utils
import { wp, hp, adjust } from '../../utils/adjustments';

export const styles = StyleSheet.create({
  team: {
    height: hp(450),
    width: wp(350),
    paddingHorizontal: 30,
    paddingVertical: 5
  },
  backgroundImg: {
    position: 'absolute',
    width: wp(350),
    resizeMode: 'stretch',
    height: hp(450),
  }, 
  lineForward: {
    width: wp(280),
    height: hp(100),
    justifyContent: 'space-around',
    alignSelf: 'center',
    flexDirection: 'row'
  },
  lineMiddle: {
    width: wp(300),
    height: hp(100),
    justifyContent: 'space-around',
    alignSelf: 'center',
    flexDirection: 'row'
  },
  lineBack: {
    width: wp(300),
    height: hp(100),
    justifyContent: 'space-around',
    alignSelf: 'center',
    flexDirection: 'row'
  },
  lineGoalkeeper: {
    width: wp(300),
    height: hp(100),
    padding: 20,
    flexDirection: 'row', 
    alignSelf: 'center'
  },
  viewCoach: {
    position: 'absolute', 
    marginLeft: 10
  },
  viewGoalkeeper: {
    width: '100%', 
    alignItems: 'center', 
    marginTop: windowHeight <= 480 ? -10 : 5
  },
  lineBench: {
    width: wp(280),
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    flexDirection: 'row', 
    paddingBottom: 30
  },
  benchTitle: {
    fontWeight: 'bold',
    fontSize: adjust(20),
    color: '#000',
    textAlign: 'center',
    textTransform: 'uppercase'
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
  player: {
		borderRadius: adjust(40 / 2),
		width: wp(28.89), 
		height: hp(40),
		resizeMode: 'contain',
		backgroundColor: '#fff'
	}
});