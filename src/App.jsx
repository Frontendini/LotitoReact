import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home"; 
import PokemonDetail from "./components/PokemonDetail"; 
import Navbar from "./components/Navbar"; 
import "./App.css";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />         
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
        </Routes>
      </div>
    </Router>
  );
}
