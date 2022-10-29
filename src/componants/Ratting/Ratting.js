

const Ratting = ({rate}) => {
    const stars = []

    for (let index = 0; index < rate; index++) {
        stars.push(<img key={index} src={process.env.PUBLIC_URL + "./Ratting.png"}/>);
    }

    return stars.map(elem => elem)
}

export default Ratting
