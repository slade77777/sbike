import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {L4, L1_Bold, Colors} from 'components-library';

import Card from '../../components/Card';
import Metric from '../../components/Metric';

type Room = {
  name: string;
  type_room: string;
  amount: number;
};

type Props = {
  imageUri: string;
  projectName: string;
  projectAddress?: string;
  price: string;
  squareMeters: string;
  rooms: Room[];
};

// TODO: this function can be moved to shared utils in shared-logic
const getRoomAmount = (rooms: Room[], roomType: string) => {
  const room = rooms.find((p: any) => p.type_room === roomType);
  return room?.amount || '';
};

const PropertyCard: React.FC<Props> = ({
  imageUri,
  rooms,
  projectName,
  projectAddress,
  price,
  squareMeters,
}) => {
  const bedroomAmount = getRoomAmount(rooms, 'Bedroom');
  const bathroomAmount = getRoomAmount(rooms, 'Bathroom');

  return (
    <Card
      style={styles.card}
      coverPhoto={{uri: imageUri}}
      title={() => (
        <View style={styles.title}>
          <View style={styles.price}>
            <L1_Bold>{price}</L1_Bold>
            <L4 style={styles.currency}>tỷ</L4>
          </View>
          <Text>{projectName}</Text>
        </View>
      )}
      description={() => (
        <View>
          <View style={styles.metrics}>
            <Metric amount={bedroomAmount || '-'} unit={'pNgủ'} />
            <Metric amount={bathroomAmount || '-'} unit={'pTắm'} />
            <Metric amount={squareMeters} unit={'m2'} />
          </View>
          <L4 style={styles.address}>{projectAddress}</L4>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  metrics: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 5,
  },
  price: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currency: {
    marginLeft: 4,
  },
  address: {
    color: Colors.gray400,
  },
});

export default PropertyCard;
