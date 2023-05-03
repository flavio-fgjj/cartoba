import { useState } from 'react';
import {View, Text, Image, Modal, Pressable} from 'react-native';

// icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// styles
import {styles} from './styles';

// assets
import logo from '../../assets/logo.png';

export default function HeaderHome() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.headerHomeContainer}>
      <View style={styles.viewLeft}>
        <Image source={logo} style={styles.logoHeaderHome}></Image>
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
            <Icon name='close-circle-outline' size={30} color={'#fff'}></Icon>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable onPress={() => setModalVisible(true)}>
          <Icon name='information-outline' size={30} color={'#ff7b0d'}></Icon>
      </Pressable>
      </View>
    </View>
  )
}