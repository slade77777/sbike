import React from 'react';
import {
  StyleSheet,
  View,
  ImageSourcePropType,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Colors} from 'shared-ui';

type Props = {
  style?: any;
  title?: () => JSX.Element;
  description?: () => JSX.Element;
  coverPhoto: ImageSourcePropType;
  onPress?: () => void;
};

const Card: React.FC<Props> = ({
  title,
  description,
  coverPhoto,
  style,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[style, styles.container]}>
        <View style={styles.image}>
          <Image
            source={coverPhoto}
            style={styles.image}
            accessibilityIgnoresInvertColors
            resizeMode="contain"
          />
        </View>
        <View style={styles.title}>{title?.()}</View>
        <View style={styles.description}>{description?.()}</View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gray300,
    flexDirection: 'column',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: Colors.gray200,
  },
  title: {padding: 15},
  description: {padding: 15},
});

export default Card;
