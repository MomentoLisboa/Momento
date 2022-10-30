import React, { useEffect, useState } from 'react';
import Map from '../componants/Map';
import MenuOptions from '../componants/MenuOptions';
import getAllMomentoNFTs from '../hooks/getAllMomentoNFTs';

const MapView = ({ goToCreate, goToList }) => {

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

    return (
        <div className="main-content">
            <h3 className="text-primary main-title">Momento</h3>
            <MenuOptions rightText="Create Review" goToRight={goToCreate} leftText="List View" goToLeft={goToList}/>
            <Map coordinates={coordinates} />
        </div>
    )
}

export default MapView
