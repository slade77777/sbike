import React from 'react';
import {Colors} from 'shared-ui';
import {View, StyleSheet, Image, Text} from 'react-native';

type Props = {
  thumbnail: string;
  priceRange: string;
  name: string;
  address: string;
};

const OnSaleProjectTile: React.FC<Props> = ({
  thumbnail,
  priceRange,
  name,
  address,
}) => (
  <View>
    <View style={styles.container}>
      <Image
        style={styles.leadingImage}
        source={thumbnail ? {uri: thumbnail} : {}}
        accessibilityIgnoresInvertColors
      />
      <View style={styles.rightContainer}>
        <Text style={styles.priceRange}>{priceRange}</Text>
        <Text style={styles.projectName}>{name}</Text>
        <Text style={styles.address}>{address}</Text>
      </View>
    </View>
    <View style={styles.bottomDivider} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  leadingImage: {
    width: 100,
    height: 100,
  },
  rightContainer: {
    marginLeft: 12,
  },
  address: {
    color: Colors.gray400,
    fontSize: 16,
    lineHeight: 20,
  },
  priceRange: {
    marginBottom: 4,
    color: Colors.red500,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: 'bold',
  },
  projectName: {
    marginBottom: 4,
    color: Colors.gray500,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 'bold',
  },
  bottomDivider: {
    backgroundColor: Colors.gray300,
    height: 1,
    width: '100%',
    marginTop: 24,
    marginBottom: 24,
  },
});

export default OnSaleProjectTile;
