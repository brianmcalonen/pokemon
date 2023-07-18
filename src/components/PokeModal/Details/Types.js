import React from "react";

const Types = ({ pokemon }) => {
  return (
    <div>
      <p>
        <b>Types:</b>
      </p>
      <div>
        {pokemon.types.map((type, index) => {
          return (
            <span
              key={index}
              style={{
                backgroundColor: getTypeColor(type.type.name),
                borderRadius: "25px",
                padding: "10px 15px",
                fontSize: "13px",
                marginRight: "15px",
                marginBottom: "10px",
                color: "#fff",
                textShadow: "1px 1px 1px #000", // Adding black outline around the text
                display: "inline-block", // To ensure marginBottom works
              }}
            >
              <b>{type.type.name.toUpperCase()}</b>
            </span>
          );
        })}
      </div>
      <p />
    </div>
  );
};

const getTypeColor = (type) => {
  const colors = {
    fire: "#EE8130",
    grass: "#7AC74C",
    electric: "#F7D02C",
    water: "#6390F0",
    ground: "#E2BF65",
    rock: "#B6A136",
    fairy: "#D685AD",
    poison: "#A33EA1",
    bug: "#A6B91A",
    dragon: "#6F35FC",
    psychic: "#F95587",
    flying: "#A98FF3",
    fighting: "#C22E28",
    normal: "#A8A77A",
    ice: "#96D9D6",
    ghost: "#735797",
    dark: "#705746",
    steel: "#B7B7CE",
  };

  return colors[type] || "#000"; // default color if the type is not found
};

export default Types;
