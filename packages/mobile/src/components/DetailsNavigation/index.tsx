import {Colors} from 'components-library';
import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {GalleryKind} from 'shared-logic';

export type Detail = {
  text: string;
  hero_url: any;
  collection: GalleryKind;
};

type Props = {
  details: Detail[];
  onPress: (id: GalleryKind) => any;
};

const DetailsNavigation: React.FC<Props> = ({details, onPress}) => {
  return (
    <ScrollView
      horizontal
      style={styles.container}
      showsHorizontalScrollIndicator={false}>
      {details.map((detail) => (
        <TouchableOpacity
          activeOpacity={1}
          key={detail.collection}
          style={styles.detailContainer}
          onPress={() => onPress(detail.collection)}>
          <ImageBackground
            source={detail.hero_url}
            style={styles.image}
            imageStyle={styles.imageStyle}
          />

          <Text style={styles.text}>{detail.text}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 18,
    paddingHorizontal: 6,
    flexGrow: 0,
    marginBottom: 12,
  },
  detailContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginHorizontal: 6,
  },
  image: {
    backgroundColor: Colors.gray400,
    width: 112,
    height: 84,
    marginBottom: 12,
    borderRadius: 8,
  },
  imageStyle: {
    borderRadius: 8,
  },
  text: {
    color: Colors.black500,
    fontWeight: 'bold',
  },
});

export default DetailsNavigation;
