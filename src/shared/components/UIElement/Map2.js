import React from "react"

import './Map.css'
import {
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const Map = props => {
    const { center, zoom } = props;

    const MapWithAMarker = withGoogleMap(props =>
        <GoogleMap
          defaultZoom={zoom}
          defaultCenter={center}
          // mapTypeId='satellite'
        >
          <Marker
            position={center}
          />
        </GoogleMap>
      );

    return (
        <div className={`map ${props.className}`}>
        <MapWithAMarker
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
        />
        </div>
    );
}

export default Map