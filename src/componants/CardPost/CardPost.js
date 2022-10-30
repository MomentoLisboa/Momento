import Rating from "../Rating/Rating"
import './CardPost.css'

const cardPost = ({MomentoNFT}) => {
    const rate = 4

    return (
        <div className="cardPost">
            <img className="imgCardPost" src={MomentoNFT.image?.replace('ipfs://','https://cloudflare-ipfs.com/ipfs/')}/>
            <h3>{MomentoNFT.name}</h3>
            <p>{MomentoNFT.description}</p>
            <Rating rate={rate}/>
        </div>
    )
}

export default cardPost