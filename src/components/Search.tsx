const Search = (props: any) => {
  return (
    <div className="input">
      <input
        value={props.searchValue}
        onChange={props.onChangeValue}
        placeholder="Поиск..."
        type="text"
      />
      {props.searchValue && (
        <img onClick={() => props.setSearchValue('')} className="clear" src="img/btn-remove.svg" alt="Close" />
      )}
      <img src="img/search-ico.svg" />
    </div>
  );
};

export default Search;
