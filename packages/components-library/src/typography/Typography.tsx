import React, {RefObject} from 'react';
import {TextInputProps, TextInput} from 'react-native';
import TypographicElement, {
  TextProps,
  TypographicElementInput,
} from './TypographicElement';

const headerProps = (props: any, level: number) => ({
  ...props,
  accessibilityRole: 'header',
  'aria-level': level,
});

const labelProps = (props: any) => ({
  ...props,
  accessibilityRole: 'text',
});

export const H1: React.FC<TextProps> = (props) => (
  <TypographicElement
    textProps={headerProps(props, 1)}
    fontWeight={'bold'}
    fontSize={48}
    lineHeight={64}>
    {props.children}
  </TypographicElement>
);

export const H2: React.FC<TextProps> = (props) => (
  <TypographicElement
    textProps={headerProps(props, 2)}
    fontWeight={'bold'}
    fontSize={36}
    lineHeight={52}>
    {props.children}
  </TypographicElement>
);

export const H3: React.FC<TextProps> = (props) => (
  <TypographicElement
    textProps={headerProps(props, 3)}
    fontWeight={'bold'}
    fontSize={28}
    lineHeight={40}>
    {props.children}
  </TypographicElement>
);

export const H4: React.FC<TextProps> = (props) => (
  <TypographicElement
    textProps={headerProps(props, 4)}
    fontWeight={'bold'}
    fontSize={24}
    lineHeight={32}>
    {props.children}
  </TypographicElement>
);

export const L1: React.FC<TextProps> = (props) => (
  <TypographicElement
    textProps={labelProps(props)}
    fontWeight={'normal'}
    fontSize={20}
    lineHeight={28}>
    {props.children}
  </TypographicElement>
);

export const L2: React.FC<TextProps> = (props) => (
  <TypographicElement
    textProps={labelProps(props)}
    fontWeight={'normal'}
    fontSize={17}
    lineHeight={28}>
    {props.children}
  </TypographicElement>
);

export const L3: React.FC<TextProps> = (props) => (
  <TypographicElement
    textProps={labelProps(props)}
    fontWeight={'normal'}
    fontSize={16}
    lineHeight={20}>
    {props.children}
  </TypographicElement>
);

export const L4: React.FC<TextProps> = (props) => (
  <TypographicElement
    textProps={labelProps(props)}
    fontWeight={'normal'}
    fontSize={13}
    lineHeight={16}>
    {props.children}
  </TypographicElement>
);

export const L5: React.FC<TextProps> = (props) => (
  <TypographicElement
    textProps={labelProps(props)}
    fontWeight={'normal'}
    fontSize={11}
    lineHeight={12}>
    {props.children}
  </TypographicElement>
);

export const L1_Bold: React.FC<TextProps> = (props) => (
  <TypographicElement
    textProps={labelProps(props)}
    fontWeight={'bold'}
    fontSize={20}
    lineHeight={28}>
    {props.children}
  </TypographicElement>
);

export const L3_Bold: React.FC<TextProps> = (props) => (
  <TypographicElement
    textProps={labelProps(props)}
    fontWeight={'bold'}
    fontSize={16}
    lineHeight={20}>
    {props.children}
  </TypographicElement>
);

export const L4_Bold: React.FC<TextProps> = (props) => (
  <TypographicElement
    textProps={labelProps(props)}
    fontWeight={'bold'}
    fontSize={13}
    lineHeight={16}>
    {props.children}
  </TypographicElement>
);

export const L5_Bold: React.FC<TextProps> = (props) => (
  <TypographicElement
    textProps={labelProps(props)}
    fontWeight={'bold'}
    fontSize={11}
    lineHeight={12}>
    {props.children}
  </TypographicElement>
);

export const N_DEFAULT: React.FC<TextProps> = (props) => (
  <TypographicElement textProps={props}>{props.children}</TypographicElement>
);

export const M_500_10_12: React.FC<TextProps> = (props) => (
  <TypographicElement
    textProps={props}
    fontWeight={'500'}
    fontSize={10}
    lineHeight={12}>
    {props.children}
  </TypographicElement>
);

export const M_500_12_20: React.FC<TextProps> = (props) => (
  <TypographicElement
    textProps={props}
    fontWeight={'500'}
    fontSize={12}
    lineHeight={20}>
    {props.children}
  </TypographicElement>
);

export const M_500_14_20: React.FC<TextProps> = (props) => (
  <TypographicElement
    textProps={props}
    fontWeight={'500'}
    fontSize={14}
    lineHeight={20}>
    {props.children}
  </TypographicElement>
);

export const M_500_16_20: React.FC<TextProps> = (props) => (
  <TypographicElement
    textProps={props}
    fontWeight={'500'}
    fontSize={16}
    lineHeight={20}>
    {props.children}
  </TypographicElement>
);

export const M_500_14_24: React.FC<TextProps> = (props) => (
  <TypographicElement
    textProps={props}
    fontWeight={'500'}
    fontSize={14}
    lineHeight={24}>
    {props.children}
  </TypographicElement>
);

export const M_500_16_24: React.FC<TextProps> = (props) => (
  <TypographicElement
    textProps={props}
    fontWeight={'500'}
    fontSize={16}
    lineHeight={24}>
    {props.children}
  </TypographicElement>
);

export const M_500_18_24: React.FC<TextProps> = (props) => (
  <TypographicElement
    textProps={props}
    fontWeight={'500'}
    fontSize={18}
    lineHeight={24}>
    {props.children}
  </TypographicElement>
);

