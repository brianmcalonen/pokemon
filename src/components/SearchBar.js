import React, { useState } from "react";
import "../App.css";

const SearchBar = ({ onSearchValueChange, onSearchButtonClick }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
    onSearchValueChange(e);
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    >
      <input
        value={searchValue}
        onChange={handleSearchInputChanges}
        type="text"
      />
      <input onClick={onSearchButtonClick} type="submit" value="SEARCH" />
    </div>
  );
};

export default SearchBar;
