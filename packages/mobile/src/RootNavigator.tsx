import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as ComponentsProvider} from 'shared-ui';
import Home from './screens/Home';
import ArticleDetails from './screens/ArticleDetails';
import Mortgage from './screens/Mortgage';
import PostForSale from './screens/PostForSale';
import SignIn from './screens/SignIn';
import AsyncStorage from '@react-native-community/async-storage';
import {User, login} from 'shared-logic';
const AES = require("react-native-crypto-js").AES;
import {View, Text} from 'react-native';

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

type Props = {
  signIn?: (params: User) => void,
  data?: {
    session: string;
  } | null;
}

const Stack = createStackNavigator<MainStackParamList>();
export const AuthContext = React.createContext({
  signIn: (username?: string, password?: string) => {
    console.log(username, password)
  }
});

const AppRoot: React.FC<Props> = () => {

  const [state, dispatch] = React.useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (username?: string, password?: string) => {
        login({userName: username || '', password: password ? AES.encrypt(password, '{60F9sG3*vpfCknu').toString() : ''})
          .then(data  => {
          dispatch({type: 'SIGN_IN', token: data.session});
        }).catch(error => console.log(error));
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      signUp: async () => {

        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
    }),
    []
  );

  if (state.isLoading) {
    return (
      <View style={{ width: '100%', height: '100%', backgroundColor: 'white', alignContent: 'center', justifyContent: 'center'}}>
        <Text style={{ fontWeight: 'bold', color: 'blue', fontSize: 25, textAlign: 'center'}}>SBIKE</Text>
      </View>
    )
  }

  return (
    <AuthContext.Provider value={authContext}>
      <ComponentsProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {
              state.userToken ?
                <>
                  <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen name="ArticleDetails" component={ArticleDetails}/>
                  <Stack.Screen name="Mortgage" component={Mortgage}/>
                  <Stack.Screen name="PostForSale" component={PostForSale}/>
                </>
                : <>
                  <Stack.Screen name="SignIn" options={{
                    headerShown: false,
                  }} component={SignIn}/>
                </>
            }
          </Stack.Navigator>
        </NavigationContainer>
      </ComponentsProvider>
    </AuthContext.Provider>
  );
}

export default AppRoot;
