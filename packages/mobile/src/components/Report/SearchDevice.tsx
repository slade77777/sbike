import React, {useMemo} from 'react';
import {useAuthState} from "../../context/auth-context";
import useDeviceCompany from "shared-logic/src/hooks/useDeviceCompany";
import DropDownPicker from 'react-native-dropdown-picker';

export interface Props {
  onPress?: (id: string) => void
}

export const SearchDevice: React.FC<Props> = ({onPress}) => {
  const {state} = useAuthState();
  const userInfo = state?.userData;
  const {data} = useDeviceCompany(userInfo?.companyID);
  const deviceData = data?.data;
  const optionList = useMemo(() => {
    return deviceData?.map(device =>  {
      return {
        label: device.carNumber,
        value: device.deviceID
      }
    })
  }, [deviceData])

  return (
    <DropDownPicker
      items={optionList || []}
      multiple={false}
      placeholder="Chọn xe"
      containerStyle={{height: 40}}
      style={{backgroundColor: 'white', width: 150}}
      itemStyle={{
        justifyContent: 'flex-start',
        height: 40
      }}
      dropDownStyle={{backgroundColor: '#fafafa'}}
      onChangeItem={item => {
        onPress && onPress(item.value)
      }}
    />
  );
};

