import React from 'react';
import {StyleSheet, Text, TextInput, TextInputProps} from 'react-native';

type FontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

export type TextProps = React.ComponentProps<typeof Text>;

type Props = {
  textProps: TextProps & {accessibilityLevel?: number};
  fontWeight?: FontWeight;
  fontSize?: number;
  lineHeight?: number;
};

type InputProps = {
  textProps: TextInputProps & {accessibilityLevel?: number};
  fontWeight?: FontWeight;
  fontSize?: number;
  lineHeight?: number;
};

const TypographicElement: React.FC<Props> = ({
  children,
  textProps,
  fontWeight,
  fontSize,
  lineHeight,
}) => {
  const typographicStyle = {
    fontWeight,
    fontSize,
    lineHeight,
  };

  return (
    <Text
      {...textProps}
      style={[typographicStyle, styles.text, textProps.style]}>
      {children}
    </Text>
  );
};

export const TypographicElementInput: React.FC<InputProps> = ({
  children,
  textProps,
  fontWeight,
  fontSize,
  lineHeight,
}) => {
  const typographicStyle = {
    fontWeight,
    fontSize,
    lineHeight,
  };

  return (
    <TextInput
      {...textProps}
      style={[typographicStyle, styles.text, textProps.style]}>
      {children}
    </TextInput>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Arial',
  },
});

export default TypographicElement;
