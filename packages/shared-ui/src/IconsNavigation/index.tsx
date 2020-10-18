import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors, Icon} from '../';
import NavigationElement from './NavigationElement';

type Item = {
  label: string;
  icon: string;
  color: string;
  colorLight: string;
  onPress?: () => void;
};

type Props = {
  items: Item[];
  style?: any;
};

const Navigation: React.FC<Props> = ({items, style}) => {
  return (
    <View style={[styles.navigation, style]}>
      {items.map((item) => (
        <NavigationElement
          key={item.label}
          label={item.label}
          color={item.color}
          colorLight={item.colorLight}
          onPress={item.onPress}>
          <Icon name={item.icon} color={Colors.white400} size={20} />
        </NavigationElement>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  navigation: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 24,
  },
});

export default Navigation;
