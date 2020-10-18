import React from 'react';
import {useSelector} from 'react-redux';
import {OutsideFacility, Project, StoreState} from 'shared-logic';

import Map, {ProjectMarker, ClassicMarker} from '../../components/Map/Map';

const Location: React.FC = () => {
  const {projectFacilities, project} = useSelector<
    StoreState,
    {projectFacilities: OutsideFacility[]; project: Project | null}
  >((state) => ({
    projectFacilities: state.project.activeProjectOutside,
    project: state.project.activeProject,
  }));

  // TODO: the logic below should be moved to shared business-logic.
  // For now it is just copied from web
  const markers: ClassicMarker[] = React.useMemo(
    () =>
      projectFacilities.map((facility) => ({
        position: {latitude: facility.lat, longitude: facility.lng},
        iconName: facility.icon,
        tooltipImage: facility.image,
        tooltipTitle: facility.name,
      })),
    [projectFacilities],
  );

  // TODO: the logic below should be moved to shared business-logic.
  // For now it is just copied from web
  const projects: ProjectMarker[] = React.useMemo(
    () =>
      project
        ? [
            {
              id: project.id,
              name: project.name,
              unitsCount: project.number_of_apartment,
              position: {
                latitude: project?.address?.latitude,
                longitude: project?.address?.longitude,
              },
              type: 'dark',
            },
          ]
        : [],
    [project],
  );
  return <Map projects={projects} markers={markers} />;
};

export default Location;
