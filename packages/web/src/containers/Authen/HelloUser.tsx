import React, {useEffect} from 'react';
import {useMutation} from 'react-query';
import {getUserInfo} from 'shared-logic';
import {Spin} from 'antd';
import styled from 'styled-components';
import {useAuthState} from '../../context/auth-context';

const HelloUser = () => {
  const {onLogout} = useAuthState();

  const getUserMutation = useMutation(getUserInfo, {
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
    await getUserMutation.mutate();
  }

  useEffect(() => {
    getUserInfoAsync();
  }, []);

  return (
    <Spin spinning={getUserMutation.isLoading}>
      <StyledText>
        Xin chào:{' '}
        {getUserMutation?.data?.data?.fullName ||
          getUserMutation?.data?.data?.userName ||
          ''}
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
