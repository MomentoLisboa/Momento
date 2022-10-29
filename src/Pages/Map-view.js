import React from 'react';
import Map from '../componants/Map';

const MapView = () => {
    const coordinates = [
        { latitude: 38.71106863522107, longitude: -9.149738800591143, desc: "The Mill", key: "1" },
        { latitude: 38.71421633073849, longitude: -9.151948951909155, desc: "Restaurant", key: "2" },
        { latitude: 38.71352987544826, longitude: -9.149931905163147, desc: "Other", key: "3" }
    ];

    return (<>
        <h1 className="text-white">MAP VIEW</h1>
        <Map coordinates={coordinates} />
    </>)
}

export default MapView
