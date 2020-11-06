import React, {FC} from 'react';
import {Modal} from 'antd';

type Props = {
  title: string;
  visible: boolean;
  hasFooter?: boolean;
  modalContent: React.ReactNode;
  modalAction: React.ReactNode;
  onOkay?: () => void;
  onClose?: () => void;
};

const ModalWrapper: FC<Props> = ({
  visible,
  hasFooter,
  title,
  modalContent,
  modalAction,
  onOkay,
  onClose,
}) => {
  return (
    <>
      {modalAction}
      <Modal
        title={title}
        visible={visible}
        footer={hasFooter}
        onOk={onOkay}
        onCancel={onClose}>
        {modalContent}
      </Modal>
    </>
  );
};

export default ModalWrapper;
