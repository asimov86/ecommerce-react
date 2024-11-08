// src/components/Filters.js
import React from 'react';

const Filters = ({ onFilter }) => {
  const handleFilterChange = (filterType, value) => {
    if (onFilter) {
      onFilter(filterType, value);
    }
  };

  return (
    <div className="filters mb-3">
      <label className="form-label">
        Categoría:
        <select 
          className="form-select" 
          onChange={(e) => handleFilterChange('category', e.target.value)}
        >
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
