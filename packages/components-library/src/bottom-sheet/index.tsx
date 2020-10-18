import React, {useState, useCallback, useEffect} from 'react';
import {StyleSheet, FlatList, View, Dimensions} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Colors} from '../Colors';
import ItemSeparator from './ItemSeparator';
import ItemRender from './ItemRender';
import Header from './Header';

export type DataMultiChoiceInCell = {
  title: string;
  value: string[];
};

export type DataSourceType = {
  singleChoice?: {dataSource: string[]; defaultValue?: string};
  singleSelect?: {dataSource: string[]};
  multiChoice?: {dataSource: string[]; defaultValue?: string[]};
  multiChoiceInCell?: {
    dataSource: DataMultiChoiceInCell[];
    defaultValue?: DataMultiChoiceInCell[];
  };
  singleChoiceInCell?: {
    dataSource: DataMultiChoiceInCell[];
    defaultValue?: DataMultiChoiceInCell[];
  };
};

export enum BottomSheetType {
  singleChoice,
  singleSelect,
  multiChoice,
  multiChoiceInCell,
  singleChoiceInCell,
  other,
}

interface DataSourceTypeInterface {
  value: any[];
  selected: any | null;
  type: BottomSheetType;
}

type Props = {
  title: string;
  doneButtonText?: string;
  dataSource: DataSourceType;
  reference: React.RefObject<RBSheet>;
  onCloseHeader: () => void;
  onDone: (value: any) => void;
  onClose?: () => void;
  onOpen?: () => void;
};

const mainViewHeight = (value: DataSourceType): number => {
  const screenHeight = Dimensions.get('screen').height - getStatusBarHeight();
  const maxHeight = (screenHeight * 2) / 3;
  // Cell height: 48, Footer height: 48, Header height: 56
  const componentHeight = 56 + 48;
  let totalHeight = 0;
  if (value.singleChoice) {
    totalHeight = value.singleChoice.dataSource.length * 48 + componentHeight;
  }

  if (value.singleSelect) {
    totalHeight = value.singleSelect.dataSource.length * 48 + componentHeight;
  }

  if (value.multiChoice) {
    totalHeight = value.multiChoice.dataSource.length * 48 + componentHeight;
  }

  if (value.multiChoiceInCell) {
    totalHeight = (screenHeight * 2) / 3;
  }

  if (value.singleChoiceInCell) {
    totalHeight = (screenHeight * 2) / 3;
  }

  return totalHeight > maxHeight ? maxHeight : totalHeight;
};

const dataSourceInput = (value: DataSourceType): DataSourceTypeInterface => {
  if (value.singleChoice) {
    return {
      value: value.singleChoice.dataSource,
      selected: value.singleChoice.defaultValue,
      type: BottomSheetType.singleChoice,
    };
  }

  if (value.singleSelect) {
    return {
      value: value.singleSelect.dataSource,
      selected: null,
      type: BottomSheetType.singleSelect,
    };
  }

  if (value.multiChoice) {
    return {
      value: value.multiChoice.dataSource,
      selected: value.multiChoice.defaultValue?.map((item) => item),
      type: BottomSheetType.multiChoice,
    };
  }

  if (value.multiChoiceInCell) {
    const selected: DataMultiChoiceInCell[] =
      value.multiChoiceInCell.defaultValue?.map((item) => {
        return {title: item.title, value: item.value.map((obj) => obj)};
      }) ?? [];

    return {
      value: value.multiChoiceInCell.dataSource,
      selected: selected,
      type: BottomSheetType.multiChoiceInCell,
    };
  }

  if (value.singleChoiceInCell) {
    const selected: DataMultiChoiceInCell[] =
      value.singleChoiceInCell.defaultValue?.map((item) => {
        return {title: item.title, value: item.value.map((obj) => obj)};
      }) ?? [];

    return {
      value: value.singleChoiceInCell.dataSource,
      selected: selected,
      type: BottomSheetType.singleChoiceInCell,
    };
  }

  return {
    value: [],
    selected: null,
    type: BottomSheetType.other,
  };
};

