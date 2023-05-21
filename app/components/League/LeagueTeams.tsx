import { useState, useEffect, useRef } from 'react';
import {
  View, Text, FlatList, Pressable, Image, TouchableOpacity, Modal
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

// store
import { useStatusStore } from '@store/statusMarket';

// assets
import logo from '../../assets/logo.png';
import { colors } from 'app/colors';
import TeamFromLeague from './Team';

interface Props {
	slug: string, 
  leagueName: string,
  rowIndex: number
}

const LeagueTeams = (props: Props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [idTeamModal, setIdTeamModal] = useState<number>(0);
  const [nameTeamModal, setNameTeamModal] = useState<string>('');
  const [nameTeamOwnerModal, setNameTeamOwnerModal] = useState<string>('');

  const increaseStatus = useStatusStore(state => state);
  const statusMarket = increaseStatus.statusMarket == 1;

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
    } catch (err) {
      console.error(err);
    }
  }

  const getPointsByTeam = async (_teams: MyTeam, scoredAthletes: any) => {
    let points: number = 0;
    let totalPlayers: number = 0;
    if (scoredAthletes?.atletas) { // parciais (mercado fechado com jogos em andamento)
      for (const athlete of _teams.atletas) {
        const a = scoredAthletes?.atletas[athlete.atleta_id];
        if (a) {
          if (a.entrou_em_campo) {
            let p = a.pontuacao ?? 0;
            points += _teams.capitao_id === athlete.atleta_id ? (p * 1.5) : p;
            totalPlayers++;
          } else {
            const bench = _teams.reservas?.filter((r: Atleta) => r.posicao_id === athlete.posicao_id)[0];
  
            if (bench) {
              const b = scoredAthletes?.atletas[bench.atleta_id];
              if (b) {
                let pb = b.pontuacao ?? 0;
                points += _teams.capitao_id === athlete.atleta_id ? (pb * 1.5) : pb;
                totalPlayers++;
              }
            }
          }
        } 
      }
      const n: MyTeamPartial = {..._teams, pontuacao: points, total_atletas_pontuados: totalPlayers};
      n.pontos_campeonato = n.pontos_campeonato + points;
      return n;
    } else { // mercado aberto
      const p: number = _teams.pontos;
      const n: MyTeamPartial = {..._teams, pontuacao: p, total_atletas_pontuados: totalPlayers};
      return n;
    }
  }

  const callGetData = async () => {
    const leagueTeamsResponse = await getLeagueTeams(props.slug);
    const scoredAthletesResponse = await getScoredAthletes();
    
    if (!leagueTeamsResponse.error && !scoredAthletesResponse.error) {
      if (statusMarket) {
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

  const showModal = (id: number, name: string, owner: string) => {
    setIdTeamModal(id);
    setNameTeamModal(name);
    setNameTeamOwnerModal(owner);
    setModalVisible(true);
  }

  const Teams = ({item, ranking}: any) => {
    return (
      <TouchableOpacity onPress={() => showModal(item.time.time_id, item.time.nome, item.time.nome_cartola)} key={item.time.time_id} style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 15, paddingVertical: 5, backgroundColor: '#fff' }}>
        <View style={{ flex: 6, alignSelf: 'stretch', flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
          <Text style={{width: wp(20)}}>{((ranking + 1).toString())}° </Text>
          <Image source={{uri: item.time.url_escudo_png}} style={[styles.shield, {marginLeft: 2}]}/>
          <View style={[styles.teamNameView, {width: wp(180), justifyContent: 'center'}]}>
            {
              item.time.nome_cartola.indexOf(' ') != -1
              ? <View style={{justifyContent: 'center'}}>
                  <Text style={styles.teamNameText}>{item.time.nome}</Text>
                  <Text>{item.time.nome_cartola.substring(0, item.time.nome_cartola.indexOf(' ')).trim()}</Text>
                </View>
              : <View>
                  <Text style={styles.teamNameText}>{item.time.nome}</Text>
                  <Text>{item.time.nome_cartola}</Text>
                </View>
            }
          </View>
        </View>
        <View style={[styles.teamNameView, {alignSelf: 'stretch', flex: 1, justifyContent: 'center'}]}>
          <Text style={styles.points}>{item.pontuacao != null ? item.pontuacao.toFixed(2): 0}</Text>
        </View>
        <View style={[styles.teamNameView, {alignSelf: 'stretch', flex: 1, justifyContent: 'center'}]}>
          <Text style={styles.points}>{item.pontos_campeonato != null ? item.pontos_campeonato.toFixed(2) : 0}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  const Footer = () => {
    return (<View style={{backgroundColor: '#fff', paddingVertical: 15, alignItems: 'center', flex: 1 }}>
      <Text>CartóBa</Text>
      <Image source={logo} style={styles.logo}/>
    </View>)
  }
  const ListHeader = () => {
    return (
      <View style={{backgroundColor: '#fff'}}>
        {
          highlights > 0 &&
          <View style={{width: '90%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5, paddingVertical: 15, alignSelf: 'center'}}>
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}> 
            <Text style={{alignSelf: 'center', fontWeight: '900', fontSize: 20, paddingTop: 15}}>{nameTeamModal}</Text>
            <Text style={{alignSelf: 'center', fontWeight: 'normal', fontSize: 15}}>{nameTeamOwnerModal}</Text>
            
            <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1, marginBottom: 10}}>
              <View style={{flex: 3, flexDirection: 'row', alignItems: 'center'}}>
                <Text>Posição/Jogador</Text>
              </View>
              {/* <View style={{paddingLeft: 10, flex: 2, alignSelf: 'stretch', flexDirection: 'row', alignContent: 'flex-end', alignItems: 'center'}}> */}
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <Text>Preço</Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{textAlign: 'right'}}>Pontos</Text>
              </View>
            </View>

            <TeamFromLeague idTeam={idTeamModal}/>
            <Pressable onPress={() => setModalVisible(!modalVisible)} style={{alignSelf: 'center'}}>
              <Icon name='close-circle-outline' size={hp(50)} color={colors.primary}></Icon>
            </Pressable>
          </View>
        </View>
      </Modal>

      <FlatList
        ListHeaderComponent={ListHeader}
        ListFooterComponent={Footer}
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
