export default function TitleSection({ setPokemonName }) {
  return (
    <header className="header footer">
      <h1>Pokemon Stats</h1>
      <input type="text" onChange={(e) => setPokemonName(e.target.value)} />
    </header>
  );
}
