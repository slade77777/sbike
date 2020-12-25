import React, {useEffect} from 'react';
import {useMutation} from 'react-query';
import {getUserInfo} from 'shared-logic';
import {Spin} from 'antd';
import styled from 'styled-components';
import {useAuthState} from '../../context/auth-context';

const HelloUser = () => {
  const {onLogout} = useAuthState();

  const [getUserMutation, {data, isLoading}] = useMutation(getUserInfo, {
    onSuccess: async (res) => {
      if (res.status === 401) {
        onLogout();
      }
    },
    onError: async () => {
      onLogout();
    },
  });

  async function getUserInfoAsync() {
    await getUserMutation();
  }

  useEffect(() => {
    getUserInfoAsync();
  }, []);

  return (
    <Spin spinning={isLoading}>
      <StyledText>
        Xin chào: {data?.data?.fullName || data?.data?.userName || ''}
      </StyledText>
    </Spin>
  );
};

const StyledText = styled.h4`
  text-align: center;
  color: #ffffff;
  padding: 10px 0;
`;

export default HelloUser;
