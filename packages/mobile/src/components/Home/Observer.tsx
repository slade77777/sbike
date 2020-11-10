import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Modal} from "react-native";
import MapView from 'react-native-maps';
import {getCurrentDeviceLocation} from 'shared-logic';
import color from "../../config/color";
import Icon from "react-native-vector-icons/FontAwesome";

type Props = {
};

const Observer: React.FC<Props> = ({}) => {

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getCurrentDeviceLocation().then(data => {
      console.log(data);
    }).catch(error => {
      console.log(error);
    })
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}} >
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <TouchableOpacity onPress={() => setModalVisible(true)} style={{ position: 'absolute', left: 10, top: 10}}>
        <View style={{ width: 100, height: 30, borderWidth: 1, borderColor: color.blue, justifyContent: 'center', borderRadius: 5}}>
          <Text style={{ textAlign: 'center', fontWeight: 'bold'}}>Chọn xe</Text>
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Icon name='close' color={'black'} size={25}/>
            </TouchableOpacity>
            <Text style={styles.modalText}>Hello World!</Text>
          </View>
        </View>
      </Modal>
    </View>
  )
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default Observer;