import { useState, useEffect } from 'react';
import {
  View, Text, FlatList, Pressable, Image
} from 'react-native';

// styles
import { styles } from './styles';

// model
import { Atleta } from 'app/model/Atleta';
import { MyTeam } from 'app/model/myTeam/MyTeam';
import { Time } from 'app/model/Time';
import { MyTeamPartial } from 'app/model/myTeam/MyTeamPartial';

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

  // const getTotalPoints = async (_team: Time, athletes: Array<Atleta>) => {
  //   let points: number = 0;
      
  //   athletes.forEach((a: any, index: number) => {
  //     points += athletes[_team.atleta_id].pontuacao
  //   });
  //     console.log(team.nome, points)
  //     teamsWithPoints.push({...team, pontuacao: points})
  // }

  const getPointsByTeam = async (_teams: MyTeam, scoredAthletes: any) => {
    let points: number = 0;

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
    if (_teams.time.time_id == 976787) {
      console.log(n)
    }
    return n;
  }

  const callGetData = async () => {
    const leagueTeamsResponse = await getLeagueTeams(props.slug);
    const scoredAthletesResponse = await getScoredAthletes();
    
    if (!leagueTeamsResponse.error && !scoredAthletesResponse.error) {

      let teamsWithPoints: Array<MyTeamPartial> = [];
      for (const team of leagueTeamsResponse?.times) {
        const t = await getMyTeam(team.time_id.toString())
        //const points: number = await getPointsByTeam(t, scoredAthletesResponse);
        teamsWithPoints.push(await getPointsByTeam(t, scoredAthletesResponse))
      
      
        // for (const team of teamsResponse?.times) {
      //   const t = await getMyTeam(team.time_id.toString())
      //   let points: number = 0;
      //   t?.atletas.forEach((a: any, index: number) => {
      //     points += scoredAthletesResponse?.atletas[t?.atletas[0].atleta_id].pontuacao
      //   });
      //   teamsWithPoints.push({...t, pontuacao: points})

      //   console.log(t?.atletas[0].nome, scoredAthletesResponse?.atletas[t?.atletas[0].atleta_id].pontuacao)
      // }
        
      //console.log(t?.time.nome, points.toFixed(2))

      // teamsResponse?.times.forEach((team: Time) => {
      //   scoredAthletesResponse?.atletas?.filter((athlete: any) => {
      //     athlete[]
      //   })
      //   console.log(team.nome)
      // })

      // teamsResponse?.filter((league: League) => league.time_dono_id != null)
			// 	.map((league: League, key: number) => {
			// 		return {generatedId: key, isExpandable: false, ...league}
			// 	}))
      }

      // console.log(teamsResponse)
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

  // const RadioIcon = () => {
  //   setByChampionship(!byChampionship);
  //   byChampionship
  //   ? 
  // }

  const Teams = ({item}: any) => {
    return (
      <View key={item.time.time_id} style={styles.team}>
        <Image source={{uri: item.time.url_escudo_png}} style={styles.shield}/>
        <View style={styles.teamNameView}>
          <Text style={styles.teamNameText}>{item.time.nome}</Text>
          <Text style={styles.teamOwnerText}>{item.time.nome_cartola}</Text>
        </View>
        <View style={styles.teamNameView}>
          <Text style={styles.teamNameText}>PONTOS</Text>
          <Text style={styles.teamOwnerText}>{item.pontuacao.toFixed(2)}</Text>
        </View>
      </View>
    )
  }

  return (
    <View>
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
        data={teams}
        keyExtractor={({ slug }) => slug}
        renderItem={({ item }) => <Teams item={item} key={item.time_id} />}  
      />
    </View>
  )
}

export default LeagueTeams;