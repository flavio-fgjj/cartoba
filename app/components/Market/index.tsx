import {useState, useEffect} from 'react';
import {Text, Image, View, FlatList} from 'react-native';

// style
import {styles} from './styles';

// hooks
import useGetData from '@services/hooks/useGetData';

// components
import Loader from '@components/Loader';

// model
import { Atleta } from 'app/model/Atleta';
import { Clube } from 'app/model/Clube';

// utils
import { Positions } from 'app/utils/positions';

const Market = () => {
  const { getAthletes } = useGetData();

  const [loading, setLoading] = useState(true);

  const [athletes, setAthletes] = useState<Array<Atleta>>(new Array<Atleta>());
  const [clubes, setClubes] = useState<Array<Clube>>([]);

  const callGetData = async () => {
    const response = await getAthletes();
    if (!response.error) {
      setAthletes(response.atletas.sort((a: Atleta, b: Atleta) => {
        const pointA = a.preco_num
        const pointB = b.preco_num
        if (pointA > pointB) {
          return -1;
        }
        if (pointA < pointB) {
          return 1;
        }

        return 0;
      }));

      setClubes(response.clubes);

  		setLoading(false);
	

    }
  };

	useEffect(()=> {
    callGetData();
  }, []);

  if (loading) {
    return <Loader />
  }

  const PlayerMarketComponent = ({item}: any) => {
    const escudos = clubes[item.clube_id.toString()].escudos;

    return (
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', paddingVertical: 5, alignSelf: 'stretch'}}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Image source={{uri: Object.values(escudos)[2].toString()}} style={styles.shield}/>
          <Text style={[styles.price, {paddingRight: 5}]}>{clubes[item.clube_id.toString()].abreviacao}</Text>
        </View>
        <Image source={{uri: item.foto.toString().replace("FORMATO", "220x220")}} style={[styles.photo, {flex: 2}]}/>
        <View style={{flex: 4}}>
          <Text style={{fontWeight: 'bold'}}>{item.apelido_abreviado}</Text>
          <Text>{Positions[item.posicao_id].toString()}</Text>
        </View>
        <View style={{flex: 2}}>
          <Text style={styles.price}>C${item.preco_num}</Text>  
          {/* <Text style={styles.pontos}>{item.pontos_num}</Text> */}
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList 
				data={athletes}
				keyExtractor={({ atleta_id }) => atleta_id.toString()}
				renderItem={({ item }) => <PlayerMarketComponent item={item} />}  
					style={{width: '100%', marginTop: 20}}
			/>
    </View>
  );
};

export default Market;