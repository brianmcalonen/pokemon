import React from "react";

const Abilities = ({ pokemon }) => {
  return (
    <div>
      <p>
        <b>Abilities</b>
      </p>
      <ul>
        {pokemon.abilities.map((ability, index) => {
          return <li key={index}>{toTitleCase(ability.ability.name)}</li>;
        })}
      </ul>
    </div>
  );
};

export default Abilities;

const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
