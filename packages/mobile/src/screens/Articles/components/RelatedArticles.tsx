import React, {useEffect} from 'react';
import {
  Article,
  StoreState,
  articlesActions,
  ArticleTag,
} from 'shared-logic';
import {useDispatch, useSelector} from 'react-redux';
import {L1_Bold} from 'components-library';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import ArticlesList from './ArticlesList';

type Props = {
  tags: ArticleTag[];
};

const RelatedArticles: React.FC<Props> = ({tags}) => {
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const {relatedArticles} = useSelector<
    StoreState,
    {relatedArticles: Article[]}
  >((state) => ({
    relatedArticles: state.article.relatingActiveArticles,
  }));

  useEffect(() => {
    if (!relatedArticles.length) {
      dispatch(articlesActions.fetchRelatingActiveArticles(tags));
    }
  }, [relatedArticles.length, tags, dispatch]);

  return (
    <View style={styles.container}>
      <L1_Bold style={styles.title}>
        {t('screens.articles.relatedPosts')}
      </L1_Bold>
      <ArticlesList articles={relatedArticles} />
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

export default RelatedArticles;
