import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Row, Col, Modal } from 'react-bootstrap';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setMessage("Error: No se ha iniciado sesión."); // Asignar mensaje de error
          setShowModal(true); // Mostrar el modal
          return;
        }

        const response = await axios.get('http://localhost:5000/api/carts', {
          headers: {
            Authorization: `Bearer ${token}`,  // Enviar token en los headers
          },
        });
      if (response.data.products.length === 0) {
        setMessage('Tu carrito está vacío.');
      } else {
        setCartItems(response.data.products);
      }
      } catch (error) {
        setMessage('Error al obtener el carrito8.');
      }
    };

    fetchCartItems();
  }, []);

  // Función para eliminar un producto del carrito
  const removeFromCart = async (productId) => {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este producto del carrito?');
    if (confirmed) {
      try {
        const token = localStorage.getItem("token");
        const data = { "productId": productId };
        await axios.request({
          url: 'http://localhost:5000/api/carts/remove',
          method: 'delete',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: data
        });
        // Filtrar el producto eliminado del carrito en el estado local
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.productId !== productId)
        );
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
                <Button variant="danger" onClick={() => removeFromCart(item.productId)}>Eliminar
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
