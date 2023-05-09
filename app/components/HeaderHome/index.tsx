import { useState } from 'react';
import {View, Text, Modal, Pressable, Image} from 'react-native';

// icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// styles
import { styles } from './styles';

// utils
import { hp } from 'app/utils/adjustments';


export default function HeaderHome() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.headerHomeContainer}>
      <View style={styles.viewLeft}>
        <Icon name='soccer' size={hp(30)} color={'#fff'}></Icon>
        <Text style={styles.textHeaderHome}>CartóBa</Text>
      </View>
      <View >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>App NÃO OFICIAL do game</Text>
            <Text style={styles.modalText}>Cartola da globo.com</Text>
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
            <Icon name='close-circle-outline' size={hp(30)} color={'#fff'}></Icon>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable onPress={() => setModalVisible(true)}>
          <Icon name='information-outline' size={hp(30)} color={'#fff'}></Icon>
      </Pressable>
      </View>
    </View>
  )
}