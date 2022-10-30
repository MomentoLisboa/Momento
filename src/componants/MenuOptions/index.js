import "./MenuOptions.css";

const MenuOptions = ({ goToLeft, leftText, goToRight, rightText }) => {
  return (
    <div className="options-menu">
      <button className="primary-button" onClick={goToLeft}>{leftText}</button>
      <button className="primary-button" onClick={goToRight}>{rightText}</button>
    </div>
  )
};

export default MenuOptions;