import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import StatChart from "./StatChart";
import PokeID from "./Details/PokeID";
import Height from "./Details/Height";
import Weight from "./Details/Weight";
import Description from "./Details/Description";
import Types from "./Details/Types";
import Abilities from "./Details/Abilities";
import Moves from "./Details/Moves";

const PokeModal = ({ show, onHide, pokemon, onPrev, onNext }) => {
  // console.log("pokemon", pokemon);

  const [loadingDescription, setLoadingDescription] = useState(false);
  const [pokemonDescription, setPokemonDescription] = useState("");

  const fetchPokemonDescription = async (pokemonName) => {
    try {
      setLoadingDescription(true);
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`
      );
      const flavorTexts = response.data.flavor_text_entries;
      const englishFlavorText = flavorTexts.find(
        (entry) => entry.language.name === "en"
      );
      const description = englishFlavorText
        ? englishFlavorText.flavor_text
        : "None";
      setPokemonDescription(description);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDescription(false);
    }
  };

  useEffect(() => {
    if (pokemon) {
      fetchPokemonDescription(pokemon.name);
    }
  }, [pokemon]);

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Pokemon Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            onClick={() => onPrev(pokemon.id || 0)}
            style={{
              backgroundColor: "rgba(10, 76, 139, 0.8)",
              border: "none",
            }}
          >
            Prev
          </Button>

          <Button
            onClick={() => onNext(pokemon.id || 0)}
            style={{
              backgroundColor: "rgba(10, 76, 139, 0.8)",
              border: "none",
            }}
          >
            Next
          </Button>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div>
              {pokemon && (
                <>
                  <img
                    src={
                      pokemon.sprites.other["official-artwork"].front_default
                    }
                    alt={pokemon.name}
                    style={{
                      width: "250px",
                      height: "auto",
                      marginTop: "-30px",
                    }}
                  />
                  <h2 style={{ textAlign: "center" }}>
                    {toTitleCase(pokemon.name)}
                  </h2>
                </>
              )}
            </div>
          </div>

          <div
            className="two-column"
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            <div
              className="left-column"
              style={{
                width: "40%",
              }}
            >
              {pokemon && (
                <div>
                  <Types pokemon={pokemon} />
                  <PokeID pokemon={pokemon} />
                  <Height pokemon={pokemon} />
                  <Weight pokemon={pokemon} />
                  <Description
                    loading={loadingDescription}
                    pokemon={pokemonDescription}
                  />
                  <Abilities pokemon={pokemon} />
                  <Moves pokemon={pokemon} />
                </div>
              )}
            </div>
            <div className="right-column">
              {pokemon && <StatChart pokemon={pokemon} />}
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PokeModal;

const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
