import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Icon, L2} from 'components-library';
import {useNavigation} from '@react-navigation/native';

type Props = {
  onPress?: () => void;
  navigateTo?: string;
  text: string;
};

const MoreListItem: React.FC<Props> = ({onPress, text, navigateTo}) => {
  const navigation = useNavigation();

  const handlePress = React.useCallback(() => {
    if (!navigateTo) {
      return;
    }
    navigation.navigate(navigateTo);

    onPress?.();
  }, [navigation, navigateTo]);
  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <L2>{text}</L2>
      <Icon name="arrow-right" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default MoreListItem;
