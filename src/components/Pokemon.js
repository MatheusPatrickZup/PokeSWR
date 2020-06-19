import React, { useState } from "react";
import useSWR from "swr";

const Pokemon = () => {
  const [pokemonNumber, setPokemonNumber] = useState(
    Math.floor(1 + Math.random() * 600)
  );

  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data: pokemon } = useSWR(
    "https://pokeapi.co/api/v2/pokemon/" + pokemonNumber,
    fetcher
  );
  const { data: species } = useSWR(() => pokemon.species.url, fetcher);

  const getPokemonName = () =>
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const getFlavorText = () =>
    species.flavor_text_entries.find((entry) => entry.language.name === "en")
      .flavor_text;

  if (!species) {
    return <div className="App"></div>;
  }

  return (
    <React.Fragment>
      <img
        src={pokemon && pokemon.sprites.front_default}
        className="App-logo"
        alt="logo"
      />
      <span className="pokemon-name">{getPokemonName()}</span>
      <span className="pokemon-desc">{unescape(getFlavorText())}</span>
      <div className="button-container">
        <button onClick={() => setPokemonNumber(pokemonNumber - 1)}>
          {"<"}
        </button>
        <button onClick={() => setPokemonNumber(pokemonNumber + 1)}>
          {">"}
        </button>
      </div>
    </React.Fragment>
  );
};

export default Pokemon;
