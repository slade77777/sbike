import React, {FC, useState} from 'react';
import {useMutation} from 'react-query';
import styled from 'styled-components';
import {Device, DeviceLocation, getReports, ReportType} from 'shared-logic';
import ReportHeader, {ReportSearchParam} from './ReportHeader';
import Drawer from './Drawer';
import ReportTable from './ReportTable';
import ReportMap from './ReportMap';

type Props = {
  type: string | ReportType;
  devices?: Array<Device>;
};

const ReportLayout: FC<Props> = ({devices, type}) => {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState<DeviceLocation | null>(null);

  const [mutate, searchRes] = useMutation(getReports, {
    onSuccess: () => setOpen(true),
  });

  async function handleSearch(values: ReportSearchParam) {
    await mutate({
      deviceID: values.deviceID,
      startTime: values.fromTo[0],
      endTime: values.fromTo[1],
      type: type,
    });
  }

  return (
    <StyledContainer>
      <ReportHeader
        onSubmit={handleSearch}
        devices={devices || []}
        type={type}
      />
      <StyledSearchResult>
        <Drawer toggle={() => setOpen(!open)} open={open}>
          <ReportTable
            type={type}
            viewLocation={(vl) => setLocation(vl)}
            data={searchRes?.data?.data || []}
            loading={searchRes.isLoading}
          />
        </Drawer>
      </StyledSearchResult>
      <StyledGoogleMap>
        <ReportMap location={location} devices={devices || []} />
      </StyledGoogleMap>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  position: relative;
`;

const StyledGoogleMap = styled.div`
  height: calc(100vh - 50px);
`;

const StyledSearchResult = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
  z-index: 9;
`;

export default ReportLayout;
