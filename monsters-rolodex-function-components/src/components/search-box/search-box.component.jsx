import "./search-box.styles.css";

const SearchBox = ({ className, placeHolder, onChangeHandler }) => (
  <input className={`search-box ${className}`} type="search" placeholder={placeHolder} onChange={onChangeHandler} />
);

export default SearchBox;
