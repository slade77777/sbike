import React, {useEffect} from 'react';
import {
  Article,
  StoreState,
  articleLatestActions,
} from 'shared-logic';
import {useDispatch, useSelector} from 'react-redux';
import {L1_Bold} from 'components-library';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import PaginatedArticlesList from './PaginatedArticlesList';

const ARTICLES_PER_PAGE = 5;

const LatestNews: React.FC = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const {latestArticles} = useSelector<StoreState, {latestArticles: Article[]}>(
    (state) => ({
      latestArticles: state.articleLatest.articles,
    }),
  );

  useEffect(() => {
    if (!latestArticles.length) {
      dispatch(articleLatestActions.fetchArticleLatest());
    }
  }, [latestArticles.length, dispatch]);

  return (
    <View style={styles.container}>
      <L1_Bold style={styles.title}>{t('screens.articles.latestNews')}</L1_Bold>
      <PaginatedArticlesList
        articles={latestArticles}
        articlesPerPage={ARTICLES_PER_PAGE}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    margin: 20,
  },
});

export default LatestNews;
