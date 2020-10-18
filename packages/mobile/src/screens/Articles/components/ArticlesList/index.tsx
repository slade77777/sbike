import React from 'react';
import {View} from 'react-native';
import {Article} from 'shared-logic';
import ArticlesListItem from './ArticlesListItem';

type Props = {
  articles: Article[];
};

const ArticlesList: React.FC<Props> = ({articles}) => (
  <View>
    {articles.map((article) => (
      <ArticlesListItem key={article.id} {...article} />
    ))}
  </View>
);

export default ArticlesList;
