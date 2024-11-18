import { useCart } from '../context/CartContext';  // Importa el hook del contexto
import { Card, Button, Row, Col, Modal } from 'react-bootstrap';
import { useState } from 'react';

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();  // Obtén la función desde el contexto
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Función para eliminar un producto del carrito
  const handleRemoveFromCart = async (productId) => {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este producto del carrito?');
    if (confirmed) {
      try {
        await removeFromCart(productId);  // Llama a la función del contexto
        setMessage('Producto eliminado del carrito.');
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
        setMessage('Error al eliminar el producto del carrito.');
      }
    }
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false); // Ocultar el modal
  };

  return (
    <div className="container mt-5">
      <h2>Tu Carrito</h2>
      {message && <p>{message}</p>}
      
      <Row>
        {cartItems.map((item) => (
          <Col key={item.productId} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={item.imageUrl} alt={item.name} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                  Precio: ${item.price}
                  <br />
                  Cantidad: {item.quantity}
                </Card.Text>
                <Button variant="danger" onClick={() => handleRemoveFromCart(item.productId)}>Eliminar
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
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
    </div>
  );
};

export default Cart;
