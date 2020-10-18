import React, {FC} from 'react';
import {dateUtils} from 'shared-logic';
import {Colors, L4} from 'components-library';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

type Props = {
  category: {
    id: string;
    title: string;
  };
  date: string;
};

const DateAndCategory: FC<Props> = ({date, category}) => {
  const navigation = useNavigation();

  const handleCategoryPress = () =>
    navigation.navigate(`category-${category.id}`);

  return (
    <View style={styles.container}>
      <L4 style={styles.date}>{dateUtils.format(date)}</L4>
      <View style={styles.dot} />
      <L4 style={styles.link} onPress={handleCategoryPress}>
        {category.title}
      </L4>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    color: Colors.gray400,
  },
  dot: {
    marginHorizontal: 8,
    width: 3,
    height: 3,
    borderRadius: 50,
    backgroundColor: Colors.gray400,
  },
  link: {
    color: Colors.blue500,
  },
});

export default DateAndCategory;
