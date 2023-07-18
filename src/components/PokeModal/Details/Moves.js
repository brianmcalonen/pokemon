import React from "react";

const Moves = ({ pokemon }) => {
  return (
    <div>
      <p>
        <b>Moves</b>
      </p>
      <ul>
        {pokemon.moves
          .map((move, index) => {
            return <li key={index}>{toTitleCase(move.move.name)}</li>;
          })
          .slice(0, 5)}
      </ul>
    </div>
  );
};

export default Moves;

const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
