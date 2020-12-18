import React, {FC} from 'react';
// import {Button, Space} from 'antd';
import {LatLng} from 'shared-logic';
import styled from 'styled-components';
import SafeZoneAlertMap from './SafeZoneAlertMap';

type Props = {};
const DATA = [
  {lat: 21.044586186993122, lng: 105.8093549310303},
  {lat: 21.023997550403646, lng: 105.79021468750003},
  {lat: 20.99795726495666, lng: 105.82566276184085},
  {lat: 20.99859831115889, lng: 105.85905089965823},
  {lat: 21.0243981346692, lng: 105.88874831787112},
  {lat: 21.036655492673553, lng: 105.86634650817874},
  {lat: 21.04530713826339, lng: 105.84832206359866},
  {lat: 21.040420622424534, lng: 105.83982482543948},
  {lat: 21.031207902473184, lng: 105.83553329101565},
  {lat: 21.039419267418612, lng: 105.82355990997317},
];
const SafeZoneAlert: FC<Props> = () => {
  function handleSubmit(data: LatLng[]) {
    console.log(data);
  }
  return (
    <StyledContainer>
      <SafeZoneAlertMap initialData={DATA} onSubmit={handleSubmit} />
    </StyledContainer>
  );
};

const StyledContainer = styled.div``;

export default SafeZoneAlert;
