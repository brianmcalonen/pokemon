import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

export const Pokedex = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
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
    fetchData();
  }, []);

  const tableStyle = {
    borderCollapse: "collapse",
    width: "80%",
    margin: "0 auto",
    border: "1px solid #333",
  };

  const cellStyle = {
    border: "1px solid #333",
    padding: "10px",
    textAlign: "center",
    verticalAlign: "middle",
  };

  const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <table style={tableStyle}>
          <tbody>
            {Array.from({ length: Math.ceil(pokemonData.length / 10) }).map(
              (_, rowIndex) => (
                <tr key={rowIndex}>
                  {pokemonData
                    .slice(rowIndex * 10, (rowIndex + 1) * 10)
                    .map((pokemon) => (
                      <td key={pokemon.name} style={cellStyle}>
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
      )}
    </div>
  );
};
