import {RouteProp, useRoute} from '@react-navigation/native';
import {Button, Colors, L3, L3_Bold, L5_Bold} from 'components-library';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  ApartmentImage,
  projectActions,
  StoreState,
} from 'shared-logic';
import PhotoGrid from '../../components/PhotoGrid';
import {MainStackParamList} from '../../RootNavigator';
import Detail from './Detail';

const ApartmentDetails: React.FC = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {
    params: {apartment},
  } = useRoute<RouteProp<MainStackParamList, 'ApartmentDetails'>>();
  const {images} = useSelector<
    StoreState,
    {
      images: ApartmentImage[];
    }
  >((state) => ({
    images: state.project?.activeProjectSampleApartmentImages[apartment.id],
  }));

  useEffect(() => {
    dispatch(
      projectActions.fetchActiveProjectSampleApartmentImages(apartment.id),
    );
  }, [apartment, dispatch]);

  return (
    <View style={styles.container}>
      <PhotoGrid style={styles.photos} photos={images?.map((i) => i.url)} />
      <View style={styles.infoContainer}>
        <L5_Bold
          style={
            styles.location
          }>{`${apartment.area?.toUpperCase()} - ${apartment.project?.name?.toUpperCase()}`}</L5_Bold>
        <View style={styles.nameAndAreaContainer}>
          <L3_Bold>{apartment.name}</L3_Bold>
          <L3>{`${apartment.square_meters} m2`}</L3>
        </View>
        <View style={styles.detailsContainer}>
          <Detail // TODO: Add correct details as per Figma. Currently not returned from the API.
            name={t('screens.apartmentDetails.bathrooms')}
            amount={2}
          />
          <Detail name={t('screens.apartmentDetails.bedrooms')} amount={3} />
        </View>
        <View style={styles.buttonsContainer}>
          <Button title={t('screens.apartmentDetails.call')} />
          <Button title={t('screens.apartmentDetails.message')} />
          <Button
            title={t('screens.apartmentDetails.schedule')}
            type="contained"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  photos: {
    marginBottom: '35%',
  },
  infoContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    paddingTop: 12,
    paddingBottom: 30,
    paddingHorizontal: 20,
    backgroundColor: Colors.white400,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  location: {
    color: Colors.gray400,
    marginBottom: 4,
  },
  nameAndAreaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default ApartmentDetails;
