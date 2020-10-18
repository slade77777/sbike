import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {L4} from '../';

type Props = {
  label: string;
  color: string;
  colorLight: string;
  children?: React.ReactNode;
  onPress?: () => void;
};

const NavigationElement: React.FC<Props> = ({
  label,
  color,
  colorLight,
  children,
  onPress,
}: Props) => {
  return (
    <View style={styles.element}>
      <TouchableOpacity onPress={onPress}>
        <LinearGradient colors={[color, colorLight]} style={styles.icon}>
          {children}
        </LinearGradient>
      </TouchableOpacity>
      <L4>{label}</L4>
    </View>
  );
};

const styles = StyleSheet.create({
  element: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    display: 'flex',
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderRadius: 25,
  },
});

export default NavigationElement;
