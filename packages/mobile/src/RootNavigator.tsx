import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as ComponentsProvider} from 'shared-ui';
import {Apartment} from 'shared-logic';
import Home from './screens/Home';
import ArticleDetails from './screens/ArticleDetails';
import Mortgage from './screens/Mortgage';
import PostForSale from './screens/PostForSale';
import SignIn from './screens/SignIn';
import TermsAndConditions from './screens/TermsAndConditions';

export type MainStackParamList = {
  Home: undefined;
  ArticleDetails: {id: string};
  AgentDetails: {id: string};
  Mortgage: undefined;
  PostForSale: undefined;
  SignIn: undefined;
  TermsAndConditions: undefined;
  ContactModal: {type: ContactType};
  ProjectGallery: {
    screen?: string;
  };
  ApartmentDetails: {apartment: Apartment};
};

const Stack = createStackNavigator<MainStackParamList>();

function AppRoot() {
  return (
    <>
      <ComponentsProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="ArticleDetails" component={ArticleDetails} />
            <Stack.Screen name="Mortgage" component={Mortgage} />
            <Stack.Screen name="PostForSale" component={PostForSale} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen
              name="TermsAndConditions"
              component={TermsAndConditions}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ComponentsProvider>
    </>
  );
}

export default AppRoot;
