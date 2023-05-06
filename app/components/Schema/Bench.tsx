import { View } from 'react-native';

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
		<View style={styles.lineBench}>
			<Player athlete={goalkeeper} capId={0} />
			<Player athlete={side} capId={0} />
			<Player athlete={back} capId={0} />
			<Player athlete={middle} capId={0} />
			<Player athlete={forward} capId={0} />
		</View>
	);
}