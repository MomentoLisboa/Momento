import L from 'leaflet';
import {
    MapContainer,
    TileLayer,
    Circle,
    Popup,
    useMapEvents
} from 'react-leaflet';
import { useEffect, useState } from 'react';

import 'leaflet/dist/leaflet.css';

import './MapView.css'

const Map = ({MomentoNFTs, initialZoom}) => {

    const [zoomLevel, setZoomLevel] = useState(initialZoom); // initial zoom level provided for MapContainer
    
    const mapEvents = useMapEvents({
        zoomend: () => {
            setZoomLevel(mapEvents.getZoom());
        },
    });
    const [info, setInfo] = useState(undefined);
    const countdownTime = 5000;
    const [countdown, setCountdown] = useState(()=>{});

    // const icon = L.icon({
    //     iconUrl: "/images/marker-icon.png",
    //     iconRetinaUrl: "/images/marker-icon.png",
    //     shadowUrl: "/images/marker-shadow.png"
    // });

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
                        <Circle className="circle-magic-kingdom" center={[coord.latitude, coord.longitude]} radius={200} eventHandlers={{ click: () => setInfo(URI) }}>
                            <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Circle>
                        <Circle className="circle-magic-kingdom" center={[coord.latitude, coord.longitude]} radius={200} eventHandlers={{ click: () => setInfo(URI) }}>
                            <Popup>
                                <img src={URI?.image?.replace('ipfs://','https://cloudflare-ipfs.com/ipfs/')} style={{width: '50%'}} />
                                <b>{URI?.name}</b> <br /> {URI?.description}
                            </Popup>
                        </Circle>
                    </>
                )
            })}
        </>
    )
}

const MapCustomContainer = ({ MomentoNFTs }) => {
    
    const initialZoom = 13

    const starterPosition = MomentoNFTs.length > 0 ? [MomentoNFTs?.properties?.coords[0].latitude, MomentoNFTs?.properties?.coords[0].longitude] : [38.71307519909844, -9.149991653229893];

    return (
        <MapContainer className="map homeMap" center={starterPosition} zoom={initialZoom} scrollWheelZoom={false}>
            <Map MomentoNFTs={MomentoNFTs} initialZoom={initialZoom} />
        </MapContainer>
    )
}


export default MapCustomContainer;

