import React from 'react';
import {View} from 'react-native';
import {Project} from 'shared-logic';
import OnSaleProjectTile from './OnSaleProjectTile';

type Props = {
  projects: Project[];
};

const OnSaleProjectList: React.FC<Props> = ({projects}) => {
  return (
    <View>
      {projects.map((project: Project) => (
        <OnSaleProjectTile
          key={project.id}
          thumbnail={project.thumnail}
          priceRange={project.price_range}
          name={project.name}
          address={project.address.address}
        />
      ))}
    </View>
  );
};

export default OnSaleProjectList;
