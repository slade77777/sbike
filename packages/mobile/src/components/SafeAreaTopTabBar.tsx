import {
  MaterialTopTabBar,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const SafeAreaTopTabBar: React.FC<MaterialTopTabBarProps> = (props) => {
  const insets = useSafeAreaInsets();
  return (
    <MaterialTopTabBar
      scrollEnabled={true}
      style={{paddingTop: insets.top}}
      {...props}
    />
  );
};

export default SafeAreaTopTabBar;
