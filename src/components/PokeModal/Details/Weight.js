import React from "react";

const Weight = ({ pokemon }) => {
  return (
    <p>
      <b>Weight</b>: {pokemon.weight} lbs
    </p>
  );
};

export default Weight;
