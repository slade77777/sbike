import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as ComponentsProvider} from 'shared-ui';
import {useTranslation} from 'react-i18next';
import {Apartment} from 'shared-logic';
import Home from './screens/Home';
import ArticleDetails from './screens/ArticleDetails';
import Mortgage from './screens/Mortgage';
import PostForSale from './screens/PostForSale';
import SignIn from './screens/SignIn';
import AgentDetails from './screens/AgentDetails';
import TermsAndConditions from './screens/TermsAndConditions';
import ProjectGallery from './screens/ProjectGallery/ProjectGallery';
import ApartmentDetails from './screens/ApartmentDetails/ApartmentDetails';
import ContactModal from './screens/ContactModal/ContactModal';
import {ContactType} from './screens/ContactModal/ContactForm';

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
  const {t} = useTranslation();

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
            <Stack.Screen
              name="AgentDetails"
              component={AgentDetails}
              options={{title: t('screens.agentDetails.title')}}
            />
            <Stack.Screen name="Mortgage" component={Mortgage} />
            <Stack.Screen name="PostForSale" component={PostForSale} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="ContactModal" component={ContactModal} />
            <Stack.Screen
              name="ApartmentDetails"
              component={ApartmentDetails}
              options={{title: t('screens.apartmentDetails.title')}}
            />
            <Stack.Screen
              name="ProjectGallery"
              component={ProjectGallery}
              options={{title: t('screens.projectDetails.gallery.title')}}
            />
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
