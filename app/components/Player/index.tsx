import {View, Image, Text} from 'react-native';

// style
import {styles} from './styles';

// model
import { Atleta } from 'app/model/Atleta';

interface Props {
	athlete: Atleta, 
	capId: number
}

export default function Player(props: Props) {
	const player: Atleta = props?.athlete;
	const cap: number = props?.capId;

	console.log(player)

	return (
		<>
			{player.atleta_id
				? <View style={styles.viewPlayer}>
						<Text style={styles.playerPrice}>C${player?.preco_num}</Text>
						<Image source={{uri: player?.foto.toString().replace("FORMATO", "220x220")}} style={player.posicao_id === 6 ? styles.coach : styles.player}/>

						{
							cap == player.atleta_id 
								? <View style={styles.cap}>
										<Text style={{color: '#fff', fontWeight: 'bold'}}>C</Text>
									</View>
								: <></>
						}
						<Text style={styles.playerName}>{player?.apelido_abreviado}</Text>
					</View>
				: <></>
			}
		</>
	);
}