const BottomSheet: React.FC<Props> = React.memo(
  ({
    title,
    doneButtonText,
    dataSource,
    reference,
    onCloseHeader,
    onDone,
    onClose,
    onOpen,
  }: Props) => {
    const [datas, setDatas] = useState(dataSourceInput(dataSource));
    useEffect(() => {
      setDatas(dataSourceInput(dataSource));
    }, [dataSource, setDatas]);
    const dataViewHeight = mainViewHeight(dataSource);
    const defaultSelectedItem =
      datas.value && datas.value.length > 0 ? datas.value[0].title : '';
    const [selectedItem, setSelectedItem] = useState(defaultSelectedItem);

    const expandCallBack = useCallback(
      (key: string) => {
        setSelectedItem(key);
      },
      [setSelectedItem],
    );

    const cancelCallback = useCallback(() => {
      onCloseHeader();
      onClose?.();
      const originalData = dataSourceInput(dataSource);
      setDatas(originalData);
    }, [dataSource, onClose, onCloseHeader]);

    const onTapDone = useCallback(() => {
      onDone(datas.selected);
    }, [datas.selected, onDone]);

    const updateArrayData = (array: string[], value: string) => {
      const index = array.indexOf(value, 0);
      if (index > -1) {
        array.splice(index, 1);
      } else {
        array.push(value);
      }
    };

    const updateSingleChoice = useCallback(
      (newData: DataSourceTypeInterface, value: string) => {
        newData.selected = value;
        setTimeout(() => {
          onDone(value);
        }, 0);
      },
      [onDone],
    );

    const updateSingleSelect = useCallback(
      (newData: DataSourceTypeInterface, value: string) => {
        newData.selected = value;
        onDone(value);
      },
      [onDone],
    );

    const updateMultiChoice = useCallback(
      (newData: DataSourceTypeInterface, value: string) => {
        if (newData.selected) {
          updateArrayData(newData.selected, value);
        } else {
          newData.selected = [value];
        }
      },
      [],
    );

    const updateMultiChoiceInCell = useCallback(
      (newData: DataSourceTypeInterface, value: any) => {
        if (newData.selected) {
          const index = newData.selected
            .map((item: any) => item.title)
            .indexOf(value.title, 0);
          if (index > -1) {
            updateArrayData(newData.selected[index].value, value.value);
          } else {
            newData.selected.push({title: value.title, value: [value.value]});
          }
        } else {
          newData.selected = [{title: value.title, value: [value.value]}];
        }
      },
      [],
    );

    const updateSingleChoiceInCell = useCallback(
      (newData: DataSourceTypeInterface, value: any) => {
        newData.selected = [{title: value.title, value: [value.value]}];
      },
      [],
    );

    const updateData = useCallback(
      (value) => {
        const newData = Object.assign({}, datas);
        switch (newData.type) {
          case BottomSheetType.singleChoice:
            updateSingleChoice(newData, value);
            break;
          case BottomSheetType.singleSelect:
            updateSingleSelect(newData, value);
            break;
          case BottomSheetType.multiChoice:
            updateMultiChoice(newData, value);
            break;
          case BottomSheetType.multiChoiceInCell:
            updateMultiChoiceInCell(newData, value);
            break;
          case BottomSheetType.singleChoiceInCell:
            updateSingleChoiceInCell(newData, value);
            break;
          default:
            break;
        }
        setDatas(newData);
      },
      [
        datas,
        updateSingleChoice,
        updateSingleSelect,
        updateMultiChoice,
        updateMultiChoiceInCell,
        updateSingleChoiceInCell,
        setDatas,
      ],
    );

    const isDoneButtonEnable =
      datas.type !== BottomSheetType.singleChoice &&
      datas.type !== BottomSheetType.singleSelect;
    return (
      <RBSheet
        ref={reference}
        openDuration={250}
        height={dataViewHeight}
        customStyles={{container: [styles.container]}}
        onClose={onClose}
        onOpen={onOpen}>
        <Header
          title={title}
          doneButtonText={doneButtonText}
          onCloseHeader={cancelCallback}
          doneButton={isDoneButtonEnable}
          onTapDone={onTapDone}
        />
        <View style={styles.inline} />
        <FlatList
          contentContainerStyle={styles.contentContainer}
          style={styles.listView}
          data={datas.value}
          ItemSeparatorComponent={
            datas.type !== BottomSheetType.multiChoice ? ItemSeparator : null
          }
          renderItem={(item) =>
            ItemRender({
              dataSelected: datas.selected,
              data: item,
              type: datas.type,
              selectedItem: selectedItem,
              donePress: updateData,
              expandPress: expandCallBack,
            })
          }
          keyExtractor={(item) => {
            return datas.type === BottomSheetType.multiChoiceInCell
              ? item.title
              : item;
          }}
        />
        <View style={styles.footer} />
      </RBSheet>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  contentContainer: {
    paddingBottom: 44,
  },
  listView: {
    flex: 1,
    width: '100%',
  },
  inline: {
    width: '100%',
    height: 0.5,
    backgroundColor: Colors.gray200,
  },
  footer: {
    width: '100%',
    height: 48,
  },
});

export default BottomSheet;
