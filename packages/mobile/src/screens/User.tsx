import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useAuthState} from "../context/auth-context";
import Icon from 'react-native-vector-icons/Entypo';

type Props = {
};

const User: React.FC<Props> = ({}) => {
  const {state, signOut} = useAuthState();
  const userInfo = state?.userData;


  return (
    <View style={{flex: 1, backgroundColor: 'white'}} >
      <View style={{ ...style.row, height: 60}}>
        <Text>Họ & Tên: </Text>
        <Text>{userInfo.fullName}</Text>
      </View>
      <View style={{ ...style.row, height: 50}}>
        <Icon name='key' color={'red'} size={25}/>
        <Text style={{marginLeft: 15}}>Đổi mật khẩu</Text>
      </View>
      <TouchableOpacity onPress={() => signOut()} style={{ ...style.row, height: 50}}>
        <Icon name='log-out' color={'red'} size={25}/>
        <Text style={{marginLeft: 15}}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  )
};

const style = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingHorizontal: 15
  }
})
export default User;