import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {FAB} from 'react-native-paper';
import {Colors, Icon} from 'components-library';
import {projectActions, apartmentActions} from 'shared-logic';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';

import PropertySearchBar from './PorpertySearchBar';
import PropertyList from './PropertyList';
import PropertyMap from './PropertyMap';

// TODO: Move to shared-logic
export enum MarketType {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  GENERAL = 'GENERAL',
}

const PropertyListing: React.FC = () => {
  const {t} = useTranslation();
  const [mapOpened, setMapOpened] = useState(false);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(projectActions.fetchProjects());
    dispatch(
      apartmentActions.fetchApartments({
        marketType: MarketType.SECONDARY,
        isSample: false,
      }),
    );
  }, [dispatch]);

  const handleViewToggle = () => {
    setMapOpened((o) => !o);
  };

  return (
    <SafeAreaView>
      <View style={styles.content}>
        <PropertySearchBar />
        {mapOpened ? <PropertyMap /> : <PropertyList />}
        <FAB
          key={`${mapOpened}`}
          style={styles.fab}
          onPress={handleViewToggle}
          icon={({color}) => (
            <View style={styles.fabIcon}>
              <Icon name={mapOpened ? 'list' : 'map'} size={16} color={color} />
            </View>
          )}
          accessibilityStates={[]}
          color={Colors.blue500}
          label={
            mapOpened
              ? t('screens.propertyListing.list')
              : t('screens.propertyListing.map')
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.white400,
  },
  fabIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  content: {
    height: '100%',
  },
});

export default PropertyListing;
