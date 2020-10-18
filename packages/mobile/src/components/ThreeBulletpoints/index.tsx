import React from 'react';
import {Button, H2} from 'shared-ui';
import {View, StyleSheet} from 'react-native';
import Bulletpoint from './Bulletpoint';

export type Guideline = {
  title: string;
  description: string;
};

type Props = {
  header: string;
  first: Guideline;
  second: Guideline;
  third: Guideline;
  buttonLabel: string;
  onButtonClick: () => void;
};

const ThreeBulletpoints: React.FC<Props> = ({
  header,
  first,
  second,
  third,
  buttonLabel,
  onButtonClick,
}) => {
  return (
    <View style={styles.container}>
      <H2 style={styles.header}>{header}</H2>
      <View>
        <Bulletpoint title={first.title} description={first.description} />
        <Bulletpoint title={second.title} description={second.description} />
        <Bulletpoint title={third.title} description={third.description} />
      </View>

      <Button
        style={styles.button}
        title={buttonLabel}
        onPress={onButtonClick}
        type="contained"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    padding: 20,
  },
  header: {
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    marginTop: 20,
  },
});

export default ThreeBulletpoints;
