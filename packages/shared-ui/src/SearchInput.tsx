import React from 'react';
import {View, StyleSheet, TextInput, Platform} from 'react-native';
import Icon from './Icon/Icon';
import {Colors} from './Colors';

type Props = React.ComponentPropsWithRef<typeof TextInput>;

const SearchInput: React.FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Icon name={'search'} style={styles.icon} size={20} />
      <TextInput style={styles.input} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    height: 36,
    borderColor: Colors.gray200,
    borderWidth: 1,
    borderRadius: 18,
    alignItems: 'center',
    backgroundColor: Colors.gray100,
  },
  icon: {
    margin: 10,
  },
  input: {
    flex: 1,
    color: Colors.gray500,
    padding: 0,
    ...(Platform.OS === 'web' ? {outline: 'none'} : {}),
  },
});

export default SearchInput;
