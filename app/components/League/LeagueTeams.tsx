import { useState, useEffect } from 'react';
import {
  View, Text, FlatList, Pressable, Image
} from 'react-native';

// styles
import { styles } from './styles';

// model
import { Atleta } from 'app/model/Atleta';
import { MyTeam } from 'app/model/myTeam/MyTeam';
import { MyTeamPartial } from 'app/model/myTeam/MyTeamPartial';
import { Time } from 'app/model/Time';

// hooks
import useGetData from '@services/hooks/useGetData';

// components
import Loader from '@components/Loader';

// icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// utils
import { hp } from 'app/utils/adjustments';

interface Props {
	slug: string
}

const LeagueTeams = (props: Props) => {
  const { getLeagueTeams, getScoredAthletes, getMyTeam } = useGetData();

  const [teams, setTeams] = useState<Array<MyTeamPartial>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [byChampionship, setByChampionship] = useState<boolean>(false);
  const [highlights, setHighlights] = useState<number>(0);
  const [lanterninha, setLanterninha] = useState<Time>(new Time());
  const [maisRico, setMaisRico] = useState<Time>(new Time());
  const [campeaoRodada, setCampeaoRodada] = useState<Time>(new Time());

  const getPointsByTeam = async (_teams: MyTeam, scoredAthletes: any) => {
    let points: number = 0;

    if (scoredAthletes.length > 0) { // parciais (mercado fechado com jogos em andamento)
      for (const athlete of _teams.atletas) {
        const a = scoredAthletes?.atletas[athlete.atleta_id]
        if (a) {
          let p = a.pontuacao ?? 0
          points += _teams.capitao_id === athlete.atleta_id ? (p * 1.5) : p
        } else {
          const bench = _teams.reservas?.filter((r: Atleta) => r.posicao_id === athlete.posicao_id)[0];
  
          if (bench) {
            const b = scoredAthletes?.atletas[bench.atleta_id]
            if (b) {
              let pb = b.pontuacao ?? 0
              points += _teams.capitao_id === athlete.atleta_id ? (pb * 1.5) : pb
            }
          }
        }
      }
      const n: MyTeamPartial = {..._teams, pontuacao: points};
      n.pontos_campeonato = n.pontos_campeonato + points;
      return n;
    } else { // mercado aberto
      const p: number = _teams.pontos;
      const n: MyTeamPartial = {..._teams, pontuacao: p};
      return n;
    }
  }

  const callGetData = async () => {
    const leagueTeamsResponse = await getLeagueTeams(props.slug);
    const scoredAthletesResponse = await getScoredAthletes();
    
    if (!leagueTeamsResponse.error && !scoredAthletesResponse.error) {

      if (leagueTeamsResponse.destaques.lanterninha) {
        setHighlights(3);
        setLanterninha(leagueTeamsResponse.destaques.lanterninha);
        setCampeaoRodada(leagueTeamsResponse.destaques.rodada);
        setMaisRico(leagueTeamsResponse.destaques.patrimonio);
      }

      let teamsWithPoints: Array<MyTeamPartial> = [];
      for (const team of leagueTeamsResponse?.times) {
        const t = await getMyTeam(team.time_id.toString())
        teamsWithPoints.push(await getPointsByTeam(t, scoredAthletesResponse))
      }

      setTeams(teamsWithPoints);
      setLoading(false);
    }
  };

  useEffect(() => {
    callGetData();
  }, []);

  if (loading) {
    return <Loader />
  }

  const Teams = ({item}: any) => {
    return (
      <View key={item.time.time_id} style={styles.team}>
        <Image source={{uri: item.time.url_escudo_png}} style={styles.shield}/>
        <View style={[styles.teamNameView, {width: '50%'}]}>
          <Text style={styles.teamNameText}>{item.time.nome}</Text>
          <Text style={styles.teamOwnerText}>{item.time.nome_cartola}</Text>
        </View>
        <View style={[styles.teamNameView, {alignItems: 'center'}]}>
          <Text style={styles.titlePoints}>RODADA</Text>
          <Text style={styles.points}>{item.pontuacao.toFixed(2)}</Text>
        </View>
        <View style={[styles.teamNameView, {alignItems: 'center'}]}>
          <Text style={styles.titlePoints}>CAMPEONATO</Text>
          <Text style={styles.points}>{(item.pontos_campeonato).toFixed(2)}</Text>
        </View>
      </View>
    )
  }

  return (
    <View>
      {
        highlights > 0 &&
        <View style={{width: '90%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 15, alignSelf: 'center'}}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.points}>LÍDER DA RODADA</Text>
            <Image source={{uri: campeaoRodada.url_escudo_png}} style={styles.shieldHighlight}/>
            <Text style={styles.titlePoints}>{campeaoRodada.nome}</Text>
            <Text style={styles.titlePoints}>{campeaoRodada.nome_cartola}</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.points}>MAIS RICO</Text>
            <Image source={{uri: maisRico.url_escudo_png}} style={styles.shieldHighlight}/>
            <Text style={styles.titlePoints}>{maisRico.nome}</Text>
            <Text style={styles.titlePoints}>{maisRico.nome_cartola}</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.points}>LANTERNINHA</Text>
            <Image source={{uri: lanterninha.url_escudo_png}} style={styles.shieldHighlight}/>
            <Text style={styles.titlePoints}>{lanterninha.nome}</Text>
            <Text style={styles.titlePoints}>{lanterninha.nome_cartola}</Text>
          </View>
        </View>
      }

      <View style={styles.separator} />

      <View style={{flexDirection: 'row', padding: 15, justifyContent: 'space-between', alignItems: 'center'}}>
        <View style={{flexDirection: 'row'}}>
          <Pressable style={{flexDirection: 'row'}} onPress={() => setByChampionship(!byChampionship)}>
            <Icon name={byChampionship ? 'radiobox-marked' : 'radiobox-blank'} size={hp(25)} color={'#000'}></Icon>
            <Text style={{paddingLeft: 5}}>Campeonato</Text>
          </Pressable>
          <Pressable style={{flexDirection: 'row', paddingLeft: 15}} onPress={() => setByChampionship(!byChampionship)}>
            <Icon name={!byChampionship ? 'radiobox-marked' : 'radiobox-blank'} size={hp(25)} color={'#000'}></Icon>
            <Text style={{paddingLeft: 5}}>Rodada</Text>
          </Pressable>
        </View>

        <Pressable
          onPress={() => {}}>
          <Icon name='share-variant-outline' size={hp(25)} color={'#000'}></Icon>
        </Pressable>
      </View>
      <View style={styles.separator} />

      <FlatList
        data={
          !byChampionship
          ? teams.sort((a: MyTeamPartial, b: MyTeamPartial) => {
              const pointA = a.pontuacao
              const pointB = b.pontuacao
              if (pointA > pointB) {
                return -1;
              }
              if (pointA < pointB) {
                return 1;
              }

              return 0;
            })
          : teams.sort((a: MyTeamPartial, b: MyTeamPartial) => {
              const pointA = a.pontos_campeonato
              const pointB = b.pontos_campeonato
              if (pointA > pointB) {
                return -1;
              }
              if (pointA < pointB) {
                return 1;
              }

              return 0;
            })
        }
        renderItem={({ item }) => <Teams item={item} key={item.time.time_id} />}  
      />
    </View>
  )
}

export default LeagueTeams;