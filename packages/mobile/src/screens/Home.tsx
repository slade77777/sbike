import React, {useState} from 'react';
import {Dimensions, SafeAreaView} from "react-native";
import { TabView, SceneMap } from 'react-native-tab-view';
import Observer from "../components/Home/Observer";
import Device from "../components/Home/Device";
import Report from "../components/Home/Report";
import color from "../config/color";
import {useAuthState} from "../context/auth-context";
import useDeviceCompany from "shared-logic/src/hooks/useDeviceCompany";

const Home: React.FC = () => {

  const [index, setIndex] = useState(0);

  const {state} = useAuthState();
  const userInfo = state?.userData;

  const { isLoading, isError, data, error } = useDeviceCompany(userInfo?.companyID);

  const [routes] = useState([
    { key: 'first', title: 'Giám sát' },
    { key: 'second', title: 'Thiết bị' },
    { key: 'third', title: 'Báo cáo' },
  ]);

  const renderScene = SceneMap({
    first: Observer,
    second: Device,
    third: Report,
  });

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: color.blue}}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        tabBarPosition='bottom'
        initialLayout={{width: Dimensions.get('window').width}}
      />
    </SafeAreaView>
  );
};

export default React.memo(Home);
