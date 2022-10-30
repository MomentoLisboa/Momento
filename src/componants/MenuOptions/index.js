import "./MenuOptions.css";

const MenuOptions = ({ goToCreate, goToList }) => {
  return (
    <div className="options-menu">
      <button className="primary-button" onClick={goToList}>List View</button>
      <button className="primary-button" onClick={goToCreate}>Create Review</button>
    </div>
  )
};

export default MenuOptions;