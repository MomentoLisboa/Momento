import React, { useEffect, useState } from 'react';
import Map from '../componants/Map';
import getAllMomentoNFTs from '../hooks/useMomentoNFTs';

const MapView = () => {

    const [MomentoNFTs, setMomentoNFTs] = useState([])

    let coordinates = MomentoNFTs.map((URI, index) => { 
        return {
            latitude: URI?.properties.coords.latitude,
            longitude: URI?.properties.coords.longitude,
            desc: "The Mill", key: index
        }
    })

    useEffect(()=>{
        let getMementoNFTs = async() => {
            const MomentoNFTs_ = await getAllMomentoNFTs()
            setMomentoNFTs(MomentoNFTs_)
        }
        getMementoNFTs()
    })

    return (<>
        <h1 className="text-white">MAP VIEW</h1>
        <Map coordinates={coordinates} />
    </>)
}

export default MapView
