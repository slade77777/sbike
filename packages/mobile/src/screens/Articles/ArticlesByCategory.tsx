import {useFocusEffect, useRoute} from '@react-navigation/native';
import {Colors} from 'components-library';
import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {
  Article,
  articlesCategoryActions,
  StoreState,
} from 'shared-logic';
import MostViewedArticles from './components/MostViewedArticles';
import PaginatedArticlesList from './components/PaginatedArticlesList';

const ARTICLES_PER_PAGE = 5;

const ArticlesByCategory: React.FC = () => {
  const route = useRoute<any>();

  const dispatch = useDispatch();
  const {articles, loading} = useSelector<
    StoreState,
    {articles: Article[]; loading: boolean}
  >((state) => ({
    articles: state.articleByCategory.articles,
    loading: state.articleByCategory.loading,
  }));

  useFocusEffect(
    useCallback(() => {
      dispatch(
        articlesCategoryActions.fetchArticlesByCategory({
          categoryId: route?.params?.categoryId,
          page: 0,
          pageSize: 50, // Arbitrary size to load a lot of articles. Can be adjusted in the future
        }),
      );
    }, [route?.params?.categoryId, dispatch]),
  );

  return (
    <ScrollView style={styles.container}>
      <MostViewedArticles />
      {loading ? null : (
        <PaginatedArticlesList
          articles={articles}
          articlesPerPage={ARTICLES_PER_PAGE}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white400,
  },
});

export default ArticlesByCategory;