export const M_500_18_28: React.FC<TextProps> = (props) => (
  <TypographicElement
    textProps={props}
    fontWeight={'500'}
    fontSize={18}
    lineHeight={28}>
    {props.children}
  </TypographicElement>
);

export const M_500_20_24: React.FC<TextProps> = (props) => (
  <TypographicElement
    textProps={props}
    fontWeight={'500'}
    fontSize={20}
    lineHeight={24}>
    {props.children}
  </TypographicElement>
);

export const M_500_20_28: React.FC<TextProps> = (props) => (
  <TypographicElement
    textProps={props}
    fontWeight={'500'}
    fontSize={20}
    lineHeight={28}>
    {props.children}
  </TypographicElement>
);

export const M_500_24_32: React.FC<TextProps> = (props) => (
  <TypographicElement
    textProps={props}
    fontWeight={'500'}
    fontSize={24}
    lineHeight={32}>
    {props.children}
  </TypographicElement>
);

export const M_500_32_40: React.FC<TextProps> = (props) => (
  <TypographicElement
    textProps={props}
    fontWeight={'500'}
    fontSize={32}
    lineHeight={40}>
    {props.children}
  </TypographicElement>
);

export const R_Normal_6_12: React.FC<TextProps> = (props) => (
  <TypographicElement
    textProps={props}
    fontWeight={'500'}
    fontSize={6}
    lineHeight={12}>
    {props.children}
  </TypographicElement>
);

export const R_Normal_8_12: React.FC<TextProps> = (props) => (
  <TypographicElement
    textProps={props}
    fontWeight={'normal'}
    fontSize={8}
    lineHeight={12}>
    {props.children}
  </TypographicElement>
);

export const R_Normal_10_12: React.FC<TextProps> = (props) => (
  <TypographicElement
    textProps={props}
    fontWeight={'normal'}
    fontSize={10}
    lineHeight={12}>
    {props.children}
  </TypographicElement>
);

export const R_Normal_12_16: React.FC<TextProps> = (props) => (
  <TypographicElement
    textProps={props}
    fontWeight={'normal'}
    fontSize={12}
    lineHeight={16}>
    {props.children}
  </TypographicElement>
);

export const R_Normal_12_20: React.FC<TextProps> = (props) => (
  <TypographicElement
    textProps={props}
    fontWeight={'normal'}
    fontSize={12}
    lineHeight={20}>
    {props.children}
  </TypographicElement>
);

export const R_Normal_14_16: React.FC<TextProps> = (props) => (
  <TypographicElement
    textProps={props}
    fontWeight={'normal'}
    fontSize={14}
    lineHeight={16}>
    {props.children}
  </TypographicElement>
);

export const R_Normal_14_20: React.FC<TextProps> = (props) => (
  <TypographicElement
    textProps={props}
    fontWeight={'normal'}
    fontSize={14}
    lineHeight={20}>
    {props.children}
  </TypographicElement>
);

export const R_Normal_16_24: React.FC<TextProps> = (props) => (
  <TypographicElement
    textProps={props}
    fontWeight={'normal'}
    fontSize={16}
    lineHeight={24}>
    {props.children}
  </TypographicElement>
);

export const R_Normal_16_20: React.FC<TextProps> = (props) => (
  <TypographicElement
    textProps={props}
    fontWeight={'normal'}
    fontSize={16}
    lineHeight={20}>
    {props.children}
  </TypographicElement>
);

export const R_Normal_18_20: React.FC<TextProps> = (props) => (
  <TypographicElement
    textProps={props}
    fontWeight={'normal'}
    fontSize={18}
    lineHeight={20}>
    {props.children}
  </TypographicElement>
);

export const R_Normal_18_28: React.FC<TextProps> = (props) => (
  <TypographicElement
    textProps={props}
    fontWeight={'normal'}
    fontSize={18}
    lineHeight={28}>
    {props.children}
  </TypographicElement>
);

export const R_Normal_20_20: React.FC<TextProps> = (props) => (
  <TypographicElement
    textProps={props}
    fontWeight={'normal'}
    fontSize={20}
    lineHeight={20}>
    {props.children}
  </TypographicElement>
);

export const R_500_16_20: React.FC<TextProps> = (props) => (
  <TypographicElement
    textProps={props}
    fontWeight={'500'}
    fontSize={16}
    lineHeight={20}>
    {props.children}
  </TypographicElement>
);

export const R_500_16_24: React.FC<TextProps> = (props) => (
  <TypographicElement
    textProps={props}
    fontWeight={'500'}
    fontSize={16}
    lineHeight={24}>
    {props.children}
  </TypographicElement>
);

export const R_500_18_19: React.FC<TextProps> = (props) => (
  <TypographicElement
    textProps={props}
    fontWeight={'500'}
    fontSize={18}
    lineHeight={19}>
    {props.children}
  </TypographicElement>
);

export const R_500_18_28: React.FC<TextProps> = (props) => (
  <TypographicElement
    textProps={props}
    fontWeight={'500'}
    fontSize={18}
    lineHeight={28}>
    {props.children}
  </TypographicElement>
);

export const R_500_20_28: React.FC<TextProps> = (props) => (
  <TypographicElement
    textProps={props}
    fontWeight={'500'}
    fontSize={20}
    lineHeight={28}>
    {props.children}
  </TypographicElement>
);

export interface TestProps extends TextInputProps {
  textInputRef?: RefObject<TextInput>;
}

export const InputDefault: React.FC<TestProps> = (props) => (
  <TypographicElementInput textProps={props}>
    {props.children}
  </TypographicElementInput>
);
