import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PokemonDetail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  // Chiamata API per ottenere i dettagli del Pokémon
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemon(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center">Caricamento...</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="pokemon-detail p-6 border border-gray-300 rounded-lg shadow-lg mt-8">
        <h1 className="text-4xl font-bold text-center capitalize">
          {pokemon.name}
        </h1>
        <div className="flex justify-center mt-6">
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            className="w-64 h-64"
          />
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Statistiche</h2>
          <ul>
            {pokemon.stats.map((stat) => (
              <li key={stat.stat.name} className="capitalize">
                {stat.stat.name}: {stat.base_stat}
              </li>
            ))}
          </ul>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Tipi</h2>
          <ul>
            {pokemon.types.map((typeInfo) => (
              <li key={typeInfo.type.name} className="capitalize">
                {typeInfo.type.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
