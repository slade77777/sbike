import React from 'react';
import {Text, TouchableWithoutFeedback, StyleSheet, View} from 'react-native';
import {Colors} from 'components-library';

export type MarkerType = 'primary' | 'filled' | 'dark';

const backgroundColor: {[key: string]: string} = {
  primary: Colors.white400,
  filled: Colors.blue500,
  dark: Colors.gray500,
};

const color: {[key: string]: string} = {
  primary: Colors.gray500,
  filled: Colors.white400,
  dark: Colors.white400,
};

type Props = {
  name: string;
  propertiesCount?: number;
  type: MarkerType;
  onClick?: () => void;
};

const ProjectMarker = ({
  name,
  propertiesCount,
  onClick,
  type = 'primary',
}: Props) => {
  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: backgroundColor[type],
            borderColor: type === 'dark' ? 'transparent' : Colors.gray300,
          },
        ]}>
        <Text
          style={[
            styles.name,
            {
              backgroundColor:
                type === 'primary' ? Colors.blue500 : 'transparent',
            },
          ]}>
          {name}
        </Text>
        {propertiesCount && (
          <Text style={[styles.count, {color: color[type]}]}>
            {propertiesCount} căn
          </Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'row',
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: 28,
    minWidth: 56,
    borderWidth: 0.5,
    borderRadius: 14,
    overflow: 'hidden',
  },
  name: {
    color: Colors.white400,
    left: 0,
    paddingVertical: 5,
    paddingHorizontal: 8,
    height: '100%',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
  },
  count: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    fontWeight: 'bold',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
});

export default ProjectMarker;
