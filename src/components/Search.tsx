import { useDispatch, useSelector } from "react-redux";
import { setSearchValue } from "../redux/slices/sneakersSlice";

const Search = () => {
  const { searchValue } = useSelector((state: any) => state.sneakers);
  const dispatch = useDispatch();
  return (
    <div className="input">
      <input
        value={searchValue}
        onChange={(e) => dispatch(setSearchValue(e.target.value))}
        placeholder="Поиск..."
        type="text"
      />
      {searchValue && (
        <img
          onClick={() => dispatch(setSearchValue(""))}
          className="clear"
          src="img/btn-remove.svg"
          alt="Close"
        />
      )}
      <img src="img/search-ico.svg" />
    </div>
  );
};

export default Search;
