import React from 'react';
import {View, ScrollView, SafeAreaView, StyleSheet} from 'react-native';
import MoreListItem from './MoreListItem';

const More: React.FC = () => (
  <SafeAreaView>
    <ScrollView>
      <View style={styles.container}>
        <MoreListItem text="SignIn" />
        <MoreListItem text="Post For Sale" navigateTo="PostForSale" />
        <MoreListItem text="Quesions and answers" />
        <MoreListItem text="Terms and conditions" />
      </View>
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});

export default More;
