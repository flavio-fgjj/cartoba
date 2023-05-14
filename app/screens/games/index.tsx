import { useEffect, useState } from 'react';
import {View, Text} from 'react-native';

// style
import {styles} from './styles';

// components
import Loader from '@components/Loader';

// hooks
import useGetData from '@services/hooks/useGetData';

export default function Games() {
	const { getGames, getStatusMarket } = useGetData();
	const [loading, setLoading] = useState(true);

	const callGetData = async () => {
    const statusMarketResponse = await getStatusMarket();
    
    if (!statusMarketResponse.error) {
      const teamResponse = await getGames(statusMarketResponse.rodada_atual.toString());

			if (!teamResponse.error) {

				//console.log(teamResponse)
				setLoading(false);
			}


    }
  };

	useEffect(()=> {
    callGetData();
  }, []);

  if (loading) {
    return <Loader />
  }


	return (
		<View style={styles.container}>
			<Text>Times</Text>
		</View>
	);
}