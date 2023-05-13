import { useState, useEffect, useRef } from 'react';
import {
  View, Text, FlatList, Pressable, Image, Alert, PixelRatio, ScrollView
} from 'react-native';
import { captureRef } from 'react-native-view-shot';
import Share from 'react-native-share';

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
import { wp, hp } from 'app/utils/adjustments';

interface Props {
	slug: string, 
  leagueName: string,
  rowIndex: number
}

const LeagueTeams = (props: Props) => {
  const { getLeagueTeams, getScoredAthletes, getMyTeam } = useGetData();

  const [teams, setTeams] = useState<Array<MyTeamPartial>>([]);
  const [teamsByChamps, setTeamsByChamps] = useState<Array<MyTeamPartial>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [byChampionship, setByChampionship] = useState<boolean>(false);
  const [highlights, setHighlights] = useState<number>(0);
  const [lanterninha, setLanterninha] = useState<Time>(new Time());
  const [maisRico, setMaisRico] = useState<Time>(new Time());
  const [campeaoRodada, setCampeaoRodada] = useState<Time>(new Time());

  // const [shareAsText, setShareAsText] = useState<boolean>(true);
  const league: string = props.leagueName;
  const [index, setIndex] = useState<number>(props.rowIndex);

  // share
  const viewRef = useRef<FlatList>(null);

  const onShare = async () => {
    try {
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 1.0
      });
      await Share.open({ title: props.leagueName, url: uri });

      // let msg: string = `${league} | ${!byChampionship ? 'por Rodada' : 'Por campeonato'}\n`;

      // !byChampionship
      // ? teams.sort((a: MyTeamPartial, b: MyTeamPartial) => {
      //     const pointA = a.pontuacao
      //     const pointB = b.pontuacao
      //     if (pointA > pointB) {
      //       return -1;
      //     }
      //     if (pointA < pointB) {
      //       return 1;
      //     }

      //     return 0;
      //   }).forEach(x => {
      //     msg += `${x.posicao}° ${x.time.nome} (${x.time.nome_cartola.substring(0, x.time.nome_cartola.indexOf(' ')).trim()}) - R: ${x.pontuacao.toFixed(2)} | C: ${x.pontos_campeonato.toFixed(2)}\n`
      //   })
      // : teams.sort((a: MyTeamPartial, b: MyTeamPartial) => {
      //     const pointA = a.pontos_campeonato
      //     const pointB = b.pontos_campeonato
      //     if (pointA > pointB) {
      //       return -1;
      //     }
      //     if (pointA < pointB) {
      //       return 1;
      //     }

      //     return 0;
      //   }).forEach(x => {
      //     msg += `${x.posicao}° ${x.time.nome} (${x.time.nome_cartola}) - R: ${x.pontuacao} | C: ${x.pontos_campeonato}\n`
      //   })

      
      // await Share.open({ title: props.leagueName, message: msg });
    } catch (err) {
      console.error(err);
    }
  }

  const getPointsByTeam = async (_teams: MyTeam, scoredAthletes: any, ranking: number) => {
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
      const n: MyTeamPartial = {..._teams, pontuacao: points, posicao: ranking};
      n.pontos_campeonato = n.pontos_campeonato + points;
      return n;
    } else { // mercado aberto
      const p: number = _teams.pontos;
      const n: MyTeamPartial = {..._teams, pontuacao: p, posicao: ranking};
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
      let i: number = 0;
      for (const team of leagueTeamsResponse?.times) {
        i++;
        const t = await getMyTeam(team.time_id.toString())
        teamsWithPoints.push(await getPointsByTeam(t, scoredAthletesResponse, i))
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

  const Teams = ({item, ranking}: any) => {
    return (
      <View key={item.time.time_id} style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', paddingHorizontal: 15, backgroundColor: '#fff' }}>
        <View style={{ flex: 6, alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'center', paddingVertical: 2 }}>
          <Text style={{width: wp(20)}}>{((ranking + 1).toString())}° </Text>
          <Image source={{uri: item.time.url_escudo_png}} style={[styles.shield, {marginLeft: 10}]}/>
          <View style={[styles.teamNameView, {width: wp(180)}]}>
            {
              item.time.nome_cartola.indexOf(' ') != -1
              ? <Text style={styles.teamNameText}>{item.time.nome} ({item.time.nome_cartola.substring(0, item.time.nome_cartola.indexOf(' ')).trim()})</Text>
              : <Text style={styles.teamNameText}>{item.time.nome} ({item.time.nome_cartola})</Text>
            }
          </View>
        </View>
        <View style={[styles.teamNameView, {alignSelf: 'stretch', flex: 1}]}>
          <Text style={styles.points}>{item.pontuacao != null ? item.pontuacao.toFixed(2): 0}</Text>
        </View>
        <View style={[styles.teamNameView, {alignSelf: 'stretch', flex: 1}]}>
          <Text style={styles.points}>{item.pontos_campeonato != null ? item.pontos_campeonato.toFixed(2) : 0}</Text>
        </View>
      </View>
    )
  }

  const ListHeader = () => {
    return (
      <View style={{backgroundColor: '#fff'}}>
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
        <Text style={{textAlign: 'center', paddingTop: 8, fontWeight: '900'}}>{league}</Text>
        <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 8 }}>
          <Text style={{ flex: 6, alignSelf: 'stretch' }}>Posição/Time</Text>
          <Text style={{ flex: 1, alignSelf: 'stretch' }}>Rod.</Text>
          <Text style={{ flex: 1, alignSelf: 'stretch' }}>Camp.</Text>
          {/* <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
            <View style={[styles.teamNameView, {alignItems: 'center'}]}>
              <Text style={{paddingRight: 10}}>Rod.</Text>
            </View>
            <View style={[styles.teamNameView, {alignItems: 'center'}]}>
              <Text>Camp.</Text>
            </View>
          </View> */}
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, alignSelf: 'stretch'}}>
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
            onPress={onShare}>
            <Icon name='share-variant-outline' size={hp(25)} color={'#000'}></Icon>
          </Pressable>
        </View>
      <View style={styles.separator} />

      <FlatList
        ListHeaderComponent={ListHeader}
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
        renderItem={({ item, index }) => <Teams item={item} key={index} ranking={index}/>}  
        keyExtractor={(item,index) => index.toString()}
        ref={viewRef}

      />
    </View>
  )
}

export default LeagueTeams;
