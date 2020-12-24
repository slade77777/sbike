import React, {useEffect, useState} from 'react';
import {Dimensions, SafeAreaView} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import Observer from '../components/Home/Observer';
import Devices from '../components/Home/Devices';
import Report from "../components/Home/Report";
import color from '../config/color';
import messaging from "@react-native-firebase/messaging";
import {registerTopic} from "shared-logic/src/api/firebase";
import {useAuthState} from "../context/auth-context";

const Home: React.FC = () => {
  const [index, setIndex] = useState(0);
  const {state} = useAuthState();
  const userInfo = state?.userData;

  const [routes] = useState([
    {key: 'first', title: 'Giám sát'},
    {key: 'second', title: 'Thiết bị'},
    {key: 'third', title: 'Báo cáo'},
  ]);

  const renderScene = SceneMap({
    first: Observer,
    second: Devices,
    third: Report,
  });

  useEffect(() => {
    messaging()
      .requestPermission()
      .then((result) => {
        const enabled =
          result === messaging.AuthorizationStatus.AUTHORIZED ||
          result === messaging.AuthorizationStatus.PROVISIONAL;
        if (enabled) {
          messaging()
            .getToken()
            .then((token) => {
              registerTopic(userInfo?.companyID || '', token)
                .then((result) => {
                  console.log(result);
                })
                .catch((error) => {
                  console.log(error);
                });
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: color.blue}}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        tabBarPosition="bottom"
        initialLayout={{width: Dimensions.get('window').width}}
      />
    </SafeAreaView>
  );
};

export default Home;
