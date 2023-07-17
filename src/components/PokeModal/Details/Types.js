import React from "react";

const Types = ({ pokemon }) => {
  return (
    <div>
      <p>
        <b>Types</b>
      </p>
      <ul>
        {pokemon.types.map((type, index) => {
          return <li key={index}>{toTitleCase(type.type.name)}</li>;
        })}
      </ul>
    </div>
  );
};

export default Types;

const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
