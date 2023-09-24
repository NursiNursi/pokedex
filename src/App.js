import Axios from "axios";
import "./App.css";
import { useState } from "react";

function App() {
  const [pokemon, setPokemon] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemonStats, setPokemonStats] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    setIsLoading(true);
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then((res) => {
        console.log(res);
        const data = res.data;
        setPokemonStats({
          name: pokemon,
          species: data.species.name,
          img: data.sprites.front_default,
          hp: data.stats[0].base_stat,
          attack: data.stats[1].base_stat,
          defense: data.stats[2].base_stat,
          type: data.types[0].type.name,
        });
        setError("");
        setIsLoading(false);
      })
      .catch(function (error) {
        // setError(error.message);
        setError("Pokemon not found");
      });
    setPokemonChosen(true);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  console.log(pokemonStats);

  return (
    <div className="App">
      <div className="TitleSection">
        <h1>Pokemon Stats</h1>
        <input
          type="text"
          onChange={(e) => setPokemon(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch}>Search Pokemon</button>
      </div>
      <div className="DisplaySection">
        {!pokemonChosen ? (
          <h1>Please Choose a Pokemon</h1>
        ) : !error ? (
          !isLoading ? (
            <>
              <h1>{pokemonStats.name}</h1>
              <img src={pokemonStats.img} alt={pokemonStats.name} />
              <h3>Species: {pokemonStats.species}</h3>
              <h3>Type: {pokemonStats.type}</h3>
              <h4>Hp: {pokemonStats.hp}</h4>
              <h4>Attack: {pokemonStats.attack}</h4>
              <h4>Defense: {pokemonStats.defense}</h4>
            </>
          ) : (
            <h1>Loading...</h1>
          )
        ) : (
          <h1>{error}</h1>
        )}
      </div>
    </div>
  );
}

export default App;
