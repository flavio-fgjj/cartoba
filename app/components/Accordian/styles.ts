import { StyleSheet } from "react-native";

import { adjust, hp } from "app/utils/adjustments";
import { colors } from "app/colors";

export const styles = StyleSheet.create({
	container: {
    flex: 1
  },
  header: {
    flexDirection: 'row', 
    padding: 10
  },
  titleText: {
    flex: 1,
    fontSize: adjust(22),
    fontWeight: 'bold'
  },
  headerButton: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: adjust(18)
  },
  item: {
    backgroundColor: colors.primary, 
    padding: 20
  },
  itemText: {
    fontSize: adjust(16),
    fontWeight: '500'
  },
  content: {
    paddingLeft: 10, 
    paddingRight: 10,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: adjust(16),
  },
  separator: {
    height: hp(0.5),
    backgroundColor: '#c8c8c8',
    width: '100%'
  }
});