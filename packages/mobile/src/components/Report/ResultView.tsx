import React from 'react';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';
import {Report} from 'shared-logic/src';
import dayjs from 'dayjs';

type Props = {
  data: Array<any>;
  displaySpeed?: boolean;
  chooseTime: (item: Report) => void;
  timeChoice?: string;
};

export const ResultView: React.FC<Props> = ({
  data,
  displaySpeed = false,
  chooseTime,
  timeChoice,
}) => {
  const renderItem = (item: Report) => {
    return (
      <TouchableOpacity
        key={item.time}
        style={{
          backgroundColor: timeChoice === item.time ? '#bdbdbd' : 'white',
          width: '100%',
          height: 50,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 10,
          borderTopWidth: 1,
          borderColor: 'grey',
        }}
        onPress={() => chooseTime(item)}>
        <View>
          <Text>{dayjs(item.time).format('HH:mm:ss DD/MM/YYYY')}</Text>
          {displaySpeed && <Text>{item.position.speed}km/h</Text>}
        </View>
        <Text style={{fontWeight: 'bold', lineHeight: 20, fontSize: 15}}>
          {item.message}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={data}
      style={{height: 200}}
      renderItem={(item) => renderItem(item.item)}
      keyExtractor={(_, index) => index.toString()}
    />
  );
};
