import React from 'react';
import {Colors, L1_Bold, L3} from 'components-library';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import DateAndCategory from '../DateAndCategory';
import {NewsArticle} from '.';

const PrimaryArticle: React.FC<NewsArticle> = ({
  id,
  category,
  imageUrl,
  published_date,
  description,
  title,
}) => {
  const navigation = useNavigation();

  const handleArticleClick = () => navigation.navigate(`ArticleDetails`, {id});

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleArticleClick}>
        <Image
          style={styles.image}
          source={{uri: imageUrl}}
          accessibilityIgnoresInvertColors
        />
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <L1_Bold
          style={styles.title}
          numberOfLines={3}
          onPress={handleArticleClick}>
          {title}
        </L1_Bold>
        <L3 style={styles.description} numberOfLines={2}>
          {description}
        </L3>
        <DateAndCategory date={published_date} category={category} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  image: {
    width: '100%',
    height: 250,
    marginBottom: 8,
  },
  infoContainer: {
    paddingHorizontal: 20,
  },
  title: {
    marginBottom: 8,
  },
  description: {
    marginBottom: 8,
    color: Colors.gray400,
  },
});

export default PrimaryArticle;
