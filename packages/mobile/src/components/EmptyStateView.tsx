import {View, StyleSheet, Image, ImageProps} from 'react-native';
import React from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import {Colors, M_500_16_24, R_Normal_16_24} from 'components-library';

type Props = {
  errorMessage?: string;
  errorContent?: string;
  source?: ImageProps;
  height?: number | null;
  styleImage?: any;
};

export default function EmptyStateView({
  errorMessage,
  errorContent,
  source,
  height,
  styleImage,
}: Props) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.root, {height: height ?? '100%'}]}>
        {source && (
          <Image
            source={source}
            style={styleImage ?? styles.image}
            accessibilityIgnoresInvertColors
          />
        )}
        {errorMessage && (
          <M_500_16_24 style={styles.text}>{errorMessage}</M_500_16_24>
        )}
        {errorContent && (
          <R_Normal_16_24 style={styles.content}>{errorContent}</R_Normal_16_24>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    alignItems: 'center',
    backgroundColor: Colors.white400,
  },
  image: {
    height: 240,
    width: 240,
  },
  text: {
    marginHorizontal: 40,
    fontSize: 16,
    marginTop: 24,
    textAlign: 'center',
  },
  content: {
    marginHorizontal: 16,
    fontSize: 16,
    textAlign: 'center',
    color: Colors.gray400,
  },
});
