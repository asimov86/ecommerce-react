import React, { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { useProductContext } from '../context/ProductContext';

const UploadJson = () => {
  const { uploadProductsFromJson } = useProductContext(); // Usamos la función del contexto
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState(''); // Para cambiar el color de la alerta

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/json') {
      setFile(selectedFile);
    } else {
      alert('Por favor selecciona un archivo JSON válido.');
      setFile(null);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      await uploadProductsFromJson(file); // Llama a la función del contexto
      setMessage('Productos subidos exitosamente'); // Mensaje de éxito
      setVariant('success'); // Cambia el color de la alerta
    } catch (error) {
      setMessage('Error al subir los productos'); // Mensaje de error
      setVariant('danger'); // Cambia el color de la alerta
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
