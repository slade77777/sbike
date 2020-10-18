import React, {FC} from 'react';
import {Colors, L3_Bold, L4} from 'components-library';
import {Article} from 'shared-logic';
import {TouchableOpacity, View, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import DateAndCategory from '../DateAndCategory';
import {MainStackParamList} from '../../../../RootNavigator';

const ArticlesListItem: FC<Article> = ({
  id,
  category,
  published_date,
  title,
  description,
  url_image,
}) => {
  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();

  const handleArticleClick = () => navigation.push(`ArticleDetails`, {id});

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <L3_Bold
          style={styles.title}
          numberOfLines={2}
          onPress={handleArticleClick}>
          {title}
        </L3_Bold>
        <L4 style={styles.description} numberOfLines={3}>
          {description}
        </L4>
        <DateAndCategory
          date={published_date}
          category={{...category, title: category.name}}
        />
      </View>
      <TouchableOpacity onPress={handleArticleClick}>
        <Image
          style={styles.image}
          source={url_image ? {uri: url_image} : {}}
          accessibilityIgnoresInvertColors
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 32,
    marginHorizontal: 20,
  },
  image: {
    width: 84,
    height: 84,
    marginLeft: 20,
  },
  infoContainer: {
    flexShrink: 1,
  },
  title: {
    marginBottom: 8,
  },
  description: {
    marginBottom: 8,
    color: Colors.gray400,
  },
});

export default ArticlesListItem;
