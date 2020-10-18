import * as React from 'react';
import {Platform} from 'react-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Colors} from './Colors';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: Colors.gray500,
    accent: Colors.blue500,
    primary: Colors.blue500,
    background: Colors.white400,
  },
};

type Props = {
  children: React.ReactNode;
};

const Provider = ({children}: Props) => {
  return (
    <PaperProvider theme={theme}>
      <>
        {Platform.OS === 'web' ? (
          // eslint-disable-next-line react-native/no-raw-text
          <style type="text/css">{`
            @font-face {
              font-family: 'MaterialCommunityIcons';
              src: url(${require('react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf')}) format('truetype');
            }
          `}</style>
        ) : null}
        {children}
      </>
    </PaperProvider>
  );
};

export default Provider;
