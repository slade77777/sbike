import React, {createContext, FC, ReactNode, useContext} from 'react';
import {useQuery} from 'react-query';
import {Device, getDeviceByCompany, User, useUserInfo} from 'shared-logic';

type GlobalContextProps = {
  useInfo?: User | null;
  devices?: Array<Device>;
  loadingDevices?: boolean;
};
const GlobalContext = createContext<GlobalContextProps>({
  useInfo: null,
  devices: [],
  loadingDevices: false,
});

type Props = {
  children: ReactNode;
};
const GlobalProvider: FC<Props> = ({children}) => {
  const userRes = useUserInfo();
  const {data, isLoading} = useQuery(
    [
      'companyDevice',
      userRes?.data?.data?.companyID && userRes.data.data.companyID,
    ],
    getDeviceByCompany,
  );
  return (
    <GlobalContext.Provider
      value={{
        useInfo: userRes?.data?.data || null,
        devices: data?.data || [],
        loadingDevices: isLoading,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalState = () => useContext(GlobalContext);

export {GlobalProvider, useGlobalState};
