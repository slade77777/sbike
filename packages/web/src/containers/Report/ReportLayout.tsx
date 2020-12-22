import React, {FC, useState} from 'react';
import {useMutation} from 'react-query';
import styled from 'styled-components';
import {Device, DeviceLocation, getReports, ReportType} from 'shared-logic';
import ReportHeader, {ReportSearchParam} from './ReportHeader';
import Drawer from './Drawer';
import ReportTable from './ReportTable';
import ReportMap from './ReportMap';

type Props = {
  type: ReportType;
  devices?: Array<Device>;
};

export type DataSource = {
  [type: string]: Array<any>;
};

const ReportLayout: FC<Props> = ({devices, type}) => {
  const [open, setOpen] = useState(false);
  const [dataSource, setDataSource] = useState<DataSource | null>(null);
  const [location, setLocation] = useState<DeviceLocation | null>(null);

  const [mutate, {isLoading}] = useMutation(getReports, {
    onSuccess: () => setOpen(true),
  });

  async function handleSearch(values: ReportSearchParam) {
    const searchRes = await mutate({
      deviceID: values.deviceID,
      startTime: values.fromTo[0],
      endTime: values.fromTo[1],
      type: type,
    });
    setDataSource({
      [type]: searchRes?.data || [],
    });
  }

  return (
    <StyledContainer>
      <ReportHeader onSubmit={handleSearch} devices={devices || []} />
      <StyledSearchResult>
        <Drawer toggle={() => setOpen(!open)} open={open}>
          <ReportTable
            type={type}
            viewLocation={(vl) => setLocation(vl)}
            data={dataSource?.[type] || []}
            loading={isLoading}
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
