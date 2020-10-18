import React, {FC} from 'react';
import {Colors, H3, L3_Bold} from 'components-library';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import DateAndCategory from '../DateAndCategory';
import {MainStackParamList} from '../../../../RootNavigator';

type Props = {
  id: string;
  title: string;
  publishedDate: string;
  category: {
    id: string;
    title: string;
  };
  order: number;
  className?: string;
};

const MostViewedArticle: FC<Props> = ({
  id,
  title,
  publishedDate,
  category,
  order,
}) => {
  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();

  const handleArticleClick = () => navigation.push(`ArticleDetails`, {id});

  return (
    <View style={styles.container}>
      <H3 style={styles.index}>{order.toString().padStart(2, '0')}</H3>
      <View style={styles.infoContainer}>
        <L3_Bold
          style={styles.title}
          numberOfLines={2}
          onPress={handleArticleClick}>
          {title}
        </L3_Bold>
        <DateAndCategory date={publishedDate} category={category} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexShrink: 1,
    marginBottom: 24,
  },
  index: {
    color: Colors.gray300,
    width: 32,
    marginRight: 20,
  },
  title: {
    marginBottom: 8,
  },
  infoContainer: {
    flexShrink: 1,
  },
});

export default MostViewedArticle;
