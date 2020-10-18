import React from 'react';
import {TouchableOpacity, View, StyleSheet, Platform} from 'react-native';
import Icon from './Icon/Icon';
import {Colors} from './Colors';
import {L3} from './typography/Typography';

export type ButtonType = 'outlined' | 'contained' | 'text';

type Props = {
  title?: string;
  leftIconName?: string;
  rightIconName?: string;
  type?: ButtonType;
  color?: string;
  onPress?: () => void;
  style?: any;
};

const Button: React.FC<Props> = ({
  title,
  leftIconName,
  rightIconName,
  type = 'outlined',
  color = Colors.blue500,
  onPress,
  style,
}) => {
  const backgroundColors = {
    outlined: Colors.white400,
    contained: color,
    text: Colors.transparent,
  };

  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <View
        style={[
          styles.container,
          style,
          {
            backgroundColor: backgroundColors[type],
            borderColor: type === 'text' ? Colors.transparent : Colors.blue500,
          },
        ]}>
        <View>
          {leftIconName && (
            <Icon
              name={leftIconName}
              color={
                type === 'outlined' || type === 'text' ? color : Colors.white400
              }
              size={16}
              style={styles.iconLeft}
            />
          )}
        </View>
        {title && (
          <L3
            style={{
              color:
                type === 'outlined' || type === 'text'
                  ? color
                  : Colors.white400,
            }}>
            {title}
          </L3>
        )}
        <View>
          {rightIconName && (
            <Icon
              name={rightIconName}
              color={
                type === 'outlined' || type === 'text' ? color : Colors.white400
              }
              size={16}
              style={styles.iconRight}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
    borderWidth: 1,
    borderColor: Colors.blue500,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    ...(Platform.OS === 'web' ? {width: 'inherit'} : {}),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  iconLeft: {
    marginRight: 10,
  },
  iconRight: {
    marginLeft: 10,
  },
});

export default Button;
