import React from "react";
import "../App.css";

const Loading = () => {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    >
      <div className="pokeball">
        <div className="pokeball__button"></div>
      </div>
    </div>
  );
};

export default Loading;
