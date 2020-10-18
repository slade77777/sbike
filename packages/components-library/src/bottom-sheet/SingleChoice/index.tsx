import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import BaseBottomSheet from '../BaseBottomSheet';
import SingleItem from './SingleItem';

type Props = {
  title: string;
  defaultValue?: string;
  dataSource: string[];
  reference: React.RefObject<RBSheet>;
  onCloseHeader: () => void;
  onTap: (offet: any) => void;
  onClose?: () => void;
  onOpen?: () => void;
};

const SingleChoiceBottomSheet: React.FC<Props> = ({
  title,
  defaultValue,
  dataSource,
  reference,
  onCloseHeader,
  onTap,
  onClose,
  onOpen,
}) => {
  return (
    <BaseBottomSheet
      title={title}
      dataSource={dataSource}
      reference={reference}
      onCloseHeader={onCloseHeader}
      // onTap={onTap}
      onClose={onClose}
      onOpen={onOpen}
      renderItem={(item) => (
        <SingleItem
          isSelected={item.item === defaultValue}
          data={item.item}
          onPress={onTap}
        />
      )}
      itemHeight={48}
    />
  );
};

export default SingleChoiceBottomSheet;
