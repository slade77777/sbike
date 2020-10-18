import React from 'react';
import {useTranslation} from 'react-i18next';
import ListHeader from '../../components/ListHeader';

type Props = {
  areaName: string;
  unitsAmount: number;
};

const PropertyListHeader: React.FC<Props> = ({areaName, unitsAmount}) => {
  const {t} = useTranslation();
  return (
    <ListHeader
      title={t('screens.propertyListing.properties', {location: areaName})}
      subtitle={t('screens.propertyListing.onSale', {
        units: unitsAmount,
      })}
    />
  );
};

export default PropertyListHeader;
