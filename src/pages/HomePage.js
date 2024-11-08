// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
//import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import Footer from '../components/Footer';
import axios from 'axios'; // para hacer la petición a tu API
import { Container, Row, Col, Card, Button, Form, Modal  } from 'react-bootstrap'; // Importamos componentes de Bootstrap


const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [message, setMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProducts = async (page = 1) => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products?page=${page}&limit=9`);
        const { products, totalPages, currentPage } = response.data;
        
        // Actualiza los productos y la información de la paginación
        setProducts(products);
        setTotalPages(totalPages);
        setCurrentPage(currentPage);
      } catch (error) {
        console.error('Error fetching paginated products:', error);
      }
    };
    fetchProducts(currentPage);
  }, [currentPage]);

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


    // Función para manejar el cambio en la cantidad
/*     const handleQuantityChange = (productId, quantity) => {
      setQuantities({
        ...quantities,
        [productId]: quantity, // Actualiza la cantidad para el producto específico
      });
    }; */

    // Función para agregar el producto con la cantidad seleccionada al carrito
    const handleAddToCart = async (productId) => {
      const selectedQuantity = quantities[productId] || 1; // Si no se selecciona cantidad, por defecto es 1
      console.log(`Agregando ${selectedQuantity} unidades del producto ${productId} al carrito`);
      
      try {
        const token = localStorage.getItem("token");  // Obtener el token del usuario
        // Verificar si el usuario no está logueado
        if (!token) {
          setMessage("Error: No se ha iniciado sesión."); // Asignar mensaje de error
          setShowModal(true); // Mostrar el modal
          return;
        }
        const data = {
          productId,
          quantity: selectedQuantity
        };
  
        // Enviar la solicitud POST al endpoint de agregar al carrito
        const response = await axios.post('http://localhost:5000/api/carts/add', data, {
          headers: {
            Authorization: `Bearer ${token}`,  // Token en los headers
          },
        });
  
        setMessage('Producto agregado al carrito exitosamente.');
        console.log('Respuesta del servidor:', response.data);
  
      } catch (error) {
        console.error('Error al agregar el producto al carrito:', error);
        setMessage('Error al agregar el producto al carrito.');
      }

    };

    // Función para cerrar el modal
    const handleCloseModal = () => {
      setShowModal(false); // Ocultar el modal
    };

    return (
      <Container>
        {/* Barra de búsqueda */}
        <SearchBar />
  
        {/* Filtros */}
        <Filters />
  
        {/* Lista de productos */}
        <Row>
          {products.length ? (
            products.map(product => (
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
                        onChange={(e) =>
                          setQuantities({ ...quantities, [product._id]: e.target.value })
                        }
                      />
                    </Form.Group>

                    <Button 
                      variant="primary" 
                      className="mt-2"
                      onClick={() => handleAddToCart(product._id)}
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
        </Row>
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

      {/* Modal para indicar que se necesita iniciar sesión */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar sesión requerido</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>


    </Container>
  );
};

export default HomePage;
