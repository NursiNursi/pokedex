export default function DisplaySection({
  pokemonChosen,
  pokemonName,
  pokemonStats,
  error,
  isLoading,
}) {
  return (
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
  );
}
