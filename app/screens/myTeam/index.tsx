import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

// hooks
import useGetData from '@services/hooks/useGetData';

// components
import Loader from '@components/Loader';
import Schema_1 from '@components/Schema/Schema_1';
import Schema_2 from '@components/Schema/Schema_2';
import Schema_3 from '@components/Schema/Schema_3';
import Schema_4 from '@components/Schema/Schema_4';
import Schema_5 from '@components/Schema/Schema_5';
import Schema_6 from '@components/Schema/Schema_6';
import Schema_7 from '@components/Schema/Schema_7';
import Bench from '@components/Schema/Bench';

// store
import { useUserStore } from '@store/user';

// model
import { User } from 'app/model/User';
import { Atleta } from 'app/model/Atleta';
import { Team } from 'app/model/team/Team';

//styles
import { styles } from './styles';

// icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// utils
import { hp } from 'app/utils/adjustments';

export default function MyTeamScreen() {
	const { getTeam } = useGetData();

	const user: User = useUserStore(state => state.user);

	const [loading, setLoading] = useState(true);

	const [team, setTeam] = useState<Team>(new Team());

	const [teamPrice, setTeamPrice] = useState<number>(0);
	const [teamSchema, setTeamSchema] = useState<number>(0);
	
	const callGetData = async () => {
		const teamResponse = await getTeam();

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
			setTeamSchema(teamResponse.time.esquema_id);
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

	const viewSchema = (schema: number) => {
		switch (schema) {
			case 1:
				return <Schema_1 team={team} />
			case 2: 
				return <Schema_2 team={team} />
			case 3:
				return <Schema_3 team={team} />
			case 4: 
				return <Schema_4 team={team} />
			case 5: 
				return <Schema_5 team={team} />
			case 6: 
				return <Schema_6 team={team} />
			case 7: 
				return <Schema_7 team={team} />
		}
	}

	return (
		<ScrollView style={styles.viewScroll}>
			<View style={styles.viewType}>
				<Icon name='soccer-field' size={hp(30)} color={'#000'}></Icon>
				{/* <Icon name='clipboard-list-outline' size={28} color={'#000'}></Icon> */}
			</View>
			{
				team ? viewSchema(teamSchema) : <></>
			}
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