import React from "react";
import "./App.css";
import useSWR from "swr";

const randomPokemon = Math.floor(1 + Math.random() * 600);

function App() {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data: pokemon } = useSWR(
    "https://pokeapi.co/api/v2/pokemon/" + randomPokemon,
    fetcher
  );
  const { data: species } = useSWR(() => pokemon.species.url, fetcher);

  const getPokemonName = () =>
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const getFlavorText = () =>
    species.flavor_text_entries.find((entry) => entry.language.name === "en")
      .flavor_text;

  if (!species) {
    return null;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img
          src={pokemon && pokemon.sprites.front_default}
          className="App-logo"
          alt="logo"
        />
        <span className="pokemon-name">{getPokemonName()}</span>
        <span className="pokemon-desc">{unescape(getFlavorText())}</span>
      </header>
    </div>
  );
}

export default App;
