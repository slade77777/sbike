import React from 'react';
import { View, FlatList, Text } from 'react-native';
import {Report} from "shared-logic/src";
import dayjs from "dayjs";

type Props = {
  data: Array<any>;
  displaySpeed?: boolean
}

export const ResultView: React.FC<Props> = ({data, displaySpeed = false}) => {
  const renderItem = (item: Report) => {
    return (
      <View
        key={item.time}
        style={{
          backgroundColor: 'white',
          width: '100%',
          height: 50,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 10,
          borderBottomWidth: 1,
          borderColor: 'grey'
        }}>
        <View>
          <Text>{dayjs(item.time).format('H:mm:ss DD/M/YYYY')}</Text>
          {displaySpeed && <Text>{item.position.speed}km/h</Text>}
        </View>
        <Text style={{ fontWeight: 'bold', lineHeight: 20, fontSize: 15}}>{item.message}</Text>
      </View>
    );
  };
  
  return (
    <FlatList
    data={data}
    renderItem={(item) => renderItem(item.item)}
    keyExtractor={(_, index) => index.toString()}
    />
  );
};
