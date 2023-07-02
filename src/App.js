import "./App.css";
import { Pokedex } from "./components/Pokedex";

function App() {
  return (
    <>
      <Pokedex />
      {/* <div className="pokedexBody">
        <div className="blueCircle"></div>
        <div className="greyCircle"></div>
        <div className="yellowCircle"></div>
        <div className="greenCircle"></div>

        <div className="screenBackground">
          <div className="screenFace loading">
            <img
              className="pokemonSprite"
              width="200px"
              height="200px"
              alt="pokemon"
            />
          </div>
        </div>

        <div className="redCenter"></div>

        <div className="pokedexBtnContainer">
          <button type="button" className="randomButton">
            Random
          </button>
          <button type="button" className="leftButton">
            &lt;=
          </button>
          <button type="button" className="rightButton">
            =&gt;
          </button>
        </div>

        <div className="searchBackground"></div>
        <div className="searchInput"></div>
        <div className="searchButton"></div>

        <form id="nameForm">
          <input
            type="text"
            className="pokemonName"
            placeholder="Pokemon Name"
          />
        </form>
        <form id="idForm">
          <input type="text" className="pokemonId" placeholder="Pokemon ID" />
        </form>

        <div className="pokemonGrid">
          <div className="pokemonDescription"></div>
          <div className="pokemonHeight"></div>
          <div className="pokemonWeight"></div>
          <div className="pokemonTypes"></div>
          <div className="pokemonStats"></div>
        </div>
      </div> */}
    </>
  );
}

export default App;
