import { View, Image } from 'react-native';

// style
import {styles} from './styles';

// assets
import campinho from '../../assets/campinho-sem-borda.png';

// model
import { Atleta } from 'app/model/Atleta';

// components
import Player from '@components/Player';

// store
import { Team } from 'app/model/team/Team';

interface Props {
	team: Team
}

export default function Schema_4(props: Props) {
	const team: Team = props?.team;

	const goalkeeper: Atleta = props?.team.atletas.filter((atleta: Atleta) => atleta.posicao_id == 1)[0];
	
	const side1: Atleta = props?.team.atletas.filter((atleta: Atleta) => atleta.posicao_id == 2)[0];
	const side2: Atleta = props?.team.atletas.filter((atleta: Atleta) => atleta.posicao_id == 2)[1];
	
	const back1: Atleta = props?.team.atletas.filter((atleta: Atleta) => atleta.posicao_id == 3)[0];
	const back2: Atleta = props?.team.atletas.filter((atleta: Atleta) => atleta.posicao_id == 3)[1];
	
	const middle1: Atleta = props?.team.atletas.filter((atleta: Atleta) => atleta.posicao_id == 4)[0];
	const middle2: Atleta = props?.team.atletas.filter((atleta: Atleta) => atleta.posicao_id == 4)[1];
	const middle3: Atleta = props?.team.atletas.filter((atleta: Atleta) => atleta.posicao_id == 4)[2];
	const middle4: Atleta = props?.team.atletas.filter((atleta: Atleta) => atleta.posicao_id == 4)[3];
	
	const forward1: Atleta = props?.team.atletas.filter((atleta: Atleta) => atleta.posicao_id == 5)[0];
	const forward2: Atleta = props?.team.atletas.filter((atleta: Atleta) => atleta.posicao_id == 5)[1];
	
	const coach: Atleta = props?.team.atletas.filter((atleta: Atleta) => atleta.posicao_id == 6)[0];

	return (
		<View style={styles.team}>
		<Image source={campinho} style={styles.backgroundImg}/>
		<View style={styles.lineForward}>
			<Player athlete={forward1} capId={team.capitao_id} />
			<Player athlete={forward2} capId={team.capitao_id} />
		</View>
		<View style={styles.lineMiddle}>
			<Player athlete={middle1} capId={team.capitao_id} />
			<Player athlete={middle2} capId={team.capitao_id} />
			<Player athlete={middle3} capId={team.capitao_id} />
			<Player athlete={middle4} capId={team.capitao_id} />
		</View>
		<View style={styles.lineBack}>
			<Player athlete={side1} capId={team.capitao_id} />
			<Player athlete={back1} capId={team.capitao_id} />
			<Player athlete={back2} capId={team.capitao_id} />
			<Player athlete={side2} capId={team.capitao_id} />
		</View> 
		<View style={styles.lineGoalkeeper}>
		<View style={styles.lineGoalkeeper}>
			<View style={styles.viewCoach}>
				<Player athlete={coach} capId={team.capitao_id} />
			</View>
			<View style={styles.viewGoalkeeper}>
				<Player athlete={goalkeeper} capId={team.capitao_id} />
			</View>
		</View>
		</View>
	</View>

	);
}