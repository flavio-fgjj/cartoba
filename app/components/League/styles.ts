import { StyleSheet } from "react-native";

import { adjust, hp, wp } from "app/utils/adjustments";

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
    flexDirection: 'row',
    alignContent: 'center',
    padding: 20,

    backgroundColor: '#F6F6F6',
		paddingLeft: 16,
    paddingRight: 16,
		borderRadius: 6,

		// Android
		elevation: 4,

		// iOS
		shadowColor: '#000',
		shadowOffset: {
				width: wp(2),
				height: hp(2),
		},
		shadowOpacity: 0.23,
		shadowRadius: 2.62,
  },
  itemText: {
    fontSize: adjust(16),
    fontWeight: '500',
    paddingTop: 2,
    paddingLeft: 10
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
  },
  banderole: {
    width: wp(30), 
    height: hp(48),
    resizeMode: 'cover',
  },
  team: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,

    backgroundColor: '#F6F6F6',
		paddingLeft: 16,
    paddingRight: 16,
  },
  teamNameView: {
    paddingLeft: 16
  }, 
  teamNameText: {
    fontSize: adjust(12),
    fontWeight: 'bold'
  }, 
  teamOwnerText: {
    fontSize: adjust(10),
    fontWeight: 'normal'
  },
  shield: {
    width: wp(25), 
    height: hp(30),
    resizeMode: 'contain',
  },
  titlePoints: {
    fontSize: adjust(9),
    fontWeight: 'bold'
  }, 
  points: {
    fontSize: adjust(11),
    fontWeight: 'bold'
  },
  shieldHighlight: {
    width: wp(35), 
    height: hp(40),
    resizeMode: 'contain',
  },
});