import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useProductContext } from '../context/ProductContext';

const AddProductPage = () => {
  const { addProduct } = useProductContext(); // Usamos la función del contexto
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
    const result = await addProduct(productData); // Llamamos a la función del contexto

    if (result.success) {
      setMessage('Producto agregado exitosamente');
      setProductData({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        imageUrl: ''
      }); // Resetear el formulario
    } else {
      setError('Hubo un error al agregar el producto');
    }
  };

  return (
    <Container className="my-5">
      <h2>Agregar Nuevo Producto</h2>

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

      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

    </Container>
  );
};

export default AddProductPage;
