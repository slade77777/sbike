import React, {useState} from 'react';
import {SearchView} from '../components/Report/SearchView';
import {ScrollView} from 'react-native';
import {getReportList} from 'shared-logic/src/api/report';
import {ResultView} from "../components/Report/ResultView";

export const SpeedReport = () => {
  const [dataList, setDataList] = useState([]);
  const onSearch = (deviceId: string, timeStart: string, timeEnd: string) => {
    getReportList(deviceId, timeStart, timeEnd, 1)
      .then((res) => {
        const data = res.data;
        // @ts-ignore
        setDataList(data);
      })
      .catch((error) => {
        console.log(error);
        alert('có lỗi xảy ra');
      });
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <SearchView onSearch={onSearch} />
      <ResultView data={dataList} displaySpeed={true}/>
    </ScrollView>
  );
};