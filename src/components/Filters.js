// src/components/Filters.js
import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useProductContext } from '../context/ProductContext'; // Importar el contexto

const Filters = ({ onFilter }) => {
  const { categories } = useProductContext(); // Obtener las categorías desde el contexto

  const handleFilterChange = (filterType, value) => {
    if (onFilter) {
      onFilter(filterType, value);
    }
  };

  return (
    <Row className="mb-3">
      <Col md={6}>
        <Form.Group controlId="categoryFilter">
          <Form.Label>Categoría</Form.Label>
          <Form.Select onChange={(e) => handleFilterChange('category', e.target.value)}>
            <option value="all">Todas</option>
            {categories.length > 0 &&
              categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
          </Form.Select>
        </Form.Group>
      </Col>
    </Row>
  );
};

export default Filters;
