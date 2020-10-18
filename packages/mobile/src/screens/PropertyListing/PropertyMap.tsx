import React, {useState} from 'react';
import {
  apartmentActions,
  OutsideFacility,
  Project,
  projectActions,
  StoreState,
} from 'shared-logic';
import {useDispatch, useSelector} from 'react-redux';
import Map, {ProjectMarker, ClassicMarker} from '../../components/Map/Map';
import {MarketType} from './PropertyListing';

const PropertyMap: React.FC = () => {
  // The logic below is mostly copiedd from transactino-web-next

  const dispatch = useDispatch();
  const [projectSelected, setProjectSelected] = useState<
    undefined | ProjectMarker
  >();
  const [markers, setMarkers] = useState<undefined | ClassicMarker[]>();

  const {projects, projectFacilities} = useSelector<
    StoreState,
    {
      loading: boolean;
      projects: Project[];
      projectFacilities: OutsideFacility[];
    }
  >((state) => ({
    loading: state.project?.loadingActive || false,
    projects: state.project?.projects,
    projectFacilities: state.project?.activeProjectOutside,
  }));

  const handleProjectSelect = (project?: ProjectMarker) => {
    if (project && project?.id !== projectSelected?.id) {
      setMarkers(undefined);
      setProjectSelected(project);
    }
  };

  React.useEffect(() => {
    if (projectSelected) {
      dispatch(projectActions.fetchActiveProjectOutside(projectSelected.id));
      dispatch(
        apartmentActions.fetchApartments({
          projectId: projectSelected.id,
          marketType: MarketType.SECONDARY,
          isSample: false,
        }),
      );
    }
  }, [dispatch, projectSelected]);

  React.useEffect(() => {
    if (projectFacilities) {
      setMarkers(
        // TODO: the logic below should be moved to shared business-logic
        projectFacilities.map((facility) => ({
          position: {latitude: facility.lat, longitude: facility.lng},
          iconName: facility.icon,
          tooltipImage: facility.image,
          tooltipTitle: facility.name,
        })),
      );
    } else {
      setMarkers(undefined);
    }
  }, [projectFacilities]);

  // TODO: the logic below should be moved to shared business-logic
  const projectsMarkers: ProjectMarker[] = projects
    .filter((project) => project.number_of_2nd_apartment > 0)
    .map((project) => ({
      id: project.id,
      name: project.name,
      position: {
        latitude: project.address.latitude,
        longitude: project.address.longitude,
      },
      type: projectSelected?.id === project.id ? 'dark' : 'primary',
      unitsCount: project.number_of_2nd_apartment,
    }));

  return (
    <Map
      projects={projectsMarkers}
      setSelectedProject={handleProjectSelect}
      markers={projectSelected && markers ? markers : undefined}
    />
  );
};
export default PropertyMap;
