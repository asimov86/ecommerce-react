// src/context/CartContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

// Crea el contexto
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({}); // Para manejar cantidades
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Función para inicializar el carrito
  const initializeCart = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("Debes iniciar sesión para acceder al carrito.");
        setShowModal(true); // Muestra el modal si no hay token
        return;
      }

      const response = await axios.get('http://localhost:5000/api/carts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.products) {
        setCartItems(response.data.products);
      }
    } catch (error) {
      console.error("Error al inicializar el carrito:", error);
    }
  };

  useEffect(() => {
    initializeCart();
  }, []);

  // Manejar cambio en las cantidades
  const handleQuantityChange = (productId, quantity) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: quantity, // Actualiza la cantidad para el producto específico
    }));
  };

  // Función para agregar producto al carrito
  const addToCart = async (productId) => {
    const selectedQuantity = quantities[productId] || 1; // Si no se selecciona cantidad, por defecto es 1
    console.log(`Agregando ${selectedQuantity} unidades del producto ${productId} al carrito`);

    try {
      const token = localStorage.getItem("token");  // Obtener el token del usuario
      if (!token) {
        setMessage("Error: No se ha iniciado sesión."); // Asignar mensaje de error
        setShowModal(true); // Mostrar el modal
        return;
      }

      const data = { productId, quantity: selectedQuantity };

      // Enviar la solicitud POST al endpoint de agregar al carrito
      const response = await axios.post('http://localhost:5000/api/carts/add', data, {
        headers: {
          Authorization: `Bearer ${token}`,  // Token en los headers
        },
      });

      setMessage('Producto agregado al carrito exitosamente.');
      console.log('Respuesta del servidor:', response.data);
      setCartItems(prevItems => [...prevItems, { productId, quantity: selectedQuantity }]);
    } catch (error) {
      console.error('Error al agregar el producto al carrito:', error);
      setMessage('Error al agregar el producto al carrito.');
    }
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      handleQuantityChange,
      quantities,
    }}>
      {children}

      {/* Modal para login requerido */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
