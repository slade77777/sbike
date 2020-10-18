import React, {FC} from 'react';
import {Image, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {L3_Bold} from 'shared-ui';
import {useNavigation} from '@react-navigation/native';
import DateAndCategory from '../../DateAndCategory';
import {NewsArticle} from '..';

const SecondaryArticle: FC<Omit<NewsArticle, 'description'>> = ({
  id,
  title,
  imageUrl,
  category,
  published_date,
}) => {
  const navigation = useNavigation();

  const handleArticleClick = () => navigation.navigate(`ArticleDetails`, {id});

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handleArticleClick}>
        <Image
          style={styles.image}
          source={{uri: imageUrl}}
          accessibilityIgnoresInvertColors
        />
      </TouchableWithoutFeedback>
      <View>
        <L3_Bold
          style={styles.title}
          numberOfLines={3}
          onPress={handleArticleClick}>
          {title}
        </L3_Bold>
        <DateAndCategory date={published_date} category={category} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 204,
    marginRight: 20,
  },
  image: {
    width: '100%',
    height: 136,
    marginBottom: 8,
  },
  title: {
    marginBottom: 8,
  },
});

export default SecondaryArticle;
