import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {GalleryItem, GalleryKind, StoreState} from 'shared-logic';
import PhotoGrid from '../../components/PhotoGrid';

const ConstructionProgress: React.FC = () => {
  const {overviewImages} = useSelector<
    StoreState,
    {
      overviewImages: GalleryItem[];
    }
  >((state) => {
    return {
      overviewImages: state.gallery?.galleries?.[GalleryKind.PROGRESS] ?? [],
    };
  });

  const photos = overviewImages.map((item) => {
    return item.url;
  });

  return (
    <View style={styles.container}>
      <PhotoGrid photos={photos} style={styles.grid} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
  },
  grid: {
    height: '100%',
  },
});

export default ConstructionProgress;
