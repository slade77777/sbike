import * as React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/Home';
import SignIn from './screens/SignIn';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import {setToken} from 'shared-logic';

import {useAuthState} from "./context/auth-context";
import User from "./screens/User";

export type MainStackParamList = {
  Home: undefined;
  SignIn: undefined;
  User: undefined;
};

const Stack = createStackNavigator<MainStackParamList>();

const AppRoot = () => {

  const {state, dispatch} = useAuthState();

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      AsyncStorage.getItem('userData').then((userData) => {
        if (userData) {
          const user = JSON.parse(userData);
          setToken(user?.userToken);
          dispatch({type: 'RESTORE_TOKEN', userData: user });
        } else {
          dispatch({type: 'RESTORE_TOKEN', userData: {} });
        }
      }).catch(() => {
        dispatch({type: 'RESTORE_TOKEN', userData: {} });
      })
    };

    bootstrapAsync();
  }, []);

  if (state.isLoading) {
    return (
      <View style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        alignContent: 'center',
        justifyContent: 'center'
      }}>
        <Text style={{fontWeight: 'bold', color: 'blue', fontSize: 25, textAlign: 'center'}}>SBIKE</Text>
      </View>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          state.userData.userToken ?
            <>
              <Stack.Screen name="Home" component={Home} options={(props) => {
                return ({
                  headerLeft: () => (
                    <View style={{marginLeft: 15}}>
                      <Image source={require('../src/assets/images/LogoApp.png')} style={{ width: 30, height: 30}}/>
                    </View>
                  ),
                  headerTitle: 'Sbike',
                  headerRight: () => (
                    <View style={{flexDirection: 'row', paddingRight: 10}}>
                      <TouchableOpacity onPress={() => props.navigation.navigate('User')} style={{marginRight: 15}}>
                        <Icon name='user' color={'blue'} size={25}/>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Icon name='bell' color={'red'} size={25}/>
                      </TouchableOpacity>
                    </View>
                  )
                })
              }}/>
              <Stack.Screen name='User' options={{
                headerTitle: 'User'
              }} component={User}/>
            </>
            : <>
              <Stack.Screen name="SignIn" options={{
                headerShown: false,
              }} component={SignIn}/>
            </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppRoot;
