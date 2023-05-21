import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// components
import Loader from '@components/Loader';
import Leagues from '@components/League/League';
import Market from '@components/Market';

// hooks
import useGetData from '@services/hooks/useGetData';

// model
import { League } from 'app/model/league/League';
import { ConvertedLeague } from 'app/model/league/ConvertedLeague';

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
	
	const Parciais = () => {
		return (<Text>Parciais</Text>)
	}

	return (

		<Tab.Navigator>
      <Tab.Screen 
				name="Mercado" 
				// component={()=><Leagues leagueType='Ligas Clássicas' leagues={classicLeagues} />} 
				component={Market}

			/>
      <Tab.Screen 
				name="Parciais" 
				component={Parciais}
				//component={()=><Leagues leagueType='Ligas Cartola' leagues={cartolaLeagues} />} 
			/>
    </Tab.Navigator>
	);
}