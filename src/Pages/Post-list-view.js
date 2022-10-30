import CardPost from "../componants/CardPost/CardPost"
import useMomentoHub from "../hooks/useMomentoHub";
import { useWeb3 } from "../hooks/useWeb3";
import getAllMomentoNFTs from '../hooks/getAllMomentoNFTs';
import { useEffect, useState } from 'react'

const PostListView = () => {
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
        {/* <CardPost MomentoNFT={MomentoNFTs.length > 0 ? MomentoNFTs[0] : []}/> */}
        {MomentoNFTs.map(MomentoNFT => <CardPost key={MomentoNFT.image} MomentoNFT={MomentoNFT}/>)}
    </>)
}

export default PostListView
