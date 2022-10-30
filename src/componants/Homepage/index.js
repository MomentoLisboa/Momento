import "./Homepage.css"

const Homepage = ({ goToNext }) => {

  return (
    <div className="main-content">
      <h3 className="text-primary main-title">Momento</h3>
      <img src="/images/logo.png"/>
      <p className="text-white">Save time, build relationships and spend your time doing interesting things.</p>
      <p className="text-white">Unlock the power of NFTs to explore a curated list of verified events.</p>
      <button type="button" className="primary-button" onClick={goToNext}>Launch App</button>
    </div>
  )
}


export default Homepage;