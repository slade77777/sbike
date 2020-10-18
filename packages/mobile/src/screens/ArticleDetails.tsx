import {useRoute} from '@react-navigation/native';
import {Colors, L1_Bold, L2} from 'shared-ui';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Article, articlesActions, StoreState} from 'shared-logic';
import PrimaryArticle from './Articles/components/FeaturedArticles/PrimaryArticle';
import TagRow from './Articles/components/HotTags/TagRow';
import MostViewedArticles from './Articles/components/MostViewedArticles';
import RelatedArticles from './Articles/components/RelatedArticles';

const ArticleDetails: React.FC = () => {
  const {t} = useTranslation();
  const {
    params: {id},
  } = useRoute<any>();
  const dispatch = useDispatch();
  const {article} = useSelector<StoreState, {article: Article | null}>(
    (state) => ({
      article: state.article.activeArticle,
    }),
  );

  useEffect(() => {
    dispatch(articlesActions.fetchActiveArticle(id));
  }, [id]);

  if (!article) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <PrimaryArticle
        id={article.id}
        category={{
          ...article.category,
          title: article.category.name,
        }}
        imageUrl={article.url_image}
        published_date={article.published_date}
        description={article.description}
        title={article.title}
      />
      <L1_Bold style={styles.location}>
        {t('screens.articles.location')}
      </L1_Bold>
      <L2 style={styles.content}>{article.content.trim()}</L2>
      <TagRow style={styles.tags} tags={article.tags} />
      <RelatedArticles tags={article.tags} />
      <MostViewedArticles />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white400,
  },
  location: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    color: Colors.gray500,
  },
  content: {
    paddingHorizontal: 20,
    color: Colors.gray500,
  },
  tags: {
    padding: 20,
  },
});

export default ArticleDetails;
