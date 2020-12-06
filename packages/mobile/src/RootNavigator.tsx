import * as React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import {setToken} from 'shared-logic';
import Config from 'react-native-config';
import SignIn from './screens/SignIn';
import Home from './screens/Home';

import {useAuthState} from './context/auth-context';
import User from './screens/User';
import DeviceInformation from './screens/DeviceInformation';
import TransportHistoryFilter from "./screens/TransportHistoryFilter";
import TransportHistory from "./screens/TransportHistory";

export type MainStackParamList = {
  Home: undefined;
  SignIn: undefined;
  User: undefined;
  TransportHistoryFilter: {deviceId: string};
  DeviceInformation: {deviceId: string};
  TransportHistory: {data: Array<any>};
};

const Stack = createStackNavigator<MainStackParamList>();

const AppRoot = () => {
  const {state, dispatch, signIn} = useAuthState();

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      AsyncStorage.getItem('userData')
        .then((userData) => {
          if (userData) {
            const user = JSON.parse(userData);
            if (user.userToken) {
              fetch(`${Config.API_URL}/User/Getinfo`, {
                method: 'get',
                headers: new Headers({
                  API_KEY: user.userToken,
                }),
              }).then((res) => {
                if (res.status === 200) {
                  res.json().then((data) => {
                    setToken(user?.userToken);
                    dispatch({
                      type: 'RESTORE_TOKEN',
                      userData: {...user, ...data},
                    });
                  });
                } else {
                  signIn(user.userName, user.originalPassword);
                }
              });
            }
          } else {
            dispatch({type: 'RESTORE_TOKEN', userData: {}});
          }
        })
        .catch(() => {
          dispatch({type: 'RESTORE_TOKEN', userData: {}});
        });
    };

    bootstrapAsync();
  }, []);

  if (state.isLoading) {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          alignContent: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            color: 'blue',
            fontSize: 25,
            textAlign: 'center',
          }}>
          SBIKE
        </Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {state.userData.userToken ? (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={(props) => {
                return {
                  headerLeft: () => (
                    <View style={{marginLeft: 15}}>
                      <Image
                        source={require('../src/assets/images/LogoApp.png')}
                        style={{width: 30, height: 30}}
                      />
                    </View>
                  ),
                  headerTitle: 'Sbike',
                  headerRight: () => (
                    <View style={{flexDirection: 'row', paddingRight: 10}}>
                      <TouchableOpacity
                        onPress={() => props.navigation.navigate('User')}
                        style={{marginRight: 15}}>
                        <Icon name="user" color={'blue'} size={25} />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Icon name="bell" color={'red'} size={25} />
                      </TouchableOpacity>
                    </View>
                  ),
                };
              }}
            />
            <Stack.Screen
              name="User"
              options={{
                headerTitle: 'User',
                headerBackTitle: ' ',
              }}
              component={User}
            />
            <Stack.Screen
              name="DeviceInformation"
              options={{
                headerTitle: 'Thông tin thiết bị',
                headerBackTitle: ' ',
              }}
              component={DeviceInformation}
            />
            <Stack.Screen
              name="TransportHistoryFilter"
              options={{
                headerTitle: 'Lịch sử di chuyển',
                headerBackTitle: ' ',
              }}
              component={TransportHistoryFilter}
            />
            <Stack.Screen
              name="TransportHistory"
              options={{
                headerTitle: 'Chi tiết di chuyển',
                headerBackTitle: ' ',
              }}
              component={TransportHistory}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="SignIn"
              options={{
                headerShown: false,
              }}
              component={SignIn}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRoot;
