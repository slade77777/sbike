import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';
import {FlatGrid} from 'react-native-super-grid';

type Props = {
  photos: string[];
  style?: ViewStyle;
};

const PhotoGrid: React.FC<Props> = ({photos, style}) => {
  const renderItem = ({item}: {item: string}) => (
    <FastImage
      source={{uri: item}}
      accessibilityIgnoresInvertColors
      style={styles.image}
    />
  );

  return (
    <FlatGrid
      style={style}
      itemDimension={130}
      data={photos}
      renderItem={renderItem}
      initialNumToRender={6}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    height: 200,
  },
});

export default PhotoGrid;
