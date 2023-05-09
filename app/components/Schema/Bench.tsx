import { View, Text, Image } from 'react-native';

// style
import {styles} from './styles';

// model
import { Atleta } from 'app/model/Atleta';
import { Team } from 'app/model/team/Team';

// icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// utils
import { hp } from 'app/utils/adjustments';

interface Props {
	team: Team
}

export default function Bench(props: Props) {
	const goalkeeper: Atleta = props?.team.reservas ? props?.team.reservas.filter((bench: Atleta) => bench.posicao_id == 1)[0] : new Atleta();
	const side: Atleta = props?.team.reservas ? props?.team.reservas.filter((bench: Atleta) => bench.posicao_id == 2)[0] : new Atleta();
	const back: Atleta = props?.team.reservas ? props?.team.reservas.filter((bench: Atleta) => bench.posicao_id == 3)[0] : new Atleta();
	const middle: Atleta = props?.team.reservas ? props?.team.reservas.filter((bench: Atleta) => bench.posicao_id == 4)[0] : new Atleta();
	const forward: Atleta = props?.team.reservas ? props?.team.reservas.filter((bench: Atleta) => bench.posicao_id == 5)[0] : new Atleta();
	
	const hasBench = props?.team.reservas ?? false;

	return (
		<View>
			<Text style={styles.benchTitle}>banco de reservas</Text>
			<View style={styles.lineBench}>

				<View style={styles.viewPlayer}>
					<Text style={styles.playerPrice}>{goalkeeper?.pontos_num > 0 ? goalkeeper?.pontos_num : '-'}</Text>
					{
						hasBench
						? <Image source={{uri: goalkeeper?.foto.toString().replace("FORMATO", "220x220")}} style={styles.player}/>
						: <Icon name="plus" size={hp(50)} />
					}
					<Text>{goalkeeper?.apelido_abreviado}</Text>
					<Text>GOL</Text>
				</View>

				<View style={styles.viewPlayer}>
					<Text style={styles.playerPrice}>{side?.pontos_num > 0 ? side?.pontos_num : '-'}</Text>
					{
						hasBench
						? <Image source={{uri: side?.foto.toString().replace("FORMATO", "220x220")}} style={styles.player}/>
						: <Icon name="plus" size={hp(50)} />
					}
					<Image source={{uri: side?.foto.toString().replace("FORMATO", "220x220")}} style={styles.player}/>
					<Text>{side?.apelido_abreviado}</Text>
					<Text>LAT</Text>
				</View>

				<View style={styles.viewPlayer}>
					<Text style={styles.playerPrice}>{back?.pontos_num > 0 ? back?.pontos_num : '-'}</Text>
					{
						hasBench
						? <Image source={{uri: back?.foto.toString().replace("FORMATO", "220x220")}} style={styles.player}/>
						: <Icon name="plus" size={hp(50)} />
					}
					<Text>{back?.apelido_abreviado}</Text>
					<Text>ZAG</Text>
				</View>

				<View style={styles.viewPlayer}>
					<Text style={styles.playerPrice}>{middle?.pontos_num > 0 ? middle?.pontos_num : '-'}</Text>
					{
						hasBench
						? <Image source={{uri: middle?.foto.toString().replace("FORMATO", "220x220")}} style={styles.player}/>
						: <Icon name="plus" size={hp(50)} />
					}
					<Text>{middle?.apelido_abreviado}</Text>
					<Text>MEI</Text>
				</View>

				<View style={styles.viewPlayer}>
					<Text style={styles.playerPrice}>{forward?.pontos_num > 0 ? forward?.pontos_num : '-'}</Text>
					{
						hasBench
						? <Image source={{uri: forward?.foto.toString().replace("FORMATO", "220x220")}} style={styles.player}/>
						: <Icon name="plus" size={hp(50)} />
					}
					<Text>{forward?.apelido_abreviado}</Text>
					<Text>ATA</Text>
				</View>
			</View>
		</View>
	);
}