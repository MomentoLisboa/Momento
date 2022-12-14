import React, { useEffect, useMemo, useState } from 'react';
import Map from '../componants/Map';
import MenuOptions from '../componants/MenuOptions';
import getAllMomentoNFTs from '../hooks/getAllMomentoNFTs';

const MapView = ({ goToCreate, goToList }) => {
    const [MomentoNFTs, setMomentoNFTs] = useState([]);
    const [coordinates, setCoordinates] = useState([]);

    useEffect(()=>{
        let getMementoNFTs = async() => {
            const MomentoNFTs_ = await getAllMomentoNFTs()
            setMomentoNFTs(MomentoNFTs_)
        }
        getMementoNFTs()
    }, [])

    useMemo(() => {
        if(MomentoNFTs.length > 0) {
            const coords = MomentoNFTs.map((URI, index) => { 
                return {
                    latitude: URI?.properties.coords.latitude,
                    longitude: URI?.properties.coords.longitude,
                    name: URI?.name,
                    description: URI?.description,
                    key: index
                }
            });
            setCoordinates(coords);
            console.log(coords);
        }
    }, [MomentoNFTs])

    return (
        <div className="main-content">
            <h3 className="text-white main-title">MOMENTO</h3>
            <MenuOptions rightText="Create Review" goToRight={goToCreate} leftText="List View" goToLeft={goToList}/>
            <Map MomentoNFTs={MomentoNFTs} />
            <button style={{backgroundColor: '#FBE30A', width: '40px', borderRadius: '40px', fontSize: 30 ,padding: 0, margin: '20px auto'}} onClick={goToCreate}>+
            </button>
        </div>
    )
}

export default MapView
