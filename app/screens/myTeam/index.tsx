import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import {Dimensions} from 'react-native';

// hooks
import useGetData from '@services/hooks/useGetData';

// components
import Loader from '@components/Loader';
import Schema_3 from '@components/Schema/Schema_3';
import Bench from '@components/Schema/Bench';

// store
import { useUserStore } from '@store/user';

// model
import { User } from '../../model/User';
import { MyTeam } from 'app/model/myTeam/MyTeam';
import { Atleta } from '../../model/Atleta';
import { styles } from './styles';

export default function MyTeamScreen() {
	const { getMyTeam, getSchemas } = useGetData();

	const user: User = useUserStore(state => state.user);

	const [loading, setLoading] = useState(true);

	const [team, setTeam] = useState<MyTeam>(new MyTeam());
	const [teamPrice, setTeamPrice] = useState<number>(0);
	
	const windowHeight = Dimensions.get('window').height;

	const callGetData = async () => {
    const teamResponse = await getMyTeam(user.idTeam);
		//const schemaResponse = await getSchemas();    

    if (!teamResponse.error) {
			// const newTeamResponse = teamResponse
			// 	.atletas
			// 	.sort((a: Atleta, b: Atleta) => {
      //     const nameA = a.posicao_id
      //     const nameB = b.posicao_id
      //     if (nameA < nameB) {
      //       return -1;
      //     }
      //     if (nameA > nameB) {
      //       return 1;
      //     }

      //     return 0;
      //   })
			// 	.forEach((athlete: Atleta) => {
			// 		console.log(athlete);
			// 	})

			setTeamPrice(teamResponse.atletas.reduce((sum: number, item: Atleta) => sum += item.preco_num, 0));
			setTeam(teamResponse);
			setLoading(false);
    }
  };

	useEffect(()=> {
    callGetData();
  }, []);
	if (loading) {
    return <Loader />
  }

	return (
		<ScrollView style={styles.viewScroll}>
			{/* <View style={{width: '100%', paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'flex-end'}}>
				<Icon name='soccer-field' size={30} color={'#000'}></Icon>
				<Icon name='clipboard-list-outline' size={28} color={'#000'}></Icon>
			</View> */}

			<Schema_3 team={team} />
			<View style={styles.values}>
				<View style={styles.viewTeamPrice}>
					<Text style={styles.text}>preço do time</Text>
					<Text style={styles.priceCurrency}>C$ <Text style={styles.price}>{teamPrice.toFixed(2)}</Text></Text>
				</View>
				<View style={styles.viewStillHave}>
					<Text style={styles.text}>você ainda tem</Text>
					<Text style={styles.priceCurrency}>C$ <Text style={styles.price}>{(team.patrimonio - teamPrice).toFixed(2)}</Text></Text>
				</View>
			</View>
			
			<Bench team={team} />
		</ScrollView>
	);
}