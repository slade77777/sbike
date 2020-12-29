import React, {FC} from 'react';
import styled from 'styled-components';
import GoogleMapReact, {Props as GoogleMapProps} from 'google-map-react';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

type Props =
  | {
      children: React.ReactNode;
      options?: any;
    }
  | GoogleMapProps;

const GoogleMap: FC<Props> = ({children, ...props}) => (
  <Wrapper>
    <GoogleMapReact
      debounced
      bootstrapURLKeys={{
        key:
          process.env.GOOGLE_MAPS_KEY ||
          'AIzaSyDjgghF4mwFy-wsFzQnlTYpnbMJXEqIlNg',
        libraries: ['drawing', 'geometry'],
      }}
      options={{
        ...props.options,
        styles: ['default'],
      }}
      {...props}>
      {children}
    </GoogleMapReact>
  </Wrapper>
);

export default GoogleMap;
