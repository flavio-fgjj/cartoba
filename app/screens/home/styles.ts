import {StyleSheet} from 'react-native';
import {colors} from '../../colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
  },
  title: {
    fontWeight: 'bold',

    fontSize: 20,
    textAlign: 'center',
  },
  coffText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  shield: {
    width: 66,
    height: 80,
  },
  photo: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  logoImg: {
    marginLeft: 5
  }, 
  badge: {
    position: 'absolute', 
    right: -15, 
    top: 50,
    backgroundColor: '#fff', 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderRadius: 50,
    width: 30, 
    height: 30
  },
  box: {
    width: '80%',
    height: 80,
    backgroundColor: '#F6F6F6',
		marginVertical: 8,
		marginHorizontal: 16,
		borderRadius: 6,

		flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',

		// Android
		elevation: 4,

		// iOS
		shadowColor: '#000',
		shadowOffset: {
				width: 0,
				height: 2,
		},
		shadowOpacity: 0.23,
		shadowRadius: 2.62,

    marginTop: 20,
    padding: 20
  },
  boxColumn: {
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  boxText: {
    fontSize: 10,
    color: '#999',
    textTransform: 'uppercase'
  },
  boxTextBold: {
    fontSize: 18,
    color: '#333'
  }, 
  market: {
    display: 'flex', 
    justifyContent: 'center',
    alignItems: 'center'
  }, 
  closeMarket: {
    color: '#333',
    fontSize: 44,
    fontWeight: 'bold', 
  }
});