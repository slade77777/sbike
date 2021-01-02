import React, {useMemo} from 'react';
import {useAuthState} from '../../context/auth-context';
import useDeviceCompany from 'shared-logic/src/hooks/useDeviceCompany';
// @ts-ignore
import {Dropdown} from 'react-native-material-dropdown';
import {View} from 'react-native';

export interface Props {
  onPress?: (id: string) => void;
  deviceChoice?: string;
}

export const SearchDevice: React.FC<Props> = ({onPress, deviceChoice}) => {
  const {state} = useAuthState();
  const userInfo = state?.userData;
  const {data} = useDeviceCompany(userInfo?.companyID);
  const deviceData = data?.data;
  const optionList = useMemo(() => {
    return deviceData?.map((device) => {
      return {
        label: device.carNumber,
        value: device.deviceID,
      };
    });
  }, [deviceData]);

  return (
    <View
      style={{
        width: 150,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 5,
        height: 43,
        justifyContent: "center"
      }}>
      <Dropdown
        label={''}
        baseColor={'black'}
        labelHeight={18}
        fontSize={16}
        labelFontSize={0}
        data={optionList}
        itemColor={'#CCCCCC'}
        textColor={'#333333'}
        value={deviceChoice}
        onChangeText={(value: string) => {
          onPress && onPress(value);
        }}
      />
    </View>
  );
};
