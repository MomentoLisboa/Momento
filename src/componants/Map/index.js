import L from 'leaflet';
import {
    MapContainer,
    TileLayer,
    Circle,
    Popup
} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import './MapView.css'


const Map = ({ coordinates = []}) => {
    const icon = L.icon({
        iconUrl: "/images/marker-icon.png",
        iconRetinaUrl: "/images/marker-icon.png",
        shadowUrl: "/images/marker-shadow.png"
    });

    const starterPosition = coordinates.length > 0 ? [coordinates[0].latitude, coordinates[0].longitude] : [38.71307519909844, -9.149991653229893];

    return (
        <MapContainer className="map homeMap" center={starterPosition} zoom={12} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {coordinates.map((coord) => (
                <>
                    <Circle className="circle-magic-kingdom" center={[coord.latitude, coord.longitude]} radius={200} />
                    <Circle className="circle-magic-kingdom" center={[coord.latitude, coord.longitude]} radius={200} />
                </>
            ))}
        </MapContainer>
    )
}

export default Map;
