import {Button, H2, L1, L3_Bold} from 'components-library';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, ScrollView, StyleSheet, View, Text} from 'react-native';
import ThreeBulletpoints from '../components/ThreeBulletpoints';
const Post4SaleImg1 = '../assets/post4Sale_1.png';
const Post4SaleImg2 = '../assets/post4Sale_2.png';
const Post4SaleImg3 = '../assets/post4Sale_3.png';

const PostForSale: React.FC = () => {
  const {t} = useTranslation();

  return (
    <ScrollView>
      <View style={styles.section}>
        <Image
          resizeMode="cover"
          accessibilityIgnoresInvertColors
          style={styles.image}
          source={require(Post4SaleImg1)}
        />
        <View style={styles.content}>
          <H2>{t('screens.postForSale.sellWithOneHousing')}</H2>
          <L1>{t('screens.postForSale.getRidOfTheHassle')}</L1>
          <Button
            style={styles.button}
            title={t('screens.postForSale.begin')}
            type="contained"
          />
        </View>
      </View>
      <View style={styles.section}>
        <Image
          resizeMode="cover"
          accessibilityIgnoresInvertColors
          style={styles.image}
          source={require(Post4SaleImg2)}
        />
        <View style={styles.content}>
          <H2>{t('screens.postForSale.contactASalesSpecialist')}</H2>
          <L1>{t('screens.postForSale.chooseTheProfessional')}</L1>
          <Button
            style={styles.button}
            title={t('screens.postForSale.contactNow')}
            type="contained"
          />
        </View>
      </View>
      <View style={styles.section}>
        <Image
          resizeMode="cover"
          accessibilityIgnoresInvertColors
          style={styles.image}
          source={require(Post4SaleImg3)}
        />
        <View style={styles.content}>
          <Text style={styles.quote}>
            {t('screens.postForSale.clientQuote')}
          </Text>
          <L3_Bold>{t('screens.postForSale.quoteAuthor')}</L3_Bold>
        </View>
      </View>
      <ThreeBulletpoints
        header={t('screens.postForSale.bulletpoints.header')}
        first={{
          title: t(`screens.postForSale.bulletpoints.first.title`),
          description: t(`screens.postForSale.bulletpoints.first.description`),
        }}
        second={{
          title: t(`screens.postForSale.bulletpoints.second.title`),
          description: t(`screens.postForSale.bulletpoints.second.description`),
        }}
        third={{
          title: t(`screens.postForSale.bulletpoints.third.title`),
          description: t(`screens.postForSale.bulletpoints.third.description`),
        }}
        buttonLabel={t(`screens.postForSale.bulletpoints.buttonLabel`)}
        onButtonClick={() => undefined}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  section: {
    display: 'flex',
    marginBottom: 30,
  },
  content: {
    margin: 20,
  },
  image: {
    height: 300,
    width: '100%',
  },
  button: {
    marginTop: 10,
    width: '100%',
  },
  quote: {
    fontSize: 36,
    lineHeight: 48,
    fontStyle: 'italic',
    marginBottom: 16,
  },
});

export default PostForSale;
