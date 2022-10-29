import * as React from 'react';
import Map from 'react-map-gl';

const OurMap = () => {
  return (
    <Map
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14
      }}
      style={{width: 600, height: 400}}
      mapboxAccessToken='pk.eyJ1IjoibmFuZHliYSIsImEiOiJja3huYXp6NWgwbDhrMnBqdmNvZmJsdzkxIn0.lWkZS9sM9tjx5uPFz_byGQ'
      mapStyle="mapbox://styles/mapbox/light-v10"
    />
  );
}

export default OurMap
