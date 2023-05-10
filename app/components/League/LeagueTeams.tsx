import { useState, useEffect } from 'react';
import {
  View, Text, FlatList
} from 'react-native';

// styles
import { styles } from './styles';

// model
import { Time } from 'app/model/Time';

// hooks
import useGetData from '@services/hooks/useGetData';

// components
import Loader from '@components/Loader';

interface Props {
	slug: string
}

const LeagueTeams = (props: Props) => {
  const { getLeagueTeams } = useGetData();

  const [teams, setTeams] = useState<Array<Time>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const callGetData = async () => {
    const teamsResponse = await getLeagueTeams(props.slug);
    
    if (!teamsResponse.error) {
      console.log(teamsResponse)
      setTeams(teamsResponse.times);
      setLoading(false);
    }
  };

  useEffect(()=> {
    callGetData();
  }, []);

  if (loading) {
    return <Loader />
  }

  //const listDataSource: Array<Time> = [...props.leagueTeams];

  const ItemInsideExpandable = ({item}: any) => {
    
    return (
      <View key={item.time_id} style={styles.content}>
        <Text style={styles.text}>{item.time_id}. {item.nome}</Text>
        <View style={styles.separator} />
      </View>
    )
  }

  return (
    <FlatList
      data={teams}
      keyExtractor={({ slug }) => slug}
      renderItem={({ item }) => <ItemInsideExpandable item={item} key={item.time_id} />}  
    />
  )
}

export default LeagueTeams;