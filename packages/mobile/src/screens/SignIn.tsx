import React from 'react';
import {Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import InputText from '../components/InputText';
import color from '../config/color';
import {useAuthState} from '../context/auth-context';

const SignIn: React.FC = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const {signIn} = useAuthState();

  return (
    <SafeAreaView
      style={{
        backgroundColor: color.blue,
        flex: 1,
        justifyContent: 'space-between',
      }}>
      <View>
        <View>
          <Text
            style={{
              textAlign: 'center',
              color: '#FFF',
              fontWeight: 'bold',
              fontSize: 40,
              letterSpacing: 4,
              marginTop: 40,
            }}>
            Sbike
          </Text>
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
      <View style={{marginBottom: 20}}>
        <Text style={{textAlign: 'center', color: '#FFF', fontSize: 15}}>
          No account?
        </Text>
        <TouchableOpacity style={{}} onPress={() => {}}>
          <Text
            style={{
              textAlign: 'center',
              color: '#FFF',
              fontWeight: 'bold',
              fontSize: 20,
              textDecorationLine: 'underline',
            }}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
