import { useState } from "react"
import Ratting from "../Ratting/Ratting"
import './CardPost.css'

const CardPost = ({MomentoNFT}) => {

    const [isVisible, setIsVisible] = useState(true);

    if(!isVisible) return (<></>)
    return (<div className="cardPost">
        <img className="imgCardPost" src={MomentoNFT.image?.replace('ipfs://','https://cloudflare-ipfs.com/ipfs/')} onError={()=>setIsVisible(false)}/>
        <h3>{MomentoNFT.name}</h3>
        <p>{MomentoNFT.description}</p>
        <p><b>{MomentoNFT?.properties?.tags == [] ? 'Tags:' : ''}</b></p>
        <p>{MomentoNFT?.properties?.tags?.map((tag, index) => <span key={index}>{tag} </span>)}</p>
        <Ratting rate={MomentoNFT?.properties?.rating}/>
    </div>)
}

export default CardPost