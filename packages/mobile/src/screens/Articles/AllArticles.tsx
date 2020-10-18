import {Colors} from 'shared-ui';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import FeaturedArticles from './components/FeaturedArticles';
import HotTags from './components/HotTags';
import LatestNews from './components/LatestNews';
import MostViewedArticles from './components/MostViewedArticles';

const AllArticles: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <FeaturedArticles />
      <View style={styles.divider} />
      <MostViewedArticles />
      <View style={styles.divider} />
      <HotTags />
      <View style={styles.divider} />
      <LatestNews />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white400,
  },
  divider: {
    width: '90%',
    borderColor: Colors.gray300,
    borderWidth: StyleSheet.hairlineWidth,
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default AllArticles;
