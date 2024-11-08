import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';

const UploadJson = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState(''); // Para cambiar el color de la alerta

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/api/products/upload-json', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
      setVariant('success'); // Cambia el color de la alerta a verde en éxito
    } catch (error) {
      setMessage('Error al cargar los productos');
      setVariant('danger'); // Cambia el color de la alerta a rojo en error
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2 className="my-4 text-center">Subir archivo JSON de productos</h2>
          <Form onSubmit={handleUpload}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Selecciona un archivo JSON</Form.Label>
              <Form.Control type="file" accept=".json" onChange={handleFileChange} />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Subir
            </Button>
          </Form>
          {message && (
            <Alert variant={variant} className="mt-3">
              {message}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UploadJson;
