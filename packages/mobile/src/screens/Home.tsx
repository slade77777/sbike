import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Colors} from 'shared-ui';
import React from 'react';
import {useTranslation} from 'react-i18next';
import TabBarIcon from '../components/TabBarIcon';
import Agents from './Agents';
import ArticlesNavigator from './Articles/ArticlesNavigator';
import More from './More/More';
import Project from './Project';
import PropertyListing from './PropertyListing/PropertyListing';

export type MainParamList = {
  Primary: undefined;
  Secondary: undefined;
  Articles: undefined;
  Agents: undefined;
  More: undefined;
};

const TabNavigator = createBottomTabNavigator<MainParamList>();

const Home: React.FC = () => {
  const {t} = useTranslation();
  return (
    <TabNavigator.Navigator
      initialRouteName="Primary"
      tabBarOptions={{
        activeTintColor: Colors.brand,
        showLabel: false,
      }}>
      <TabNavigator.Screen
        name="Primary"
        component={Project}
        options={{
          tabBarIcon: ({color}) => (
            <TabBarIcon
              title={t('screens.bottomNavbar.primary')}
              icon="home"
              color={color}
            />
          ),
        }}
      />
      <TabNavigator.Screen
        name="Secondary"
        component={PropertyListing}
        options={{
          tabBarIcon: ({color}) => (
            <TabBarIcon
              title={t('screens.bottomNavbar.secondary')}
              icon="map"
              color={color}
            />
          ),
        }}
      />
      <TabNavigator.Screen
        name="Articles"
        component={ArticlesNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <TabBarIcon
              title={t('screens.bottomNavbar.articles')}
              icon="article"
              color={color}
            />
          ),
        }}
      />
      <TabNavigator.Screen
        name="Agents"
        component={Agents}
        options={{
          tabBarIcon: ({color}) => (
            <TabBarIcon
              title={t('screens.bottomNavbar.agents')}
              icon="profileIcon"
              color={color}
            />
          ),
        }}
      />
      <TabNavigator.Screen
        name="More"
        component={More}
        options={{
          tabBarIcon: ({color}) => (
            <TabBarIcon
              title={t('screens.bottomNavbar.more')}
              icon="menu"
              color={color}
            />
          ),
        }}
      />
    </TabNavigator.Navigator>
  );
};

export default Home;
