import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const AddProductPage = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    imageUrl: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");  // Obtener el token de autenticación

      const response = await axios.post('http://localhost:5000/api/products', productData, {
        headers: {
          Authorization: `Bearer ${token}`,  // Incluir token en los headers
        },
      });

      setMessage('Producto agregado exitosamente');
      setProductData({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        imageUrl: ''
      }); // Resetear el formulario

    } catch (error) {
      console.error('Error al agregar producto:', error);
      setError('Hubo un error al agregar el producto');
    }
  };

  return (
    <Container className="my-5">
      <h2>Agregar Nuevo Producto</h2>

      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Nombre del Producto</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="description" className="mt-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="price" className="mt-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="stock" className="mt-3">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            type="number"
            name="stock"
            value={productData.stock}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="category" className="mt-3">
          <Form.Label>Categoría</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={productData.category}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="imageUrl" className="mt-3">
          <Form.Label>URL de la Imagen</Form.Label>
          <Form.Control
            type="text"
            name="imageUrl"
            value={productData.imageUrl}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4">
          Agregar Producto
        </Button>
      </Form>
    </Container>
  );
};

export default AddProductPage;
