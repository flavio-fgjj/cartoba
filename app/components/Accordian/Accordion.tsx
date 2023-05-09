import { useState, useEffect } from 'react';

import {
  View, Text, TouchableOpacity, LayoutAnimation, Platform, UIManager, FlatList
} from 'react-native';

// styles
import { styles } from './styles';

// utils
import { hp } from 'app/utils/adjustments';

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

const ItemInsideExpandable = ({item}: any) => {
  return (
    <View key={item.id} style={styles.content}>
      <Text style={styles.text}>{item.id}. {item.val}</Text>
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
    <View>
      <TouchableOpacity style={styles.item} onPress={onClickFunction}>
        <Text style={styles.itemText}>
          {item.category_name}
        </Text>
      </TouchableOpacity>
      <FlatList
        style={{height: hp(layoutHeight), overflow: 'hidden'}}
        data={item.subcategory}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <ItemInsideExpandable item={item} key={item.id}/>}  
      />
    </View>
  )
}

const Accordian = () => {
  const [multiSelect, setMultiSelect] = useState<boolean>(false);
  const [listDataSource, setlistDataSource] = useState<Array<Dummy>>(Content);

  if (Platform.OS == 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const updateLayout = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array: Array<Dummy> = [...listDataSource];

    index--
    if (multiSelect) {
      array[index].isExpanded = !array[index].isExpanded;
    } else {
      array.map((value: Dummy, placeindex: number) => {
        placeindex === index
        ? (array[placeindex].isExpanded) = !array[placeindex].isExpanded
        : (array[placeindex].isExpanded) = false
      })
    }

    setlistDataSource(array);
  }

  return (
    <View style={styles.container}> 
      <View style={styles.header}>
        <Text style={styles.titleText}>
          Expanded List View
        </Text>
        <TouchableOpacity
          onPress={() => setMultiSelect(!multiSelect)}>
          <Text style={styles.headerButton}>
            {
              multiSelect
              ? 'Enable single \n expand'
              : 'Enable multi \n expand'
            }
          </Text>

        </TouchableOpacity>
      </View>

      <FlatList
        data={listDataSource}
        keyExtractor={({ category_name }) => category_name}
        renderItem={({ item }) => <ExpandableComponent item={item} key={item.category_name} onClickFunction={() => updateLayout(item.id)}/>}  
      />
    </View>
  )
}

export default Accordian;