import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";

export default function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Chiamata API per recuperare l'elenco dei Pokémon
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => response.json())
      .then((data) => {
        const pokemonWithImages = data.results.map((pokemon, index) => ({
          ...pokemon,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
          id: index + 1,
        }));
        setPokemonList(pokemonWithImages);
        setFilteredPokemon(pokemonWithImages);
      });
  }, []);

  // Funzione per filtrare i Pokémon
  const handleFilter = (e) => {
    const filter = e.target.value.toLowerCase();
    const filtered = pokemonList.filter((pokemon) =>
      pokemon.name.includes(filter)
    );
    setFilteredPokemon(filtered);
  };

  // Aggiungi o rimuovi dai preferiti e aggiorna il localStorage
  const toggleFavorite = (pokemon) => {
    const isFavorite = favorites.some((fav) => fav.name === pokemon.name);
    if (isFavorite) {
      const updatedFavorites = favorites.filter(
        (fav) => fav.name !== pokemon.name
      );
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      const newFavorites = [...favorites, pokemon];
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    }
  };

  // Recupera i preferiti dal localStorage al caricamento
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Pokédex</h1>

        {/* Input per filtrare i Pokémon */}
        <input
          type="text"
          placeholder="Filtra Pokémon"
          onChange={handleFilter}
          className="filter-input"

        />

        <div className="pokemon-list">
          <h2>Elenco pokémon </h2>
          <div className="card-container">
            {filteredPokemon.map((pokemon) => (
              <div key={pokemon.name} className="pokemon-card">
                <img src={pokemon.image} alt={pokemon.name} />
                <h3>{pokemon.name}</h3>
                <button onClick={() => toggleFavorite(pokemon)}>
                  {favorites.some((fav) => fav.name === pokemon.name)
                    ? "Rimuovi dai preferiti"
                    : "Aggiungi ai preferiti"}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="favorites-list">
          <h2>Preferiti</h2>
          <div className="card-container">
            {favorites.length > 0 ? (
              favorites.map((pokemon) => (
                <div key={pokemon.name} className="pokemon-card">
                  <img src={pokemon.image} alt={pokemon.name} />
                  <h3>{pokemon.name}</h3>
                  <button onClick={() => toggleFavorite(pokemon)}>
                    Rimuovi dai preferiti
                  </button>
                </div>
              ))
            ) : (
              <p>Non ci sono preferiti.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
