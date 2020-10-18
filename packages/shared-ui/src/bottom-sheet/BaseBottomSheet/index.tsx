import React, {useMemo} from 'react';
import {StyleSheet, FlatList, View, Dimensions, Platform} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Colors} from '../../Colors';
import Header from '../Header';

type Props = {
  title: string;
  dataSource: any[];
  reference: React.RefObject<RBSheet>;
  onCloseHeader: () => void;
  onClose?: () => void;
  onOpen?: () => void;
  renderItem: (item: any) => React.ReactElement | null;
  itemHeight: number;
  keyExtractor?: (item: any) => string | number;
};

type CustomAttrs = {
  height: number;
  paddingBottom: number;
};

const BaseBottomSheet: React.FC<Props> = ({
  title,
  dataSource,
  reference,
  onCloseHeader,
  onClose,
  onOpen,
  renderItem,
  itemHeight,
  keyExtractor,
}) => {
  const customAttrs: CustomAttrs = useMemo(() => {
    const screenHeight =
      Dimensions.get('screen').height - getStatusBarHeight(true);
    const maxHeight = (screenHeight * 2) / 3;
    const dataViewHeight = 56 + (itemHeight + 0.5) * dataSource.length; // Header: 56, Cell: 48, Divider: 0.5,
    const height = Math.min(maxHeight, dataViewHeight);
    const paddingBottom =
      Platform.OS === 'android' && dataViewHeight > screenHeight ? 100 : 0;
    return {height: height, paddingBottom: paddingBottom};
  }, [dataSource.length, itemHeight]);

  return (
    <RBSheet
      ref={reference}
      height={customAttrs.height}
      openDuration={250}
      customStyles={{container: styles.container}}
      onClose={onClose}
      onOpen={onOpen}>
      <Header title={title} onCloseHeader={onCloseHeader} />
      <View style={styles.inline} />
      <FlatList
        contentContainerStyle={{paddingBottom: customAttrs.paddingBottom}}
        style={styles.listView}
        data={dataSource}
        renderItem={renderItem}
        keyExtractor={keyExtractor || ((item) => item)}
      />
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  listView: {
    width: '100%',
  },
  inline: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.gray200,
  },
});

export default BaseBottomSheet;
