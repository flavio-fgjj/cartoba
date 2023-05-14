import { useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// components
import Loader from '@components/Loader';

// hooks
import useGetData from '@services/hooks/useGetData';

// model
import { League } from 'app/model/league/League';
import { ConvertedLeague } from 'app/model/league/ConvertedLeague';
import Leagues from '@components/League/League';
import { Text } from 'react-native';

const Tab = createMaterialTopTabNavigator();

export default function Players() {
	const { getAthletes, getScoredAthletes } = useGetData();

	const [loading, setLoading] = useState(true);

	const callGetData = async () => {
		const athletesResponse = await getAthletes();
		const scoredAthletesResponse = await getScoredAthletes();

    if (!athletesResponse.error && !scoredAthletesResponse.error) {
			setLoading(false);
    }
  };

	useEffect(()=> {
    callGetData();
  }, []);
	
	if (loading) {
    return <Loader />
  }

	const Mercado = () => {
		return (<Text>Mercado</Text>)
	}

	const Parciais = () => {
		return (<Text>Parciais</Text>)
	}

	return (

		<Tab.Navigator>
      <Tab.Screen 
				name="Mercado" 
				// component={()=><Leagues leagueType='Ligas Clássicas' leagues={classicLeagues} />} 
				component={Mercado}

			/>
      <Tab.Screen 
				name="Parciais" 
				component={Parciais}
				//component={()=><Leagues leagueType='Ligas Cartola' leagues={cartolaLeagues} />} 
			/>
    </Tab.Navigator>
	);
}