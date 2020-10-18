import React from 'react';
import {H4, L2} from 'components-library';
import {View, Image, StyleSheet} from 'react-native';
const Checkmark = '../../assets/checkmark.png';

type Props = {
  title: string;
  description: string;
};

const Bulletpoint: React.FC<Props> = ({title, description}) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.icon}
        source={require(Checkmark)}
        accessibilityIgnoresInvertColors
      />
      <View>
        <H4>{title}</H4>
        <L2>{description}</L2>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
    width: '83%',
  },
  icon: {
    width: 48,
    height: 48,
    marginRight: 20,
  },
});

export default Bulletpoint;
