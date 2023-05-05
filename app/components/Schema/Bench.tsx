import { useEffect, useState } from 'react';
import { View } from 'react-native';

// style
import {styles} from './styles';


// model
import { Atleta } from 'app/model/Atleta';
import { MyTeam } from 'app/model/myTeam/MyTeam';

// components
import Loader from '@components/Loader';
import Player from '@components/Player';

interface Props {
	team: MyTeam
}

export default function Bench(props: Props) {
	const [loading, setLoading] = useState(true);

	const [goalkeeper, setGoalkeeper] = useState<Atleta>(new Atleta());
	const [side, setSide] = useState<Atleta>(new Atleta());
	const [back, setBack] = useState<Atleta>(new Atleta());
	const [middle, setMiddle] = useState<Atleta>(new Atleta());
	const [forward, setForward] = useState<Atleta>(new Atleta());
	
	const callGetData = async () => {
    setGoalkeeper(props?.team.reservas.filter((bench: Atleta) => bench.posicao_id == 1)[0] ?? {});
		setSide(props?.team.reservas.filter((bench: Atleta) => bench.posicao_id == 2)[0] ?? {});
		setBack(props?.team.reservas.filter((bench: Atleta) => bench.posicao_id == 3)[0] ?? {});
		setMiddle(props?.team.reservas.filter((bench: Atleta) => bench.posicao_id == 4)[0] ?? {});
		setForward(props?.team.reservas.filter((bench: Atleta) => bench.posicao_id == 5)[0] ?? {});

		setLoading(false);
  };

	useEffect(()=> {
    callGetData();
  }, []);

	if (loading) {
    return <Loader />
  }

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