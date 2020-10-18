import React, {useCallback} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ListRenderItemInfo,
  View,
  Animated,
} from 'react-native';
import {Colors} from '../../Colors';
import ArrowDown, {ArrowOrientation} from '../../text-field/ArrowDown';
import {DataMultiChoiceInCell} from '../index';
import {R_Normal_16_20} from '../../typography/Typography';
import RadioButton from '../../RadioButton';
import MultiCheckIcon from './MultiCheckIcon';

type Props = {
  dataSelected?: any;
  data: ListRenderItemInfo<any>;
  selectedItem: string;
  singleSelect?: boolean;
  donePress: (value: {title: string; value: string}) => void;
  expandPress: (key: string) => void;
};

const isMatchData = (
  dataSelected: DataMultiChoiceInCell[],
  title: string,
  value: string,
): boolean => {
  if (!dataSelected) {
    return false;
  }

  const filterByTitle = dataSelected.filter((item) => item.title === title);
  if (filterByTitle.length === 0) return false;

  const filterByContent = filterByTitle[0].value.filter(
    (item) => item === value,
  );
  return filterByContent.length > 0;
};

const ListSelectItem = ({
  dataSelected,
  data,
  selectedItem,
  singleSelect,
  donePress,
  expandPress,
}: Props) => {
  const items: string[] = data.item.value;
  const isSelected = selectedItem === data.item.title;
  const itemHeight = isSelected ? items.length * 48 + 48 : 48;

  const expandCallBack = useCallback(() => {
    expandPress(data.item.title);
  }, [data.item.title, expandPress]);

  const slideAnimation = new Animated.Value(0);
  const opacityAnimation = new Animated.Value(0);

  const dropDownAnimation = () => {
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 0,
      useNativeDriver: false,
    }).start();

    Animated.timing(opacityAnimation, {
      toValue: 1,
      duration: 0,
      useNativeDriver: false,
    }).start();
  };

  if (isSelected) {
    dropDownAnimation();
  }

  const heightStyle = {height: itemHeight};

  return (
    <View style={[styles.colunmView, heightStyle]}>
      <TouchableOpacity style={styles.rowView} onPress={expandCallBack}>
        <R_Normal_16_20 style={styles.title}>{data.item.title}</R_Normal_16_20>
        <ArrowDown orientation={ArrowOrientation.right} />
      </TouchableOpacity>
      <View style={styles.seperator}></View>
      <Animated.View
        style={[
          {
            transform: [{translateY: slideAnimation}],
            opacity: opacityAnimation,
          },
        ]}>
        {isSelected &&
          items.map((value: string) => {
            return (
              <TouchableOpacity
                style={styles.cellView}
                onPress={() =>
                  donePress({title: data.item.title, value: value})
                }
                key={value}>
                {singleSelect ? (
                  <RadioButton
                    selected={isMatchData(dataSelected, data.item.title, value)}
                  />
                ) : (
                  <MultiCheckIcon
                    select={isMatchData(dataSelected, data.item.title, value)}
                  />
                )}
                <R_Normal_16_20 style={styles.subTitle}>{value}</R_Normal_16_20>
              </TouchableOpacity>
            );
          })}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowView: {
    backgroundColor: Colors.white400,
    height: 48,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  colunmView: {
    backgroundColor: Colors.white400,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
    paddingLeft: 16,
    paddingRight: 16,
  },
  cellView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 'normal',
    color: Colors.black500,
    flex: 9,
  },
  subTitle: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 'normal',
    color: Colors.black500,
    height: 48,
    marginLeft: 14,
    paddingTop: 14,
    width: '90%',
  },
  seperator: {
    height: 0.5,
    backgroundColor: Colors.gray200,
    width: '100%',
  },
});

export default ListSelectItem;
