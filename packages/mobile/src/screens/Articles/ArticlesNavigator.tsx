import React, {useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useDispatch, useSelector} from 'react-redux';
import {
  ArticleCategory,
  articlesActions,
  StoreState,
} from 'shared-logic';
import {useTranslation} from 'react-i18next';
import SafeAreaTopTabBar from '../../components/SafeAreaTopTabBar';
import AllArticles from './AllArticles';
import ArticlesByCategory from './ArticlesByCategory';

const Tab = createMaterialTopTabNavigator();

const ArticlesNavigator: React.FC = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {categories} = useSelector<StoreState, {categories: ArticleCategory[]}>(
    (state) => ({
      categories: state.article.categories,
    }),
  );

  useEffect(() => {
    if (!categories.length) {
      dispatch(articlesActions.fetchCategories());
    }
  }, [categories, dispatch]);

  return (
    <Tab.Navigator
      lazy
      initialRouteName="AllArticles"
      tabBar={(props) => <SafeAreaTopTabBar {...props} />}>
      <Tab.Screen
        name="AllArticles"
        component={AllArticles}
        options={{title: t('screens.articles.allArticles')}}
      />
      {categories.map((category) => (
        <Tab.Screen
          key={`category-${category.id}`}
          name={`category-${category.id}`}
          component={ArticlesByCategory}
          initialParams={{categoryId: category.id}}
          options={{title: category.name}}
        />
      ))}
    </Tab.Navigator>
  );
};

export default ArticlesNavigator;
