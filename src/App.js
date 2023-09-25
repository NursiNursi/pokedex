import Axios from "axios";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [pokemonName, setPokemonName] = useState("");
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
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();

  useEffect(() => {
    let cancel;
    async function fetchPokemonData() {
      try {
        const response = await Axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
          {
            cancelToken: new Axios.CancelToken((c) => (cancel = c)),
          }
        );

        const data = response.data;
        setPokemonStats({
          name: pokemonName,
          species: data.species.name,
          img: data.sprites.front_default,
          hp: data.stats[0].base_stat,
          attack: data.stats[1].base_stat,
          defense: data.stats[2].base_stat,
          type: data.types[0].type.name,
        });
        setError("");
        setIsLoading(false);
        setPokemonChosen(true);
      } catch (error) {
        // setError(error.message);
        setError("Pokemon not found");
      }
    }

    fetchPokemonData();

    return () => cancel();
  }, [pokemonName]);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      let cancel;

      try {
        const response = await Axios.get(currentPageUrl, {
          cancelToken: new Axios.CancelToken((c) => (cancel = c)),
        });

        setIsLoading(false);
        setNextPageUrl(response.data.next);
        setPrevPageUrl(response.data.previous);
        setPokemon(response.data.results.map((p) => p.name));
      } catch (error) {
        // Handle error here
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }

      return () => cancel(); // Cleanup function
    }

    fetchData();
  }, [currentPageUrl]);

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl);
    setCurrentPage(currentPage + 1);
  }

  function goToPrevPage() {
    setCurrentPageUrl(prevPageUrl);
    setCurrentPage(currentPage - 1);
  }

  return (
    <div className="App">
      <div className="TitleSection">
        <h1>Pokemon Stats</h1>
        <input type="text" onChange={(e) => setPokemonName(e.target.value)} />
      </div>
      <div className="DisplaySection">
        {!pokemonChosen | (pokemonName.length === 0) ? (
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
      <div>
        {pokemon.map((p) => (
          <div key={p} onClick={() => setPokemonName(p)}>
            {p}
          </div>
        ))}
      </div>
      <div>
        {goToPrevPage && <button onClick={goToPrevPage}>Previous</button>}
        {goToNextPage && <button onClick={goToNextPage}>Next</button>}
      </div>
    </div>
  );
}

export default App;
