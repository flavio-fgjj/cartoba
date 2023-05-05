import { useEffect, useState } from 'react';
import {View, Image, Text} from 'react-native';
import {Dimensions} from 'react-native';

// style
import {styles} from './styles';

// assets
import campinho from '../../assets/campinho-sem-borda.png';

// model
import { Atleta } from 'app/model/Atleta';
import { User } from 'app/model/User';

// components
import Loader from '@components/Loader';
import Player from '@components/Player';

// store
import { useUserStore } from '@store/user';
import { MyTeam } from 'app/model/myTeam/MyTeam';

interface Props {
	team: MyTeam
}

export default function Schema_3(props: Props) {
	const [loading, setLoading] = useState(true);

	const [team, setTeam] = useState<MyTeam>(new MyTeam());

	const [goalkeeper, setGoalkeeper] = useState<Atleta>(new Atleta());
	const [coach, setCoach] = useState<Atleta>(new Atleta());
	
	const [side1, setSide1] = useState<Atleta>(new Atleta());
	const [side2, setSide2] = useState<Atleta>(new Atleta());

	const [back1, setBack1] = useState<Atleta>(new Atleta());
	const [back2, setBack2] = useState<Atleta>(new Atleta());

	const [middle1, setMiddle1] = useState<Atleta>(new Atleta());
	const [middle2, setMiddle2] = useState<Atleta>(new Atleta());
	const [middle3, setMiddle3] = useState<Atleta>(new Atleta());

	const [forward1, setForward1] = useState<Atleta>(new Atleta());
	const [forward2, setForward2] = useState<Atleta>(new Atleta());
	const [forward3, setForward3] = useState<Atleta>(new Atleta());

	const windowHeight = Dimensions.get('window').height;

	const callGetData = async () => {
		setTeam(props?.team);

		setCoach(props?.team.atletas.filter((atleta: Atleta) => atleta.posicao_id == 6)[0]);
		setGoalkeeper(props?.team.atletas.filter((atleta: Atleta) => atleta.posicao_id == 1)[0]);
		setSide1(props?.team.atletas.filter((atleta: Atleta) => atleta.posicao_id == 2)[0]);
		setSide2(props?.team.atletas.filter((atleta: Atleta) => atleta.posicao_id == 2)[1]);
		setBack1(props?.team.atletas.filter((atleta: Atleta) => atleta.posicao_id == 3)[0]);
		setBack2(props?.team.atletas.filter((atleta: Atleta) => atleta.posicao_id == 3)[1]);
		setMiddle1(props?.team.atletas.filter((atleta: Atleta) => atleta.posicao_id == 4)[0]);
		setMiddle2(props?.team.atletas.filter((atleta: Atleta) => atleta.posicao_id == 4)[1]);
		setMiddle3(props?.team.atletas.filter((atleta: Atleta) => atleta.posicao_id == 4)[2]);
		setForward1(props?.team.atletas.filter((atleta: Atleta) => atleta.posicao_id == 5)[0]);
		setForward2(props?.team.atletas.filter((atleta: Atleta) => atleta.posicao_id == 5)[1]);
		setForward3(props?.team.atletas.filter((atleta: Atleta) => atleta.posicao_id == 5)[2]);

		setLoading(false);
  };

	useEffect(()=> {
    callGetData();
  }, []);

	if (loading) {
    return <Loader />
  }

	return (
		<View style={styles.team}>
		<Image source={campinho} style={styles.backgroundImg}/>
		<View style={styles.lineForward}>
			<Player athlete={forward1} capId={team.capitao_id} />
			<Player athlete={forward2} capId={team.capitao_id} />
			<Player athlete={forward3} capId={team.capitao_id} />
		</View>
		<View style={styles.lineMiddle}>
			<Player athlete={middle1} capId={team.capitao_id} />
			<Player athlete={middle2} capId={team.capitao_id} />
			<Player athlete={middle3} capId={team.capitao_id} />
		</View>
		<View style={styles.lineBack}>
			<Player athlete={side1} capId={team.capitao_id} />
			<Player athlete={back1} capId={team.capitao_id} />
			<Player athlete={back2} capId={team.capitao_id} />
			<Player athlete={side2} capId={team.capitao_id} />
		</View> 
		<View style={styles.lineGoalkeeper}>
			<View style={{position: 'absolute', marginLeft: 10}}>
				<Player athlete={coach} capId={team.capitao_id} />
				{/* <View style={styles.viewPlayer}>
					<Text style={styles.playerPrice}>C${coach?.preco_num}</Text>
					<Image source={{uri: coach?.foto.toString().replace("FORMATO", "220x220")}} style={styles.coach}/>
					{
					team.capitao_id === coach.atleta_id
						? <View style={styles.cap}>
							<Text style={{color: '#fff', fontWeight: 'bold'}}>C</Text>
						</View>
						: <></>
				}
					<Text style={styles.playerName}>{coach?.apelido_abreviado}</Text>
				</View> */}
			</View>
			<View style={{width: '100%', alignItems: 'center', marginTop: windowHeight <= 480 ? -10 : 5}}>
				<Player athlete={goalkeeper} capId={team.capitao_id} />
				{/* <View style={styles.viewPlayer}>
					<Text style={styles.playerPrice}>C${goalkeeper?.preco_num}</Text>
					<Image source={{uri: goalkeeper?.foto.toString().replace("FORMATO", "220x220")}} style={styles.goalkeeper}/>
					{
						team.capitao_id === goalkeeper.atleta_id
							? <View style={styles.cap}>
								<Text style={{color: '#fff', fontWeight: 'bold'}}>C</Text>
							</View>
							: <></>
					}
					<Text style={styles.playerName}>{goalkeeper?.apelido_abreviado}</Text>
				</View> */}
			</View>
		</View>
	</View>

	);
}