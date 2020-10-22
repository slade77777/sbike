import React from 'react';
import {View, ScrollView, SafeAreaView, StyleSheet} from 'react-native';
import MoreListItem from './MoreListItem';

const More: React.FC = () => (
  <SafeAreaView>
    <ScrollView>
      <View style={styles.container}>
        <MoreListItem text="Đăng nhập" />
        <MoreListItem text="Câu hỏi" />
        <MoreListItem text="Điều khoản và chính sách" />
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
