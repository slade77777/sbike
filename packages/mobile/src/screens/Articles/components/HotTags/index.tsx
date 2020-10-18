import React, {FC, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StoreState,
  ArticleTag,
  articlesActions,
} from 'shared-logic';
import {useTranslation} from 'react-i18next';
import {L1_Bold} from 'shared-ui';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import TagRow from './TagRow';

const HotTags: FC = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {hotTags} = useSelector<
    StoreState,
    {
      hotTags: ArticleTag[];
    }
  >((state) => ({
    hotTags: state.article.hotTags,
  }));

  useEffect(() => {
    if (!hotTags.length) {
      dispatch(articlesActions.fetchHotTags());
    }
  }, [dispatch, hotTags]);

  const rowSplitIndex = Math.ceil(hotTags.length / 2);
  const firstRowTags = hotTags.slice(0, rowSplitIndex);
  const secondRowTags = hotTags.slice(rowSplitIndex);

  return (
    <View>
      <L1_Bold style={styles.title}>{t('screens.articles.hotTags')}</L1_Bold>
      <ScrollView style={styles.tagsContainer} horizontal>
        <View>
          <TagRow tags={firstRowTags} />
          <TagRow tags={secondRowTags} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 20,
    marginLeft: 20,
  },
  tagsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});

export default HotTags;
