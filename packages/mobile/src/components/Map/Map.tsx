import React from 'react';
import {StyleSheet} from 'react-native';

import MapView, {Marker} from 'react-native-maps';
import FacilityMarker from './FacilityMarker';
import ProjectMarker, {MarkerType} from './ProjectMarker';

export type Position = {
  latitude: number;
  longitude: number;
};

export type ClassicMarker = {
  id?: string;
  iconName: string;
  position: Position;
  tooltipImage?: string;
  tooltipTitle?: string;
};

export type ProjectMarker = {
  id: string;
  name: string;
  unitsCount?: number;
  position: Position;
  type: MarkerType;
};

type Props = {
  markers?: ClassicMarker[];
  projects?: ProjectMarker[];
  center?: Position;
  setSelectedProject?: (project?: ProjectMarker) => void;
};

const Map: React.FC<Props> = ({
  markers = [],
  projects = [],
  center,
  setSelectedProject,
}) => {
  return (
    <MapView
      style={styles.map}
      onPress={() => {
        if (setSelectedProject) setSelectedProject(undefined);
      }}
      initialRegion={{
        latitude: center ? center.latitude : 21.01914952618257,
        longitude: center ? center.longitude : 105.84612382285086,
        latitudeDelta: 0.3,
        longitudeDelta: 0.3,
      }}>
      {markers.map((marker, idx) => (
        <Marker key={`marker-${idx}`} coordinate={marker.position}>
          <FacilityMarker type={marker.iconName} onPress={() => {}} />
        </Marker>
      ))}
      {projects.map((project) => (
        <Marker
          key={project.name}
          coordinate={project.position}
          onPress={() => {
            setSelectedProject?.(project);
          }}>
          <ProjectMarker
            name={project.name}
            propertiesCount={project.unitsCount}
            type={project.type}
          />
        </Marker>
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default Map;
