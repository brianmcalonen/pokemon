import React, { useEffect, useState } from "react";
import axios from "axios";
import PokeModal from "../PokeModal/PokeModal";
import Loading from "../Loading";
import SearchBar from "../SearchBar";

export const Pokedex = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [pokemonId, setPokemonId] = useState(1);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=100"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const fetchData = async (url) => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      setNextPageUrl(response.data.next);
      setPrevPageUrl(response.data.previous);
      const promises = response.data.results.map((pokemon) =>
        axios.get(pokemon.url)
      );
      const pokemonDetails = await Promise.all(promises);
      setPokemonData(pokemonDetails.map((pokemon) => pokemon.data));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePrev = () => {
    setCurrentPageUrl(prevPageUrl);
  };

  const handleNext = () => {
    setCurrentPageUrl(nextPageUrl);
  };

  const fetchFlavorText = async (pokemonName) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`
      );
      const flavorTexts = response.data.flavor_text_entries;
      const englishFlavorText = flavorTexts.find(
        (entry) => entry.language.name === "en"
      );
      return englishFlavorText ? englishFlavorText.flavor_text : "None";
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCellClick = async (pokemon) => {
    setSelectedPokemon(pokemon);
    setPokemonId(pokemon.id);
    const flavorText = await fetchFlavorText(pokemon.name);
    // assuming selectedPokemon is an object
    setSelectedPokemon((prev) => ({ ...prev, flavor_text: flavorText }));
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handlePokemonPrev = () => {
    setPokemonId((prev) => prev - 1);
  };

  const handlePokemonNext = () => {
    setPokemonId((prev) => prev + 1);
  };

  useEffect(() => {
    fetchData(currentPageUrl);
  }, [currentPageUrl]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
        );
        setSelectedPokemon(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemon();
  }, [pokemonId]);

  const filteredPokemon = pokemonData.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      {loading ? (
        // <p>Loading...</p>
        <Loading />
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <div style={{ textAlign: "center" }}>
            <img src="/Pokemon_Logo.jpg" alt="Pokemon logo" />
          </div>

          <SearchBar />

          <table style={tableStyle}>
            <tbody>
              {Array.from({ length: Math.ceil(pokemonData.length / 10) }).map(
                (_, rowIndex) => (
                  <tr key={rowIndex}>
                    {filteredPokemon
                      .slice(rowIndex * 10, (rowIndex + 1) * 10)
                      .map((pokemon) => (
                        <td
                          key={pokemon.name}
                          style={cellStyle}
                          onClick={() => handleCellClick(pokemon)}
                          className="hoverable-cell"
                        >
                          <img
                            src={pokemon.sprites.front_default}
                            alt={pokemon.name}
                          />
                          <div>{toTitleCase(pokemon.name)}</div>
                        </td>
                      ))}
                  </tr>
                )
              )}
            </tbody>
          </table>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <button onClick={handlePrev} disabled={!prevPageUrl}>
              Previous Page
            </button>
            <button onClick={handleNext} disabled={!nextPageUrl}>
              Next Page
            </button>
          </div>
        </div>
      )}
      <PokeModal
        onPrev={handlePokemonPrev}
        onNext={handlePokemonNext}
        show={showModal}
        onHide={closeModal}
        pokemon={selectedPokemon}
      />
    </>
  );
};

const tableStyle = {
  borderCollapse: "collapse",
  width: "80%",
  margin: "50px auto",
  border: "1px solid #333",
};

const cellStyle = {
  border: "1px solid #333",
  padding: "10px",
  textAlign: "center",
  verticalAlign: "middle",
  cursor: "pointer",
};

const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
