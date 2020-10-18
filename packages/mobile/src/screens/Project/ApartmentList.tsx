import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Colors, H2} from 'components-library';
import {
  Apartment,
  projectActions,
  StoreState,
} from 'shared-logic';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MainStackParamList} from '../../RootNavigator';
import ApartmentItem from './ApartmentItem';

type SelectedProps = {
  sampleApartments: Apartment[];
};

type Props = {
  projectId: string;
};

const ApartmentList: React.FC<Props> = ({projectId}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();

  const {sampleApartments} = useSelector<StoreState, SelectedProps>(
    (state) => ({
      sampleApartments: state.project.activeProjectSampleApartments,
    }),
  );

  useEffect(() => {
    dispatch(projectActions.fetchActiveProjectSampleApartments(projectId));
  }, [dispatch, projectId]);

  const handleApartmentClick = (apartment: Apartment) =>
    navigation.navigate('ApartmentDetails', {apartment});

  return (
    <View style={styles.container}>
      <H2 style={styles.header}>
        {t('screens.projectDetails.apartmentListTitle')}
      </H2>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {sampleApartments.map((apartment) => (
          <ApartmentItem
            id={apartment.id}
            key={apartment.id}
            onPress={() => handleApartmentClick(apartment)}
            apartmentName={apartment.name}
            projectName={apartment.project.name}
            squareMeters={apartment.square_meters}
            thumbnail={apartment.thumbnail}
            area={apartment.area}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 22,
    borderColor: Colors.gray300,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  header: {
    marginLeft: 12,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
  },
});

export default ApartmentList;
