import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Linking } from 'react-native';
import moment from 'moment';
import 'moment/min/locales';

// style
import {styles} from './styles';

// components
import Loader from '@components/Loader';

// hooks
import useGetData from '@services/hooks/useGetData';

// icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// utils
import { hp } from 'app/utils/adjustments';

// model 
import { Clube } from 'app/model/Clube';
import { Partida } from 'app/model/Partida';
import { Rodada } from 'app/model/Rodada';

export default function Games() {
	const { getGames, getStatusMarket, getRodadas } = useGetData();

	const [loading, setLoading] = useState(true);
	const [clubes, setClubes] = useState<Array<Clube>>([]);
	const [partidas, setPartidas] = useState<Array<Partida>>([]);
	const [rodadas, setRodadas] = useState<Array<Rodada>>(new Array<Rodada>());
	const [rodada, setRodada] = useState<string>('');
	const [rodadaAtual, setRodadaAtual] = useState<string>('');

	const callGetData = async () => {
    const statusMarketResponse = await getStatusMarket();
		const rodadasRepsonse = await getRodadas();
    
    if (!statusMarketResponse.error && !rodadasRepsonse.error) {
			setRodada(statusMarketResponse.rodada_atual.toString());
			setRodadaAtual(statusMarketResponse.rodada_atual.toString());
      const response = await getGames(statusMarketResponse.rodada_atual.toString());

			if (!response.error) {
				setClubes(response.clubes);
				setPartidas(response.partidas);
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


	const GameComponent = ({item}: any) => {
		const escudoMandante = clubes[item.clube_casa_id.toString()].escudos;
		const escudoVisitante = clubes[item.clube_visitante_id.toString()].escudos;

		console.log(item.transmissao)

		return (
			<View style={{alignItems: 'center', paddingBottom: 20}}>
				<View style={{flexDirection: 'row', alignItems: 'center'}}>
					<Image source={{uri: Object.values(escudoMandante)[2].toString()}} style={styles.shield}/>
					{
						item.placar_oficial_mandante != null
						? <Text style={{paddingHorizontal: 10}}>{item.placar_oficial_mandante.toString()} x {item.placar_oficial_visitante.toString()}</Text>
						: <Text style={{paddingHorizontal: 10}}>x</Text>
					}
					<Image source={{uri: Object.values(escudoVisitante)[2].toString()}} style={styles.shield}/>
				</View>
				<Text>{moment(item.partida_data).locale('pt-br').format('L').toString()}</Text>
				{
					item.transmissao.label == ""
					? <Text>{item.local}</Text>
					: <TouchableOpacity onPress={() => {Linking.openURL(item.transmissao.url)}}><Text>{item.transmissao.label}</Text></TouchableOpacity>
				}
			</View>
		)
	}

	const gotoRodada = async (action: string) => {
		const r = action === 'add' ? (parseInt(rodada) + 1).toString() : (parseInt(rodada) - 1).toString();
		setRodada(r);
		const response = await getGames(r);

		if (!response.error) {
			setClubes(response.clubes);
			setPartidas(response.partidas);
			setLoading(false);
		}
	}

	return (
		<View style={styles.container}>
			<View style={{flexDirection: 'row', paddingTop: 20}}>
				{
				  (parseInt(rodada) > 1 && parseInt(rodada) <= parseInt(rodadaAtual)) 
					? <TouchableOpacity onPress={() => gotoRodada("back")}><Icon name='chevron-left-circle-outline' size={hp(25)} color={'#000'}></Icon></TouchableOpacity>
					: <Icon name='chevron-left-circle-outline' size={hp(25)} color={'#C3C3C3'}></Icon>
				}
				<Text style={{paddingHorizontal: 15}}>{rodada}ª Rodada</Text>
				{
					parseInt(rodada) < parseInt(rodadaAtual) 
					? <TouchableOpacity onPress={() => gotoRodada("add")}><Icon name='chevron-right-circle-outline' size={hp(25)} color={'#000'}></Icon></TouchableOpacity>
					: <Icon name='chevron-right-circle-outline' size={hp(25)} color={'#C3C3C3'}></Icon>
				}
			</View>
        

			<FlatList 
				data={partidas}
				keyExtractor={({ partida_id }) => partida_id.toString()}
				renderItem={({ item }) => <GameComponent item={item} />}  
					style={{marginTop: 20}}
			/>


		</View>
	);
}