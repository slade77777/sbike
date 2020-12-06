import React from 'react';
import {useUserInfo} from 'shared-logic';
import styled from 'styled-components';
import {useAuthState} from '../../context/auth-context';

const HelloUser = () => {
  const {handleLogout} = useAuthState();
  const {data} = useUserInfo({
    onSuccess: (res) => {
      if (res.status === 401) {
        handleLogout();
      }
    },
    onError: () => {
      handleLogout();
    },
  });
  return <StyledText>Xin chào: {data?.data?.userName || ''}</StyledText>;
};

const StyledText = styled.h4`
  text-align: center;
  color: #ffffff;
  padding: 10px 0;
`;

export default HelloUser;
