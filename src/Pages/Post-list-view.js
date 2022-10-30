import CardPost from "../componants/CardPost/CardPost"
import getAllMomentoNFTs from '../hooks/getAllMomentoNFTs';
import MenuOptions from '../componants/MenuOptions';
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
            <h3 className="text-white main-title">MOMENTO</h3>
            <MenuOptions rightText="Create Review" goToRight={goToCreate} leftText="List Map" goToLeft={goToMap}/>
            {MomentoNFTs.map((MomentoNFT, index) => <CardPost key={MomentoNFT.image + index} MomentoNFT={MomentoNFT}/>)}
            <button style={{backgroundColor: '#FBE30A', width: '40px', borderRadius: '40px', fontSize: 30 ,padding: 0, margin: '20px auto'}} onClick={goToCreate}>+
            </button>
        </div>
    )
}

export default PostListView
