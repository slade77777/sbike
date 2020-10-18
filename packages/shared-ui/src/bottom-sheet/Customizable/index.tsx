import React from 'react';
import {StyleSheet, View, Dimensions, Platform} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Colors} from '../../Colors';
import Header from '../Header';

type Props = {
  title: string;
  doneButtonText?: string;
  reference: React.RefObject<RBSheet>;
  onCloseHeader: () => void;
  onTapDone: () => void;
  onClose?: () => void;
  onOpen?: () => void;
  height?: number | null;
  children: React.ReactNode;
};

const CustomizableBottomSheet: React.FC<Props> = ({
  title,
  doneButtonText,
  reference,
  onCloseHeader,
  onTapDone,
  onClose,
  onOpen,
  height,
  children,
}) => {
  const screenHeight =
    Dimensions.get('screen').height - getStatusBarHeight(true);
  const paddingBottom = Platform.OS === 'android' ? 100 : 0;
  const customAttrs = {
    height: height ?? screenHeight,
    paddingBottom: paddingBottom,
  };
  return (
    <RBSheet
      ref={reference}
      height={customAttrs.height}
      openDuration={250}
      customStyles={{container: styles.container}}
      onClose={onClose}
      onOpen={onOpen}>
      <Header
        title={title}
        onCloseHeader={onCloseHeader}
        doneButtonText={doneButtonText}
        doneButton={!!doneButtonText}
        onTapDone={onTapDone}
      />
      <View style={styles.inline} />
      {children}
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  inline: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.gray200,
  },
});

export default CustomizableBottomSheet;
