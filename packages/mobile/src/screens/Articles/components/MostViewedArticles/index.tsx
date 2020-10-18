import React, {FC, useEffect} from 'react';
import {L1_Bold} from 'components-library';
import {useTranslation} from 'react-i18next';
import {StoreState, Article, articlesActions} from 'shared-logic';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import MostViewedArticle from './MostViewedArticle';

const MostViewedArticles: FC = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {articles} = useSelector<StoreState, {articles: Article[]}>(
    (state) => ({
      articles: state.article.mostViewedArticles,
    }),
  );

  useEffect(() => {
    if (!articles.length) {
      dispatch(articlesActions.fetchMostViewedArticles());
    }
  }, [articles.length, dispatch]);

  const displayedArticles = articles
    .filter((a) => a.title && a.published_date && a.category)
    .slice(0, 5);

  return (
    <View style={styles.container}>
      <L1_Bold style={styles.title}>
        {t('screens.articles.mostViewedArticles')}
      </L1_Bold>
      <View>
        {displayedArticles.map((item, index) => (
          <MostViewedArticle
            id={item.id}
            title={item.title}
            category={{...item.category, title: item.category.name}}
            order={index + 1}
            publishedDate={item.published_date}
            key={item.id}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  title: {
    marginBottom: 28,
  },
});

export default MostViewedArticles;
