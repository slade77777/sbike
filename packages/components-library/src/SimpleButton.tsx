import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from './Icon/Icon';
import {N_DEFAULT} from './typography/Typography';

type Props = {
  text?: string;
  imageName?: string;
  styles: {container: any; title?: any; image?: any};
  onPress?: () => void;
};

const SimpleButton: React.FC<Props> = ({text, imageName, styles, onPress}) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <View>
      {text && <N_DEFAULT style={styles.title}>{text}</N_DEFAULT>}
      {imageName && (
        <Icon
          name={imageName}
          size={styles.image.size}
          color={styles.image.color}
        />
      )}
    </View>
  </TouchableOpacity>
);

export default SimpleButton;
