import React, { useEffect, useState } from "react";
import axios from "axios";

const SearchBar = ({
  onSearchValueChange,
  onSearchButtonClick,
  pokemonNames,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [autoCompleteList, setAutoCompleteList] = useState([]);

  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
    onSearchValueChange(e);

    // filter the list of pokemon names based on search value
    const filteredNames = pokemonNames.filter((name) =>
      name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setAutoCompleteList(filteredNames);
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

      {/* Show autocomplete dropdown if searchValue is not empty */}
      {searchValue && (
        <div className="autocomplete-dropdown">
          {autoCompleteList.map((name) => (
            <div
              key={name}
              onClick={() => {
                setSearchValue(name);
                setAutoCompleteList([]);
              }}
            >
              {name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
