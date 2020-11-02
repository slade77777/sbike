import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/Home';
import SignIn from './screens/SignIn';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

import {useAuthState} from "./context/auth-context";

export type MainStackParamList = {
  Home: undefined;
  ArticleDetails: { id: string };
  AgentDetails: { id: string };
  Mortgage: undefined;
  PostForSale: undefined;
  SignIn: undefined;
  TermsAndConditions: undefined;
  ProjectGallery: {
    screen?: string;
  };
};

const Stack = createStackNavigator<MainStackParamList>();

const AppRoot = () => {

  const {state, dispatch} = useAuthState();

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userData;
      try {
        userData = await AsyncStorage.getItem('userData');
        dispatch({type: 'RESTORE_TOKEN', userData: userData ? JSON.parse(userData) : {} });
      } catch (e) {
        // Restoring token failed
      }
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
              <Stack.Screen name="Home" component={Home} options={{
                headerLeft: () => (
                  <View style={{marginLeft: 15}}>
                    <Icon name='map-marker' color={'red'} size={25}/>
                  </View>
                ),
                headerTitle: 'Sbike',
                headerRight: () => (
                  <View style={{flexDirection: 'row', paddingRight: 10}}>
                    <TouchableOpacity style={{marginRight: 15}}>
                      <Icon name='user' color={'blue'} size={25}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Icon name='bell' color={'red'} size={25}/>
                    </TouchableOpacity>
                  </View>
                )
              }}/>
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
