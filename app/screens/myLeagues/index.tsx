import { useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// styles
import { styles } from './styles';

// components
import Loader from '@components/Loader';

// hooks
import useGetData from '@services/hooks/useGetData';

// model
import { League } from 'app/model/league/League';
import { ConvertedLeague } from 'app/model/league/ConvertedLeague';
import Leagues from '@components/League/League';

const Tab = createMaterialTopTabNavigator();

export default function MyLeagues() {
	const { getLeagues } = useGetData();

	const [loading, setLoading] = useState(true);

	const [classicLeagues, setClassicLeagues] = useState<Array<ConvertedLeague>>(new Array<ConvertedLeague>());
	const [cartolaLeagues, setCartolaLeagues] = useState<Array<ConvertedLeague>>(new Array<ConvertedLeague>());

	const callGetData = async () => {
		const leaguesResponse = await getLeagues();

    if (!leaguesResponse.error) {
			setClassicLeagues(leaguesResponse
				.ligas?.filter((league: League) => league.time_dono_id != null)
				.map((league: League, key: number) => {
					return {generatedId: key, isExpandable: false, ...league}
				}))

			setCartolaLeagues(leaguesResponse
				.ligas?.filter((league: League) => league.time_dono_id == null)
				.map((league: League, key: number) => {
					return {generatedId: key, isExpanded: false, ...league}
				}))
			setLoading(false);
    }
  };

	useEffect(()=> {
    callGetData();
  }, []);
	
	if (loading) {
    return <Loader />
  }

	const LeaguesClassic = () => {
		return (<Leagues leagueType='Ligas Clássicas' leagues={classicLeagues} />)
	}

	const LeaguesCartola = () => {
		return (<Leagues leagueType='Ligas Cartola' leagues={cartolaLeagues} />)
	}

	return (

		<Tab.Navigator>
      <Tab.Screen 
				name="Ligas Clássicas" 
				// component={()=><Leagues leagueType='Ligas Clássicas' leagues={classicLeagues} />} 
				component={LeaguesClassic}

			/>
      <Tab.Screen 
				name="Ligas Cartola" 
				component={LeaguesCartola}
				//component={()=><Leagues leagueType='Ligas Cartola' leagues={cartolaLeagues} />} 
			/>
    </Tab.Navigator>
	);
}