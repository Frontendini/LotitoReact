import React from "react";

export default function PokemonCard({ pokemon, isFavorite, toggleFavorite }) {
  return (
    <div className="pokemon-card p-4 border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <img
        src={pokemon.image}
        alt={pokemon.name}
        className="w-full h-32 object-contain mb-4"
      />
      <h3 className="text-xl font-bold text-center capitalize mb-2">
        {pokemon.name}
      </h3>
      <button
        className={`${
          isFavorite ? "bg-red-500" : "bg-blue-500"
        } text-white px-4 py-2 rounded-full w-full mt-2`}
        onClick={() => toggleFavorite(pokemon)}
      >
        {isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
      </button>
    </div>
  );
}
