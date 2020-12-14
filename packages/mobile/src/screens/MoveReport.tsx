import React from 'react';
import dayjs from 'dayjs';
import {SearchView} from "../components/Report/SearchView";
import {ResultView} from "../components/Report/ResultView";

const DATA = [
  {
    action: 'Bật máy',
    time: dayjs().format('HH:mm:ss DD/M/YYYY')
  },
  {
    action: 'Tắt máy',
    time: dayjs().format('HH:mm:ss DD/M/YYYY')
  },
  {
    action: 'Bật máy',
    time: dayjs().format('HH:mm:ss DD/M/YYYY')
  },
  {
    action: 'Tắt máy',
    time: dayjs().format('HH:mm:ss DD/M/YYYY')
  },
  {
    action: 'Bật máy',
    time: dayjs().format('HH:mm:ss DD/M/YYYY')
  },
  {
    action: 'Tắt máy',
    time: dayjs().format('HH:mm:ss DD/M/YYYY')
  },
  {
    action: 'Bật máy',
    time: dayjs().format('HH:mm:ss DD/M/YYYY')
  },
  {
    action: 'Tắt máy',
    time: dayjs().format('HH:mm:ss DD/M/YYYY')
  },
  {
    action: 'Bật máy',
    time: dayjs().format('HH:mm:ss DD/M/YYYY')
  },
  {
    action: 'Tắt máy',
    time: dayjs().format('HH:mm:ss DD/M/YYYY')
  },
  {
    action: 'Bật máy',
    time: dayjs().format('HH:mm:ss DD/M/YYYY')
  },
  {
    action: 'Tắt máy',
    time: dayjs().format('HH:mm:ss DD/M/YYYY')
  },
  {
    action: 'Bật máy',
    time: dayjs().format('HH:mm:ss DD/M/YYYY')
  },
  {
    action: 'Tắt máy',
    time: dayjs().format('HH:mm:ss DD/M/YYYY')
  },
  {
    action: 'Bật máy',
    time: dayjs().format('HH:mm:ss DD/M/YYYY')
  },
  {
    action: 'Tắt máy',
    time: dayjs().format('HH:mm:ss DD/M/YYYY')
  },
  {
    action: 'Bật máy',
    time: dayjs().format('HH:mm:ss DD/M/YYYY')
  },
  {
    action: 'Tắt máy',
    time: dayjs().format('HH:mm:ss DD/M/YYYY')
  },
  {
    action: 'Bật máy',
    time: dayjs().format('HH:mm:ss DD/M/YYYY')
  },
  {
    action: 'Tắt máy',
    time: dayjs().format('HH:mm:ss DD/M/YYYY')
  },
  {
    action: 'Bật máy',
    time: dayjs().format('HH:mm:ss DD/M/YYYY')
  },
  {
    action: 'Tắt máy',
    time: dayjs().format('HH:mm:ss DD/M/YYYY')
  },
  {
    action: 'Bật máy',
    time: dayjs().format('HH:mm:ss DD/M/YYYY')
  },
  {
    action: 'Tắt máy',
    time: dayjs().format('HH:mm:ss DD/M/YYYY')
  },
  {
    action: 'Bật máy',
    time: dayjs().format('HH:mm:ss DD/M/YYYY')
  },
  {
    action: 'Tắt máy',
    time: dayjs().format('HH:mm:ss DD/M/YYYY')
  },
  {
    action: 'Bật máy',
    time: dayjs().format('HH:mm:ss DD/M/YYYY')
  },
  {
    action: 'Tắt máy',
    time: dayjs().format('HH:mm:ss DD/M/YYYY')
  },
  {
    action: 'Bật máy',
    time: dayjs().format('HH:mm:ss DD/M/YYYY')
  },
  {
    action: 'Tắt máy',
    time: dayjs().format('HH:mm:ss DD/M/YYYY')
  },
  {
    action: 'Bật máy',
    time: dayjs().format('HH:mm:ss DD/M/YYYY')
  },
  {
    action: 'Tắt máy',
    time: dayjs().format('HH:mm:ss DD/M/YYYY')
  },
];

export const MoveReport = () => {
  return (
    <>
      <SearchView />
      <ResultView data={DATA}/>
    </>
  );
};