import React, { useState } from "react";

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

    const filteredNames = pokemonNames.filter((name) =>
      name.toLowerCase().startsWith(e.target.value.toLowerCase())
    );

    setAutoCompleteList(filteredNames);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="poke-container">
      <div className="search-container">
        <div className="search-bar">
          <input
            className="search-input"
            value={searchValue}
            onChange={handleSearchInputChanges}
            type="text"
            placeholder="Search Pokemon"
          />
          <input
            className="search-button"
            onClick={onSearchButtonClick}
            type="submit"
            value="SEARCH"
          />
        </div>

        {searchValue && autoCompleteList.length > 0 && (
          <div className="autocomplete-dropdown">
            {autoCompleteList.map((name) => (
              <div
                className="dropdown-item"
                key={name}
                onClick={() => {
                  const selectedName = name;
                  setSearchValue(selectedName);
                  setAutoCompleteList([]);
                  onSearchValueChange({ target: { value: selectedName } });
                }}
              >
                {capitalizeFirstLetter(name)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
