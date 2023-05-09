import { useEffect, useState } from 'react';

// styles
import { styles } from './styles';

// components
import Accordian from '@components/Accordian/Accordion';
import Loader from '@components/Loader';

// hooks
import useGetData from '@services/hooks/useGetData';

// model
import { League } from 'app/model/league/League';

export default function MyLeagues() {
	const { getLeagues } = useGetData();

	const [loading, setLoading] = useState(true);

	const [leagues, setLeagues] = useState<Array<League>>(new Array<League>());

	const callGetData = async () => {
		const leaguesResponse = await getLeagues();

    if (!leaguesResponse.error) {
			console.log(leaguesResponse.ligas[0])
			setLeagues(leaguesResponse);
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
		<Accordian />
	);
}