import { useEffect, useState, useRef } from 'react';
import { Text, View, FlatList, Pressable } from 'react-native';

// icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// hooks
import useGetData from '@services/hooks/useGetData';

// components
import Loader from '@components/Loader';
import Photo from '@components/Schema/Photo';

// model
import { Team } from 'app/model/team/Team';
import { Atleta } from 'app/model/Atleta';

//styles
import { styles } from './styles';

// utils
import { Positions } from 'app/utils/positions';
import { wp } from 'app/utils/adjustments';

interface Props {
  idTeam: number;
}

export default function TeamFromLeague(props: Props) {
  const viewRef = useRef<FlatList>(null);

	const { getMyTeam } = useGetData();

	const [loading, setLoading] = useState(true);

	const [team, setTeam] = useState<Team>(new Team());
  const [athletes, setAtheltes] = useState<Array<Atleta>>([]);
  const [bench, setBench] = useState<Array<Atleta>>([]);
  const [hasBench, setHasBench] = useState<boolean>(false);

	const callGetData = async () => {
		const teamResponse = await getMyTeam(props.idTeam.toString());

    if (!teamResponse.error) {
			setTeam(teamResponse);
      setAtheltes(teamResponse?.atletas)
      setBench(teamResponse?.reservas)
      setHasBench(teamResponse?.reservas)
			setLoading(false);
    }
  };

	useEffect(()=> {
    callGetData();
  }, []);
	
	if (loading) {
    return <Loader />
  }

  const ListComponent = ({item}: any) => {
    if (!item) {
      console.log(item)
      return <></>
    }

    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
        <View style={{flex: 3, flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{paddingRight: 10}}>{Positions[item.posicao_id].toString().substring(0, 3).toUpperCase()}</Text>
          <Photo player={item} hasBench={true} />
          <Text style={{paddingLeft: 10}}>{item.apelido_abreviado}</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Text>C${item.preco_num}</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Text>{item.pontos_num}</Text>
        </View>
      </View>
    )
  }

	return (
    <FlatList
      data={
        athletes.sort((a: Atleta, b: Atleta) => {
          if (a.posicao_id < b.posicao_id) {
            return -1;
          }
          if (a.posicao_id > b.posicao_id) {
            return 1;
          }
          return 0;
        })
      }
      keyExtractor={({ atleta_id }) => atleta_id.toString() }
      renderItem={({ item }) => <ListComponent item={item} key={item.atleta_id} />}  
    />
	);
}