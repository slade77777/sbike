import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from 'shared-ui';
import LottieView from 'lottie-react-native';

type Props = {
  transparent?: boolean;
};

export default function LoadingView({transparent = false}: Props) {
  return (
    <View
      style={[
        styles.root,
        {backgroundColor: transparent ? Colors.transparent : Colors.white400},
      ]}>
      <LottieView
        style={styles.loading}
        resizeMode="contain"
        autoPlay
        loop={true}
        source={require('../assets/jsons/loading.json')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  loading: {
    width: 150,
    height: 150,
  },
});
