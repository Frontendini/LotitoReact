import React, { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";
import Grid from "@mui/material/Grid";


export default function Home () {
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

<div className="container mx-auto">
<h1 className="text-4xl font-bold text-center mt-8">Pokédex</h1>

{/* Input per filtrare i Pokémon */}
<input
  type="text"
  placeholder="Filtra Pokémon"
  onChange={handleFilter}
  className="block mx-auto mt-4 mb-8 p-2 border border-gray-300 rounded shadow-sm"
/>

<div className="pokemon-list">
  <h2 className="text-2xl font-semibold mb-4">Elenco Pokémon</h2>                
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {filteredPokemon.map((pokemon) => (
      <PokemonCard
        key={pokemon.name}
        pokemon={pokemon}
        isFavorite={favorites.some(
          (fav) => fav.name === pokemon.name
        )}
        toggleFavorite={toggleFavorite}
      />
    ))}
  </div>                
</div>

<div className="favorites-list mt-12">
  <h2 className="text-2xl font-semibold mb-4">Preferiti</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {favorites.length > 0 ? (
      favorites.map((pokemon) => (
        <PokemonCard
          key={pokemon.name}
          pokemon={pokemon}
          isFavorite={true}
          toggleFavorite={toggleFavorite}
        />
      ))
    ) : (
      <p className="text-center text-gray-500">
        Non ci sono preferiti.
      </p>
    )}
  </div>
</div>
</div>

)}