import {StyleSheet} from 'react-native';

// utils
import { wp } from 'app/utils/adjustments';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    justifyContent: 'center',
  },
  img: {
    width: wp(150),
  },
});
