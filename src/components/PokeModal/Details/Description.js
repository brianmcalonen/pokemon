import React from "react";

const Description = ({ loadingDescription, pokemonDescription }) => {
  return (
    <div>
      <p>
        <b>Description: </b>
      </p>
      {loadingDescription ? (
        <p>Loading description...</p>
      ) : (
        <p>{pokemonDescription}</p>
      )}
    </div>
  );
};

export default Description;
