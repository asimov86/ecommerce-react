// src/components/Filters.js
import React from 'react';

const Filters = ({ onFilter }) => {
  const handleFilterChange = (filterType, value) => {
    if (onFilter) {
      onFilter(filterType, value);
    }
  };

  return (
    <div className="filters">
      <h4>Filtros</h4>
      <label>
        Categoría:
        <select onChange={(e) => handleFilterChange('category', e.target.value)}>
          <option value="all">Todas</option>
          <option value="electronics">Electrónica</option>
          <option value="clothing">Ropa</option>
          {/* Agrega más categorías según tus productos */}
        </select>
      </label>
    </div>
  );
};

export default Filters;
