import { useState, useEffect } from 'react';

import {
  View, Text, TouchableOpacity, LayoutAnimation, Platform, UIManager, FlatList, Image
} from 'react-native';

// styles
import { styles } from './styles';

// utils
import { hp } from 'app/utils/adjustments';

// model
import { League } from 'app/model/league/League';
import { ConvertedLeague } from 'app/model/league/ConvertedLeague';

class Dummy {
  id: number = 0;
  isExpanded: boolean = false;
  category_name: string = '';
  subcategory: Array<SubCategory> = [];
}

class SubCategory {
  id: number = 0; 
  val: string = '';
}

// Dummy
const Content: Array<Dummy>= [
  {
    id: 1,
    isExpanded: false, 
    category_name: 'Item 1', 
    subcategory: [
      {id: 1, val: 'Sub 1'}, 
      {id: 2, val: 'Sub 2'}
    ]
  }, 
  {
    id: 2,
    isExpanded: false, 
    category_name: 'Item 2', 
    subcategory: [
      {id: 3, val: 'Sub 4'}, 
      {id: 4, val: 'Sub 5'}
    ]
  },
  {
    id: 3,
    isExpanded: false, 
    category_name: 'Item 3', 
    subcategory: [
      {id: 5, val: 'Sub 6'}, 
      {id: 6, val: 'Sub 7'}
    ]
  },
  {
    id: 4,
    isExpanded: false, 
    category_name: 'Item 4', 
    subcategory: [
      {id: 7, val: 'Sub 8'}, 
      {id: 8, val: 'Sub 9'}
    ]
  },
  {
    id: 5,
    isExpanded: false, 
    category_name: 'Item 5', 
    subcategory: [
      {id: 9, val: 'Sub 10'}, 
    ]
  },
  {
    id: 6,
    isExpanded: false, 
    category_name: 'Item 6', 
    subcategory: [
      {id: 10, val: 'Sub 11'}
    ]
  }
]

const ItemInsideExpandable = (item: ConvertedLeague) => {
  return (
    <View key={item.generatedId} style={styles.content}>
      <Text style={styles.text}>{item.generatedId}. {item.nome}</Text>
      <View style={styles.separator} />
    </View>
  )
}

const ExpandableComponent = ({item, onClickFunction}: any) => {
  const [layoutHeight, setLayoutHeight] = useState(0);

  useEffect(() => {
    setLayoutHeight(item.isExpanded ? hp(350) : hp(0))
  }, [item.isExpanded]);

  return (
    <View style={{ padding: 5 }}>
      <TouchableOpacity style={[styles.item, {borderRadius: 8, justifyContent: 'space-between' }]} onPress={onClickFunction}>
        <View style={{flexDirection: 'row'}}>
          <Image source={{uri: item.url_flamula_png}} style={styles.banderole}/>
          <View>
            <Text style={styles.itemText}>{item.nome}</Text>
            <Text style={{color: '#C8C8C8', fontSize: 12, paddingLeft: 10}}>
              {item.tipo === "F" ? 'Fechada' : 'Moderada'} • {(item.total_times_liga + 1).toString()} Cartoleiros
            </Text>
          </View>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text>1°</Text>
        </View>
      </TouchableOpacity>
      {/* <View style={{paddingVertical: 5}} /> */}
      <View style={{height: hp(layoutHeight), overflow: 'hidden'}}>
        <Text>Liga ID: {item.liga_id}</Text>
        <Text>Nome: {item.nome}</Text>
      </View>
      {/* <FlatList
        style={{height: hp(layoutHeight), overflow: 'hidden'}}
        data={item.liga_id}
        keyExtractor={({ liga_id }) => liga_id}
        renderItem={({ item }) => <ItemInsideExpandable item={item} key={item.id}/>}  
      /> */}
    </View>
  )
}

interface Props {
	leagues: Array<ConvertedLeague>, 
	leagueType: string
}

const Leagues = (props: Props) => {
  const [multiSelect, setMultiSelect] = useState<boolean>(false);
  
  const typeLeague: string = props.leagueType;
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
      <View style={styles.header}>
        {/* <Text style={styles.titleText}>
          {typeLeague}
        </Text> */}
        {/* <TouchableOpacity
          onPress={() => setMultiSelect(!multiSelect)}>
          <Text style={styles.headerButton}>
            {
              multiSelect
              ? 'Enable single \n expand'
              : 'Enable multi \n expand'
            }
          </Text>

        </TouchableOpacity> */}
      </View>

      <FlatList
        data={listDataSource}
        keyExtractor={({ slug }) => slug}
        renderItem={({ item }) => <ExpandableComponent item={item} key={item.slug} onClickFunction={() => updateLayout(item.generatedId)}/>}  
      />
    </View>
  )
}

export default Leagues;