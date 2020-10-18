import React from 'react';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
} from '@react-navigation/material-top-tabs';
import {useTranslation} from 'react-i18next';
import {RouteProp, useRoute} from '@react-navigation/native';
import {MainStackParamList} from '../../RootNavigator';
import Overview from './Overview';
import Location from './Location';
import Facilities from './Facilities';
import ConstructionProgress from './ConstructionProgress';

const Tab = createMaterialTopTabNavigator();

const ProjectGallery: React.FC = () => {
  const {t} = useTranslation();
  const {params} = useRoute<RouteProp<MainStackParamList, 'ProjectGallery'>>();

  return (
    <Tab.Navigator
      lazy
      initialRouteName={params.screen || 'Overview'}
      tabBar={(props) => <MaterialTopTabBar {...props} scrollEnabled={true} />}>
      <Tab.Screen
        name="Overview"
        component={Overview}
        options={{title: t('screens.projectDetails.gallery.overview')}}
      />
      <Tab.Screen
        name="Facilities"
        component={Facilities}
        options={{title: t('screens.projectDetails.gallery.facilities')}}
      />
      <Tab.Screen
        name="Progress"
        component={ConstructionProgress}
        options={{title: t('screens.projectDetails.gallery.progress')}}
      />
      <Tab.Screen
        name="Location"
        component={Location}
        options={{title: t('screens.projectDetails.gallery.location')}}
      />
    </Tab.Navigator>
  );
};

export default ProjectGallery;
