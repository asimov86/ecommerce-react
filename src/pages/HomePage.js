// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
//import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import Footer from '../components/Footer';
import axios from 'axios'; // para hacer la petición a tu API
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'; // Importamos componentes de Bootstrap


const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Llamada a la API para obtener los productos
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products'); // Ajusta la URL según tu backend
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

    // Función para manejar el cambio en la cantidad
    const handleQuantityChange = (productId, quantity) => {
      setQuantities({
        ...quantities,
        [productId]: quantity, // Actualiza la cantidad para el producto específico
      });
    };

    // Función para agregar el producto con la cantidad seleccionada al carrito
    const handleAddToCart = async (productId) => {
      const selectedQuantity = quantities[productId] || 1; // Si no se selecciona cantidad, por defecto es 1
      console.log(`Agregando ${selectedQuantity} unidades del producto ${productId} al carrito`);
      
      try {
        const token = localStorage.getItem("token");  // Obtener el token del usuario
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

   

  return (
    <div>
      {/* Barra de búsqueda */}
      <SearchBar />
      
      {/* Filtros */}
      <Filters />

      {/* Lista de productos con Bootstrap */}
      <Container className="my-4">
        <Row>
          {products.length ? (
            products.map(product => (
              <Col key={product._id} sm={12} md={6} lg={4} className="mb-4">
                <Card>
                  <Card.Img 
                    variant="top" 
                    src={product.imageUrl} // Asumiendo que el campo de la imagen es imageUrl
                    alt={product.name} 
                  />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text><strong>Precio:</strong> ${product.price}</Card.Text>
                    
                    {/* Selector de cantidad */}
                    <Form.Group controlId={`quantity-${product._id}`}>
                      <Form.Label>Cantidad:</Form.Label>
                      <Form.Control 
                        type="number" 
                        min="1" 
                        value={quantities[product._id] || 1} // Cantidad por defecto 1
                        onChange={(e) => handleQuantityChange(product._id, parseInt(e.target.value))}
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
      </Container>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
