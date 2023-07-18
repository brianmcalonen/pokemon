import React from "react";

const Description = ({ loading, pokemon }) => {
  return (
    <div>
      <p>
        <b>Description: </b>
      </p>
      {loading ? <p>Loading description...</p> : <p>{pokemon}</p>}
    </div>
  );
};

export default Description;
