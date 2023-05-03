import {StyleSheet} from 'react-native';
import { Dimensions } from 'react-native';

// utils
import { wp, hp } from '../../utils/adjustments';

export const styles = StyleSheet.create({
  team: {
    flex: 1,
    position: 'absolute',
    height: hp(500),
    width: Dimensions.get('window').width,
    paddingHorizontal: 10,
  },
  backgroundImg: {
    width: Dimensions.get('window').width,
    resizeMode: 'contain',
    height: hp(500),
   
    position: 'absolute',
  }, 
  lineForward: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row', 
    marginTop: hp(20)
  },
  lineMiddle: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row', 
    marginTop: hp(80)
  },
  lineBack: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row', 
    marginTop: hp(60)
  },
  player: {
    borderRadius: 50,
    width: wp(58.89), 
    height: hp(58.89)
  },
  lineGoalkeeper: {
    flex: 1,
    flexDirection: 'row', 
    marginTop: hp(30)
  },
  coach: {
    borderRadius: 50,
    width: wp(58.89), 
    height: hp(58.89),
  },
  goalkeeper: {
    borderRadius: 50,
    width: wp(58.89), 
    height: hp(58.89),
  }
});