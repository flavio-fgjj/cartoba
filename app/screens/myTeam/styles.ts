import {StyleSheet} from 'react-native';

import { adjust, hp, wp } from 'app/utils/adjustments';

export const styles = StyleSheet.create({
  viewScroll: {
    flex: 1, 
    marginBottom: hp(60)
  },
  values: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginBottom: 10
  },
  viewTeamPrice: {
    alignItems: 'center'
  },
  viewStillHave: {
    alignItems: 'center', 
    marginLeft: 30 
  },
  text: {
    textTransform: 'uppercase', 
    fontSize: adjust(12)
  },
  priceCurrency: {
    fontSize: adjust(18),
    fontWeight: 'normal'
  },
  price: {
    fontSize: adjust(18),
    fontWeight: 'bold'
  }, 
  separator: {
    width: wp(40), 
    marginTop: -5, 
    textAlign: 'center'
  }
});