import { View, Text, Switch } from 'react-native';

// icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// styles
import { styles } from './styles';

// // assets
// import logo from '../../assets/logo.png';

// store
import { useStatusStore } from '../../store/statusMarket';

// utils
import { hp } from 'app/utils/adjustments';

export default function Header() {
  const increaseStatus = useStatusStore(state => state);
  const statusMarket = increaseStatus.statusMarket == 1;

  return (
    <View style={styles.headerContainer}>
      <View style={styles.viewLeft}>
        {/* <Image source={logo} style={styles.logoHeader}></Image> */}
        <Icon name='soccer' size={hp(25)} color={'#000'}></Icon>
        <Text style={styles.textHeader}>CartóBa</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text>Mercado: </Text>
        <Switch
          trackColor={{false: '#d50000', true: '#7ce604'}}
          //thumbColor={statusMarket ? '#568203' : '#df2c14'}
          thumbColor={'rgba(0, 0, 0, 0.7)'}
          // ios_backgroundColor="#3e3e3e"
          //onValueChange={toggleSwitch}
          value={statusMarket}
          disabled
        />
      </View>
    </View>
  )
}