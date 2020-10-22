import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Colors} from 'shared-ui';
import React from 'react';
import TabBarIcon from '../components/TabBarIcon';
import More from './More/More';
import Project from './Project';

export type MainParamList = {
  Primary: undefined;
  Secondary: undefined;
  Articles: undefined;
  Agents: undefined;
  More: undefined;
};

const TabNavigator = createBottomTabNavigator<MainParamList>();

const Home: React.FC = () => {
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
            <TabBarIcon title="Chủ đầu tư" icon="home" color={color} />
          ),
        }}
      />
      <TabNavigator.Screen
        name="More"
        component={More}
        options={{
          tabBarIcon: ({color}) => (
            <TabBarIcon title="Thêm" icon="menu" color={color} />
          ),
        }}
      />
    </TabNavigator.Navigator>
  );
};

export default Home;
