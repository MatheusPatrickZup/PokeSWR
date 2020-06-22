import React from "react";
import useSWR from "swr";

const PokemonData = (props) => {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data: pokemon } = useSWR(
    "https://pokeapi.co/api/v2/pokemon/" + props.pokemonNumber,
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
    <React.Fragment>
      <img
        src={pokemon && pokemon.sprites.front_default}
        className="pokemon-image"
        alt="logo"
      />
      <span className="pokemon-name">{getPokemonName()}</span>
      <span className="pokemon-desc">{unescape(getFlavorText())}</span>
    </React.Fragment>
  );
};

export default PokemonData;
