import CardPost from "../componants/CardPost/CardPost"
import useMomentoHub from "../hooks/useMomentoHub";
import { useWeb3 } from "../hooks/useWeb3";
import MenuOptions from '../componants/MenuOptions';
import getAllMomentoNFTs from '../hooks/getAllMomentoNFTs';
import { useEffect, useState } from 'react'

const PostListView = ({ goToCreate, goToMap }) => {
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
            <MenuOptions rightText="Create Review" goToRight={goToCreate} leftText="Map View" goToLeft={goToMap}/>
            <div className="card-container">
                {MomentoNFTs.map((MomentoNFT, index) => <CardPost key={MomentoNFT.image + index} MomentoNFT={MomentoNFT}/>)}
            </div>
        </div>
    )
}

export default PostListView
