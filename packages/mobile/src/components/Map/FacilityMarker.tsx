import React from 'react';
import {TouchableWithoutFeedback, StyleSheet, Image} from 'react-native';

export type MarkerType = 'primary' | 'filled' | 'dark';

type Props = {
  type: string;
  onPress?: () => void;
};

const icons: {[key: string]: string} = {
  airport: require(`../../assets/airport.png`),
  'hight-way': require(`../../assets/highway.png`),
  bridge: require(`../../assets/bridge.png`),
};

const FacilityMarker = ({type, onPress}: Props) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Image
        style={styles.image}
        // @ts-ignore
        source={icons[type]}
        accessibilityIgnoresInvertColors
        width={30}
        height={30}
      />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30,
  },
});

export default FacilityMarker;
