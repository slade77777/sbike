import React from 'react';
import {ListRenderItemInfo, View} from 'react-native';
import OneCheckItem from './ItemView/OneCheckItem';
import OneSelectItem from './ItemView/OneSelectItem';
import MultiSelectItem from './ItemView/MultiSelectItem';
import ListSelectItem from './ItemView/ListSelectItem';
import {BottomSheetType} from './index';

type Props = {
  dataSelected?: any;
  data: ListRenderItemInfo<any>;
  type: BottomSheetType;
  selectedItem: string;
  donePress: (value: any) => void;
  expandPress: (key: string) => void;
};

const RenderItem = ({
  dataSelected,
  data,
  type,
  selectedItem,
  donePress,
  expandPress,
}: Props) => (
  <View>
    {type === BottomSheetType.singleChoice && (
      <OneCheckItem
        dataSelected={dataSelected}
        data={data}
        onPress={donePress}
      />
    )}
    {type === BottomSheetType.singleSelect && (
      <OneSelectItem data={data} onPress={donePress} />
    )}
    {type === BottomSheetType.multiChoice && (
      <MultiSelectItem
        dataSelected={dataSelected}
        data={data}
        onPress={donePress}
      />
    )}
    {type === BottomSheetType.multiChoiceInCell && (
      <ListSelectItem
        dataSelected={dataSelected}
        data={data}
        selectedItem={selectedItem}
        donePress={donePress}
        expandPress={expandPress}
      />
    )}
    {type === BottomSheetType.singleChoiceInCell && (
      <ListSelectItem
        dataSelected={dataSelected}
        data={data}
        selectedItem={selectedItem}
        singleSelect
        donePress={donePress}
        expandPress={expandPress}
      />
    )}
  </View>
);

export default RenderItem;
