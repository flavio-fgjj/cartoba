import { useState } from 'react';
import { View, Text, Image, Switch } from 'react-native';

// icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// styles
import { styles } from './styles';

// assets
import logo from '../../assets/logo.png';

// store
import { useStatusStore } from '../../store/statusMarket';

// utils
import { hp } from 'app/utils/adjustments';

export default function Header() {
const increaseStatus = useStatusStore(state => state.increaseStatus);
const statusMarket = increaseStatus.statusMarket == 1;

const [isEnabled, setIsEnabled] = useState(statusMarket);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.viewLeft}>
        {/* <Image source={logo} style={styles.logoHeader}></Image> */}
			<Icon name='soccer' size={hp(30)} color={'#fff'}></Icon>
        <Text style={styles.textHeader}>CartóBa</Text>
      </View>
				<Switch
					trackColor={{false: '#df2c14', true: '#7ce604'}}
					thumbColor={isEnabled ? '#7ce604' : '#df2c14'}
					ios_backgroundColor="#3e3e3e"
					onValueChange={toggleSwitch}
					value={isEnabled}
					disabled
				/>
    </View>
  )
}