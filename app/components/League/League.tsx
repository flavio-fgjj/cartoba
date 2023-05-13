import { useState, useEffect } from 'react';

import {
  View, Text, TouchableOpacity, LayoutAnimation, Platform, UIManager, FlatList, Image
} from 'react-native';

// styles
import { styles } from './styles';

// utils
import { adjust, hp } from 'app/utils/adjustments';

// model
import { ConvertedLeague } from 'app/model/league/ConvertedLeague';

// components
import LeagueTeams from './LeagueTeams';

// astore
import { useUserStore } from '@store/user';

const ExpandableComponent = ({item, onClickFunction}: any) => {
  const increaseUser = useUserStore(state => state);
  const idTeam = increaseUser.user.idTeam;

  const [layoutHeight, setLayoutHeight] = useState(0);

  useEffect(() => {
    setLayoutHeight(item.isExpanded ? hp(350) : hp(0))
  }, [item.isExpanded]);

  const c: boolean = false;

  return (
    <View style={{ padding: 5, backgroundColor: '#fff' }}>
      <TouchableOpacity style={[styles.item, {borderRadius: 8, justifyContent: 'space-between', backgroundColor: '#fff' }]} onPress={onClickFunction}>
        <View style={{flexDirection: 'row'}}>
          <Image source={{uri: item.url_flamula_png}} style={styles.banderole}/>
          <View>
            <Text style={styles.itemText}>{item.nome}</Text>
            <Text style={{color: '#C8C8C8', fontSize: adjust(12), paddingLeft: 10}}>
              {item.tipo === "F" ? 'Fechada' : 'Moderada'} • {(item.total_times_liga + 1).toString()} Cartoleiros
            </Text>
          </View>
        </View>
        {
          (item.time_dono_id != null && idTeam == item.time_dono_id.toString()) &&
          <View style={{justifyContent: 'center'}}>
            <View style={styles.isPresident}>
              <Text style={{color: '#fff', fontWeight: 'bold'}}>P</Text>
            </View>
          </View>
        }
        
      </TouchableOpacity>
      {
        item.isExpanded && <LeagueTeams slug={item.slug} leagueName={item.nome} rowIndex={0}/>
      }
    </View>
  )
}

interface Props {
	leagues: Array<ConvertedLeague>, 
	leagueType: string
}

const Leagues = (props: Props) => {
  const [multiSelect, setMultiSelect] = useState<boolean>(false);
  
  // const typeLeague: string = props.leagueType;
  const leagues: Array<ConvertedLeague> = props.leagues;
  
  const [listDataSource, setlistDataSource] = useState<Array<ConvertedLeague>>(leagues);

  if (Platform.OS == 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const updateLayout = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    const array: Array<ConvertedLeague> = [...leagues];

    if (multiSelect) {
      array[index].isExpanded = !array[index].isExpanded;
    } else {
      array.map((value: ConvertedLeague, placeindex: number) => {
        placeindex === index
        ? (array[placeindex].isExpanded) = !array[placeindex].isExpanded
        : (array[placeindex].isExpanded) = false
      });
    }

    setlistDataSource(array);
  }

  return (
    <View style={styles.container}> 
      <FlatList
        data={listDataSource}
        keyExtractor={({ slug }) => slug}
        renderItem={({ item }) => <ExpandableComponent item={item} key={item.slug} onClickFunction={() => updateLayout(item.generatedId)}/>}  
      />
    </View>
  )
}

export default Leagues;