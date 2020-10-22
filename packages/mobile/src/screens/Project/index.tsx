import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors, Button, L1_Bold} from 'shared-ui';
import {StackNavigationProp} from '@react-navigation/stack';
import {MainStackParamList} from '../../RootNavigator';

type Props = {
  navigation: StackNavigationProp<MainStackParamList>;
};

const ProjectScreen: React.FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <L1_Bold>Màn hình test</L1_Bold>
      <Button style={styles.button} onPress={() => {}} title="Test" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white400,
  },
  button: {
    marginTop: 5,
  },
});

export default ProjectScreen;
