import React from 'react';
import styled from 'styled-components';
import {useAuthState} from '../../context/auth-context';

const HelloUser = () => {
  const {userInfo} = useAuthState();

  return (
    <StyledText>
      Xin chào: {userInfo?.fullName || userInfo?.userName || ''}
    </StyledText>
  );
};

const StyledText = styled.h4`
  text-align: center;
  color: #ffffff;
  padding: 10px 0;
`;

export default HelloUser;
