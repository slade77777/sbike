import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {StoreState, Apartment} from 'shared-logic';
import PropertyCard from './PropertyCard';
import PropertyListHeader from './PropertyListHeader';

const PropertyList: React.FC = () => {
  const {apartments} = useSelector<
    StoreState,
    {
      apartments: Apartment[];
      loading: boolean;
    }
  >((state) => ({
    apartments:
      state.apartment?.apartments?.filter(
        (apartment) =>
          apartment?.transaction?.price &&
          apartment?.square_meters &&
          apartment?.project?.address &&
          apartment?.project?.name,
      ) || [],
    loading:
      state.apartment?.loadingList ||
      state.project?.loadingAllApartment ||
      false,
  }));

  const renderItem = ({item}: {item: Apartment}) => (
    <PropertyCard
      imageUri={item.thumbnail}
      projectName={item.project.name}
      // @ts-ignore
      projectAddress={item.project.address} // FIXME: there is something wrong with our types
      price={item.transaction?.price}
      rooms={item.rooms}
      squareMeters={item.square_meters}
    />
  );

  return (
    <View>
      <FlatList
        style={styles.list}
        ListHeaderComponent={
          <PropertyListHeader
            areaName="tại Hà Nội"
            unitsAmount={apartments.length}
          />
        }
        data={apartments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    marginBottom: 50,
  },
});

export default PropertyList;
