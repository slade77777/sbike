import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import ThreeBulletpoints from '../../components/ThreeBulletpoints';

const WhyUs: React.FC = () => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <ThreeBulletpoints
        header={t('screens.whyUs.title')}
        buttonLabel={t('screens.whyUs.button')}
        onButtonClick={() => {}}
        first={{
          title: t('screens.whyUs.point1Title'),
          description: t('screens.whyUs.point1Desc'),
        }}
        second={{
          title: t('screens.whyUs.point2Title'),
          description: t('screens.whyUs.point2Desc'),
        }}
        third={{
          title: t('screens.whyUs.point3Title'),
          description: t('screens.whyUs.point3Desc'),
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});

export default WhyUs;
