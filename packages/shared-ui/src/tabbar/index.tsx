import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import ItemRender from './ItemRender';
import ItemSeparator from './ItemSeparator';

type Props = {
  defaultValue?: string;
  datas: string[];
  onTap: (value: any) => void;
  ref?: React.RefObject<FlatList>;
};

const Tabbar = ({defaultValue, datas, onTap, ref}: Props) => {
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.tabbar}
        data={datas}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={(item) =>
          ItemRender(item.item === defaultValue, item, onTap)
        }
        keyExtractor={(item) => item}
        contentContainerStyle={styles.contentContainerStyle}
        ref={ref}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  tabbar: {
    height: 58,
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 16,
    paddingBottom: 8,
  },
  contentContainerStyle: {
    paddingEnd: 32,
  },
});

export default Tabbar;
