import { useEffect, useState } from 'react';
import { View, Text, Image, Switch } from 'react-native';

// style
import {styles} from './styles';

// components
import Loader from '@components/Loader';

// hooks
import useGetData from '@services/hooks/useGetData';

// model
import { Team } from 'app/model/team/Team';
import { Market } from 'app/model/status/Market';

// store
import { useStatusStore } from '@store/statusMarket';
import { useUserStore } from '@store/user';

// assets
import logo from '../../assets/logo.png';

export const Home = () => {
  const increaseStatus = useStatusStore(state => state.increaseStatus);
  const increaseRodadaAtual = useStatusStore(state => state.increaseRodadaAtual);
  const increaseNomeRodada = useStatusStore(state => state.increaseNomeRodada);

  const increaseUser = useUserStore((state: any) => state.increaseUser);
  const decreaseUser = useUserStore((state: any) => state.decreaseUser);

  const actualDate = new Date();
  const { getTeam, getStatusMarket } = useGetData();
  
  const [loading, setLoading] = useState(true);

  const [team, setTeam] = useState<Team>(new Team());
  const [statusMarket, setStatusMarket] = useState<Market>(new Market());

  const [closeMarket, setCloseMarket] = useState<string>('');
  const [closeDay, setCloseDay] = useState<number>(0); 

	const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const callGetData = async () => {
    const teamResponse = await getTeam();
    const statusMarketResponse = await getStatusMarket();
    
    if (!teamResponse.error && !statusMarketResponse.error) {
      setTeam(teamResponse);
      
      setStatusMarket(statusMarketResponse);

      increaseStatus(statusMarketResponse.status_mercado);
      increaseRodadaAtual(statusMarketResponse.rodada_atual);
      increaseNomeRodada(statusMarketResponse.nome_rodada);
      
      decreaseUser();
      increaseUser({
        idTeam: teamResponse.time.time_id.toString(), 
        championshipPoints: teamResponse.pontos_campeonato,
        nameCartola: teamResponse.time.nome_cartola, 
        nameTeam: teamResponse.time.nome, 
        patrimony: teamResponse.patrimonio, 
        photo: teamResponse.time.foto_perfil,
        points: teamResponse.pontos, 
        shield: teamResponse.time.url_escudo_png, 
        slug: teamResponse.time.slug
      });

      const statusMkt = statusMarketResponse.status_mercado == 1;
      setIsEnabled(statusMkt);

      setCloseDay(statusMarketResponse.fechamento.dia - actualDate.getDate());

      const c = statusMarketResponse.fechamento.dia - actualDate.getDate();
      const daysLeft = c == 1 ? 'DIA' : 'DIAS'
      setCloseMarket(c > 0 
        ? `${c.toString()} ${daysLeft}` 
        : `HOJE ÀS ${statusMarketResponse.fechamento.hora.toString()}:${statusMarketResponse.fechamento.minuto.toString()}`
      );

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
    <View style={styles.container}>
      {
        statusMarket.status_mercado == 1 
        ?
        <View style={styles.market}>
          <Text>{closeDay > 0 ? 'Mercado fecha em:' : 'Mercado fecha'}</Text>
          <Text style={styles.closeMarket}>{closeMarket}</Text>
        </View>
        : 
        <View style={styles.market}>
          <Text>Mercado fechado</Text>
          <Switch
            trackColor={{false: '#d50000', true: '#7ce604'}}
            thumbColor={'rgba(0, 0, 0, 0.7)'}
            value={isEnabled}
            disabled
          />
        </View>
      }
      <View style={styles.viewHome}>
        <Image style={styles.shield} source={{uri: team.time.url_escudo_png.toString()}} />
        <View style={styles.badge}>
          <Image source={{uri: team.time.foto_perfil.toString()}} style={styles.photo}/>
        </View>
      </View>
      <Text style={styles.title}>{team.time.nome}</Text>
      <Text>{team.time.nome_cartola}</Text>
      <View style={styles.box}>
        <View style={styles.boxColumn}>
          <Text style={styles.boxText}>patrimônio</Text>
          <Text style={styles.boxTextBold}>C$ {team.patrimonio.toString()}</Text>
        </View>
        <View style={styles.boxColumn}>
          <Text style={styles.boxText}>últ. pontuação</Text>
          <Text style={styles.boxTextBold}>{team.pontos.toFixed(2)}</Text>
        </View>
        <View style={styles.boxColumn}>
          <Text style={styles.boxText}>total</Text>
          <Text style={styles.boxTextBold}>{team.pontos_campeonato.toFixed(2)}</Text>
        </View>
      </View>
      <Image source={logo} style={styles.logo}/>
    </View>
  );
}