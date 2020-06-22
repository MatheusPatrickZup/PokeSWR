import React, { useState } from "react";
import PokemonData from "./PokemonData";

const Pokemon = () => {
  const [pokemonNumber, setPokemonNumber] = useState(
    Math.floor(1 + Math.random() * 600)
  );

  return (
    <div className="pokemon-container">
      <PokemonData pokemonNumber={pokemonNumber} />
      <div className="button-container">
        <button onClick={() => setPokemonNumber(pokemonNumber - 1)}>
          {"<"}
        </button>
        <button onClick={() => setPokemonNumber(pokemonNumber + 1)}>
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Pokemon;
