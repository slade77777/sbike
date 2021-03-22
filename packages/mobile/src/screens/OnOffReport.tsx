import React, {useState} from 'react';
import {SearchView} from '../components/Report/SearchView';
import {ScrollView} from 'react-native';
import {getReportList} from 'shared-logic/src/api/report';
import {ResultView} from "../components/Report/ResultView";
import MapPosition from "../components/Report/MapPosition";
import {Report} from "shared-logic";

export const OnOffReport = () => {
  const [dataList, setDataList] = useState([]);
  const [timeChoice, setTimeChoice] = useState<Report>();
  const onSearch = (deviceId: string, timeStart: string, timeEnd: string) => {
    getReportList(deviceId, timeStart, timeEnd, 2)
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
      <ResultView data={dataList} timeChoice={timeChoice?.time} chooseTime={(item: Report) => setTimeChoice(item)}/>
      {
        dataList.length > 0 && timeChoice && <MapPosition positionInfo={timeChoice}/>
      }
    </ScrollView>
  );
};
