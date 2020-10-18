import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

type Props = {
  promotions: {
    id: string;
    title: string;
    description: string;
    icon: string;
  }[];
};

const {width: screenWidth} = Dimensions.get('screen');

const Promotions: React.FC<Props> = ({promotions}) => {
  return (
    <View style={styles.mainContainer}>
      {promotions.map((promotion) => (
        <View key={promotion.id} style={styles.promotionContainer}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{uri: promotion.icon}}
            accessibilityIgnoresInvertColors
          />

          <View style={styles.textContainer}>
            <Text style={styles.title}>{promotion.title}</Text>
            <Text style={styles.content}>{promotion.description}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 12,
    paddingBottom: 18,
  },
  promotionContainer: {
    marginBottom: 18,
    flexDirection: 'row',
  },
  image: {
    width: 24,
    height: 24,
    marginEnd: 12,
  },
  textContainer: {
    width: screenWidth - 48,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  content: {
    width: '100%',
    fontSize: 16,
    lineHeight: 20.8,
    color: Colors.gray400,
  },
});

export default React.memo(Promotions);
