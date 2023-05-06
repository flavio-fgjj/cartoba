import { View, Text, Image } from 'react-native';

// style
import {styles} from './styles';

// model
import { Atleta } from 'app/model/Atleta';
import { Team } from 'app/model/team/Team';

// components
import Player from '@components/Player';

interface Props {
	team: Team
}

export default function Bench(props: Props) {
	const goalkeeper: Atleta = props?.team.reservas.filter((bench: Atleta) => bench.posicao_id == 1)[0] ?? {};
	const side: Atleta = props?.team.reservas.filter((bench: Atleta) => bench.posicao_id == 2)[0] ?? {};
	const back: Atleta = props?.team.reservas.filter((bench: Atleta) => bench.posicao_id == 3)[0] ?? {};
	const middle: Atleta = props?.team.reservas.filter((bench: Atleta) => bench.posicao_id == 4)[0] ?? {};
	const forward: Atleta = props?.team.reservas.filter((bench: Atleta) => bench.posicao_id == 5)[0] ?? {};
	
	return (
		<View>
			<Text style={styles.benchTitle}>banco de reservas</Text>
			<View style={styles.lineBench}>

				<View style={styles.viewPlayer}>
					<Text style={styles.playerPrice}>{goalkeeper?.pontos_num > 0 ? goalkeeper?.pontos_num : '-'}</Text>
					<Image source={{uri: goalkeeper?.foto.toString().replace("FORMATO", "220x220")}} style={styles.player}/>
					<Text>{goalkeeper?.apelido_abreviado}</Text>
					<Text>GOL</Text>
				</View>

				{/* <Player athlete={goalkeeper} capId={0} /> */}

				<View style={styles.viewPlayer}>
					<Text style={styles.playerPrice}>{side?.pontos_num > 0 ? side?.pontos_num : '-'}</Text>
					<Image source={{uri: side?.foto.toString().replace("FORMATO", "220x220")}} style={styles.player}/>
					<Text>{side?.apelido_abreviado}</Text>
					<Text>GOL</Text>
				</View>
				{/* <Player athlete={side} capId={0} /> */}

				<View style={styles.viewPlayer}>
					<Text style={styles.playerPrice}>{back?.pontos_num > 0 ? back?.pontos_num : '-'}</Text>
					<Image source={{uri: back?.foto.toString().replace("FORMATO", "220x220")}} style={styles.player}/>
					<Text>{back?.apelido_abreviado}</Text>
					<Text>GOL</Text>
				</View>
				{/* <Player athlete={back} capId={0} /> */}

				<View style={styles.viewPlayer}>
					<Text style={styles.playerPrice}>{middle?.pontos_num > 0 ? middle?.pontos_num : '-'}</Text>
					<Image source={{uri: middle?.foto.toString().replace("FORMATO", "220x220")}} style={styles.player}/>
					<Text>{middle?.apelido_abreviado}</Text>
					<Text>GOL</Text>
				</View>
				{/* <Player athlete={middle} capId={0} /> */}

				<View style={styles.viewPlayer}>
					<Text style={styles.playerPrice}>{forward?.pontos_num > 0 ? forward?.pontos_num : '-'}</Text>
					<Image source={{uri: forward?.foto.toString().replace("FORMATO", "220x220")}} style={styles.player}/>
					<Text>{forward?.apelido_abreviado}</Text>
					<Text>GOL</Text>
				</View>
				{/* <Player athlete={forward} capId={0} /> */}
			</View>
		</View>
	);
}