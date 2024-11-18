// src/components/SearchBar.js
import React, { useState } from 'react';
import { useProductContext } from '../context/ProductContext'; // Asegúrate de que la ruta sea correcta

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const { searchProducts } = useProductContext(); // Usamos el contexto

  const handleSearch = () => {
    searchProducts(query); // Llamamos a la función de búsqueda del contexto
  };

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar productos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="btn btn-dark" onClick={handleSearch}>
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;
