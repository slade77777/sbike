import React, {FC} from 'react';
import styled from 'styled-components';
import {Button} from 'antd';
import {ArrowRightOutlined, ArrowLeftOutlined} from '@ant-design/icons';

type Props = {
  toggle: () => void;
  open: boolean;
  children: React.ReactNode;
  label?: string;
};

const Drawer: FC<Props> = ({label, open, toggle, children}) => {
  return (
    <StyledDrawer className={open ? 'open' : ''}>
      {label ? (
        <Button
          className={`expand_btn_has_label ${open ? 'btn-small' : ''}`}
          onClick={toggle}
          type="primary"
          icon={open ? <ArrowLeftOutlined /> : <ArrowRightOutlined />}>
          {!open && label}
        </Button>
      ) : (
        <Button
          className="expand_btn"
          onClick={toggle}
          type="primary"
          icon={open ? <ArrowLeftOutlined /> : <ArrowRightOutlined />}
          style={{width: 32, height: 32}}
        />
      )}
      <div>{children}</div>
    </StyledDrawer>
  );
};

const StyledDrawer = styled.div`
  width: 350px;
  position: relative;
  height: 100%;
  max-height: calc(100vh - 50px);
  background-color: #fff;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  transform: translateX(-100%);
  transition: all ease-in-out 300ms;
  transform-origin: top;
  &.open {
    transform: translateX(0);
    transition: all ease-in-out 300ms;
  }
  .expand_btn_has_label {
    position: absolute;
    top: 5px;
    left: 355px;
    z-index: 8;
    transition: all ease-in-out 300ms;
    width: 140px;
    height: 32px;
    &.btn-small {
      transition: all ease-in-out 300ms;
      width: 32px;
      height: 32px;
    }
  }
  .expand_btn {
    position: absolute;
    top: 5px;
    right: -37px;
    z-index: 8;
  }
`;

export default Drawer;
