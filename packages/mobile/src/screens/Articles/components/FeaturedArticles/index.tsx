import React, {useEffect} from 'react';
import {articlesActions, StoreState, Article} from 'shared-logic';
import {useSelector, useDispatch} from 'react-redux';
import PrimaryArticle from './PrimaryArticle';
import SecondaryArticles from './SecondaryArticles';

export type NewsArticle = {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  published_date: string;
  category: {
    id: string;
    title: string;
  };
};

const FeaturedArticles: React.FC = () => {
  const dispatch = useDispatch();
  const {articles} = useSelector<StoreState, {articles: Article[]}>(
    (state) => ({
      articles: state.article.featureNews,
    }),
  );

  useEffect(() => {
    if (!articles.length) {
      dispatch(articlesActions.fetchFeatureNew());
    }
  }, [articles, dispatch]);

  if (!articles.length) {
    return null;
  }

  const featuredArticle = articles[0];
  const secondaryArticles = articles.slice(1, 4);

  return (
    <>
      <PrimaryArticle
        id={featuredArticle.id}
        category={{
          ...featuredArticle.category,
          title: featuredArticle.category.name,
        }}
        imageUrl={featuredArticle.url_image}
        published_date={featuredArticle.published_date}
        description={featuredArticle.description}
        title={featuredArticle.title}
      />

      {secondaryArticles.length ? (
        <SecondaryArticles articles={secondaryArticles} />
      ) : null}
    </>
  );
};

export default FeaturedArticles;
