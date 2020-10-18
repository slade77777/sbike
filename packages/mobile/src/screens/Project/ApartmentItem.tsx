import React from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors, H3} from 'components-library';

type Props = {
  id: string;
  area?: string;
  projectName: string;
  apartmentName: string;
  squareMeters: string | number;
  thumbnail: string;
  onPress: () => void;
};

const ApartmentItem: React.FC<Props> = ({
  onPress,
  area,
  projectName,
  apartmentName,
  squareMeters,
  thumbnail,
}) => {
  let name = area;
  name += projectName ? ` - ${projectName}` : '';

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={styles.container}>
      <H3 style={styles.name}>{name}</H3>
      <View style={styles.subContainer}>
        <Text style={styles.apartmentName}>{apartmentName}</Text>
        <Text style={styles.squareMeters}>{squareMeters} &#13217;</Text>
      </View>

      <ImageBackground
        source={{uri: thumbnail}}
        style={styles.image}
        imageStyle={styles.imageStyle}
      />
    </TouchableOpacity>
  );
};

const {width: screenWidth} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    marginLeft: 12,
    width: screenWidth - 120,
    marginRight: 24,
  },
  name: {
    textTransform: 'uppercase',
    overflow: 'hidden',
    color: Colors.gray400,
    fontSize: 12,
    fontWeight: 'bold',
    margin: 0,
  },
  subContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  apartmentName: {
    flex: 3,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.gray500,
  },
  squareMeters: {
    flex: 1,
    textAlign: 'right',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 12,
  },
  imageStyle: {
    borderRadius: 12,
  },
});

export default ApartmentItem;
