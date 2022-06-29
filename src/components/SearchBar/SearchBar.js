import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchPost } from "../../redux/action";

function SearchBar() {
  const dispatch = useDispatch();
  const [state, setState] = useState("");
  console.log(state);

  const handleChange = (event) => {
    event.preventDefault();
    setState(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(searchPost(event.target.value));
    setState("");
  };

  return (
    <div className="searchBar">
      <input
        className="searchInput"
        type="text"
        placeholder="Necesidad..."
        value={state}
        onChange={handleChange}
      />
      <button className="searchButton" type="submit" onClick={handleSubmit}>
        <img
          className="searchImg"
          src="https://cdn.iconscout.com/icon/free/png-64/search-1768073-1502246.png"
          alt="Search Bar"
        />
      </button>
    </div>
  );
}

export default SearchBar;
