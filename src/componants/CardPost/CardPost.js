import Ratting from "../Ratting/Ratting"
import './CardPost.css'

const cardPost = ({MomentoNFT}) => {
    const rate = 4
    console.log(MomentoNFT)
    return (<div className="cardPost">
        <img className="imgCardPost" src={MomentoNFT.image?.replace('ipfs://','https://cloudflare-ipfs.com/ipfs/')}/>
        <h3></h3>
        <p></p>
        <Ratting rate={rate}/>
    </div>)
}

export default cardPost