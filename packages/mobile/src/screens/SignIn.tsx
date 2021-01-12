import React from 'react';
import {Text, View, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import InputText from '../components/InputText';
import color from '../config/color';
import {useAuthState} from '../context/auth-context';
// @ts-ignore
import Spinner from 'react-native-loading-spinner-overlay';

const SignIn: React.FC = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const {signIn, dispatch, state} = useAuthState();

  return (
    <SafeAreaView
      style={{
        backgroundColor: color.blue,
        flex: 1,
        justifyContent: 'space-between',
      }}>
      <Spinner
        visible={state.isSubmitting}
        textContent={''}
      />
      <View>
        <View style={{ alignItems: 'center', paddingVertical: 50}}>
          <View style={{backgroundColor: 'white', width: 150, height: 150, borderRadius: 75, alignItems: 'center', justifyContent: 'center'}}>
            <Image style={{width: 100, height: 100}} source={require('../assets/images/LogoApp.png')} width={100} height={100}/>
          </View>
        </View>
        <InputText
          label={'username'}
          onChangeText={(val) => setUsername(val)}
          keyboardType={'default'}
        />
        <InputText
          label={'password'}
          onChangeText={(val) => setPassword(val)}
        />
        <View style={{marginTop: 50}}>
          <TouchableOpacity
            onPress={() => {
              dispatch({type: 'SUBMITTING'});
              signIn(username, password);
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: '#FFF',
                fontSize: 25,
                fontWeight: 'bold',
                marginTop: 20,
                textDecorationLine: 'underline',
              }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
