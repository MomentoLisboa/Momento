import L from 'leaflet';
import {
    MapContainer,
    TileLayer,
    Circle,
    Popup
} from 'react-leaflet';
import { useEffect, useState } from 'react';

import 'leaflet/dist/leaflet.css';

import './MapView.css'


const Map = ({ MomentoNFTs }) => {

    const [info, setInfo] = useState(undefined);
    const countdownTime = 5000;
    const [countdown, setCountdown] = useState(()=>{});

    // const icon = L.icon({
    //     iconUrl: "/images/marker-icon.png",
    //     iconRetinaUrl: "/images/marker-icon.png",
    //     shadowUrl: "/images/marker-shadow.png"
    // });

    const starterPosition = MomentoNFTs.length > 0 ? [MomentoNFTs?.properties?.coords[0].latitude, MomentoNFTs?.properties?.coords[0].longitude] : [38.71307519909844, -9.149991653229893];


    if(info?.name !== undefined){
        console.log(info?.name)
    }

    useEffect(()=>{
        if(info !== undefined){
            clearInterval(countdown);
            setCountdown( setInterval(()=> setInfo(undefined), countdownTime) );
        }else{
            clearInterval(countdown);
        }
    }, [info])


    return (
        <>
            <div style={{color: 'white'}}>{info?.name}</div>
            <MapContainer className="map homeMap" center={starterPosition} zoom={12} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {MomentoNFTs.map((URI, index) => {

                    const coord = {
                        latitude: URI?.properties.coords.latitude,
                        longitude: URI?.properties.coords.longitude,
                        name: URI?.name,
                        description: URI?.description,
                        key: index
                    }

                    return(
                        <>
                            <Circle className="circle-magic-kingdom" center={[coord.latitude, coord.longitude]} radius={200} eventHandlers={{ click: () => setInfo(URI) }}/>
                            <Circle className="circle-magic-kingdom" center={[coord.latitude, coord.longitude]} radius={200} eventHandlers={{ click: () => setInfo(URI) }}/>
                        </>
                    )
                })}
            </MapContainer>
        </>
    )
}

export default Map;
