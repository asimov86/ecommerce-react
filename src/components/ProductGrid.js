import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

const ProductGrid = () => {
  const products = [1, 2, 3, 4, 5, 6]; // Simulamos productos

  return (
    <Row>
      {products.map((product, index) => (
        <Col key={index} sm={12} md={6} lg={4}>
          <Card className="mb-4">
            <Card.Img variant="top" src={`https://via.placeholder.com/150?text=Product+${product}`} />
            <Card.Body>
              <Card.Title>Producto {product}</Card.Title>
              <Card.Text>Descripción breve del producto {product}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ProductGrid;
