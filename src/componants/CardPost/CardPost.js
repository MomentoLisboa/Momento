import Ratting from "../Ratting/Ratting"
import './CardPost.css'

const cardPost = ({rate}) => {
    return (<div className="cardPost">
        <img className="imgCardPost"/>
        <h3></h3>
        <p></p>
        <Ratting rate={rate}/>
    </div>)
}

export default cardPost