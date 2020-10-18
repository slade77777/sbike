import React, {FC} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Article} from 'shared-logic';
import SecondaryArticle from './SecondaryArticle';

type Props = {
  articles: Article[];
};

const SecondaryArticles: FC<Props> = ({articles}) => {
  return (
    <ScrollView style={styles.container} horizontal>
      {articles.map((article) => (
        <SecondaryArticle
          key={article.id}
          id={article.id}
          category={{
            ...article.category,
            title: article.category.name,
          }}
          imageUrl={article.url_image}
          published_date={article.published_date}
          title={article.title}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default SecondaryArticles;
