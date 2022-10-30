import { useState } from "react"
import Ratting from "../Ratting/Ratting"
import './CardPost.css'

const CardPost = ({MomentoNFT}) => {

    const [rate, _] = useState(randomIntFromInterval(3, 5))

    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
      }

    

    const [isVisible, setIsVisible] = useState(true);

    if(!isVisible) return (<></>)
    return (<div className="cardPost">
        <img className="imgCardPost" src={MomentoNFT.image?.replace('ipfs://','https://cloudflare-ipfs.com/ipfs/')} onError={()=>setIsVisible(false)}/>
        <h3>{MomentoNFT.name}</h3>
        <p>{MomentoNFT.description}</p>
        <Ratting rate={rate}/>
    </div>)
}

export default CardPost