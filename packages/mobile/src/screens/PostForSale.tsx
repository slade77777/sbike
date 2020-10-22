import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const PostForSale: React.FC = () => {
  return (
    <View style={styles.section}>
      <Text>Post for sale</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    display: 'flex',
    marginBottom: 30,
  },
});

export default PostForSale;
