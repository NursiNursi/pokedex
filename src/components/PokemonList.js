export default function PokemonList({
  pokemon,
  setPokemonName,
  setCurrentPageUrl,
  setCurrentPage,
  nextPageUrl,
  prevPageUrl,
  currentPage,
}) {
  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl);
    setCurrentPage(currentPage + 1);
  }

  function goToPrevPage() {
    setCurrentPageUrl(prevPageUrl);
    setCurrentPage(currentPage - 1);
  }

  return (
    <>
      <main className="menu">
        <h2>Pokemon List</h2>

        <p>
          Authentic Italian cuisine. 6 creative dishes to choose from. All from
          our stone oven, all organic, all delicious.
        </p>
        <ul className="pizzas">
          {pokemon.map((poke) => {
            return (
              <Pokemon
                poke={poke}
                key={poke}
                onClick={(pokeName) => setPokemonName(pokeName)}
              />
            );
          })}
        </ul>

        <p>We're still working on the menu. Please come back later 🤓</p>
      </main>
      <div>
        {goToPrevPage && <button onClick={goToPrevPage}>Previous</button>}
        {goToNextPage && <button onClick={goToNextPage}>Next</button>}
      </div>
    </>
  );
}

function Pokemon({ poke, onClick }) {
  return (
    <li>
      <div onClick={() => onClick(poke)}>
        <h3>{poke}</h3>
      </div>
    </li>
  );
}
