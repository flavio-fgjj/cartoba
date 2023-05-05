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
    // alignContent: 'center',
    // alignItems: 'center',
    // justifyContent: 'center'
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
  lineBench: {
    width: wp(280),
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    flexDirection: 'row', 
    paddingBottom: 30
  },
});