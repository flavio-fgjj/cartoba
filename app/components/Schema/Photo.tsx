import { Image } from 'react-native';

// style
import {styles} from './styles';

// model
import { Atleta } from 'app/model/Atleta';

// icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// utils
import { hp } from 'app/utils/adjustments';

interface Props {
	player: Atleta, 
  hasBench: boolean
}

export default function Photo(props: Props) {

	return (
    props.hasBench
		? <Image source={{uri: props.player?.foto.toString().replace("FORMATO", "220x220")}} style={styles.player}/>
    : props.player && <Icon name="plus" size={hp(35)} />
	);
}