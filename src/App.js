import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Pokedex } from "./components/Pokedex/Pokedex";
import { NavBar } from "./components/NavBar";

function App() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <>
      <NavBar onSearch={setSearchValue} />
      <br />
      <br />
      <Pokedex searchValue={searchValue} />
    </>
  );
}

export default App;
