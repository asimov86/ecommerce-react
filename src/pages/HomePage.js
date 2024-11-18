// src/pages/HomePage.js
import React, { /* useEffect, */ useState } from 'react';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import Footer from '../components/Footer';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useProductContext } from '../context/ProductContext';
import { useCart } from '../context/CartContext';

const HomePage = () => {
  //const { filteredProducts } = useProductContext(); // Usamos el contexto de productos
  const { products: filteredProducts, loading, error } = useProductContext();
  const { addToCart, handleQuantityChange, quantities } = useCart(); // Usamos el contexto de carrito
  const [currentPage, setCurrentPage] = useState(1);
  //const [totalPages, setTotalPages] = useState(1);
  const totalPages = useState(1);

  // Cambiar de página
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return (
    <Container>
      {/* Barra de búsqueda */}
      <SearchBar />

      {/* Filtros */}
      <Filters />
      
      {/* Lista de productos */}

      {/* Si está cargando, muestra un spinner o mensaje */}
      {loading && <p>Cargando productos...</p>}

      {/* Si hay un error, muestra el mensaje de error */}
      {error && <p>{error}</p>}

      {/* Si no está cargando ni hay error, muestra los productos */}
      {!loading && !error && (

      <Row>
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <Col key={product._id} sm={12} md={6} lg={4} className="mb-3">
              <Card>
                <Card.Img variant="top" src={product.imageUrl} alt={product.name} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Text><strong>Precio:</strong> ${product.price}</Card.Text>
                  <Form.Group controlId={`quantity-${product._id}`}>
                    <Form.Label>Cantidad</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      value={quantities[product._id] || 1}
                      onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                    />
                  </Form.Group>

                  <Button 
                    variant="primary" 
                    className="mt-2"
                    onClick={() => addToCart(product._id)}
                  >
                    Agregar al carrito
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No products available</p>
        )}
      </Row>)}
      
      {/* Paginación */}
      <div className="d-flex justify-content-between my-3">
        <Button
          variant="secondary"
          disabled={currentPage === 1}
          onClick={handlePrevPage}
        >
          Página anterior
        </Button>
        <span>Página {currentPage} de {totalPages}</span>
        <Button
          variant="secondary"
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
        >
          Página siguiente
        </Button>
      </div>

      {/* Footer */}
      <Footer />
    </Container>
  );
};

export default HomePage;
