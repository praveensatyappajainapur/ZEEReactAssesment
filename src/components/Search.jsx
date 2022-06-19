const Search = ({ searchValue, setSearchedValue }) => {
  return (
    <input
      type="text"
      className="form-control"
      placeholder="Search"
      onChange={(e) => setSearchedValue(e.target.value)}
      value={searchValue}
    />
  );
};
export default Search;
