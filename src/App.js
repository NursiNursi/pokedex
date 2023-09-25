import Axios from "axios";
import "./App.css";
import { useState, useEffect } from "react";
import TitleSection from "./components/TitleSection";
import DisplaySection from "./components/DisplaySection";
import PokemonList from "./components/PokemonList";

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

  const [pokemonList, setPokemonList] = useState({
    name: "",
    img: "",
  });

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

  return (
    <div className="container">
      <TitleSection setPokemonName={setPokemonName} />
      <DisplaySection
        pokemonChosen={pokemonChosen}
        pokemonName={pokemonName}
        pokemonStats={pokemonStats}
        error={error}
        isLoading={isLoading}
      />
      <PokemonList
        pokemon={pokemon}
        pokemonStats={pokemonStats}
        setPokemonName={setPokemonName}
        setCurrentPageUrl={setCurrentPageUrl}
        setCurrentPage={setCurrentPage}
        nextPageUrl={nextPageUrl}
        prevPageUrl={prevPageUrl}
        currentPage={currentPage}
      />
    </div>
  );
}

export default App;
