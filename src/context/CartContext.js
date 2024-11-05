import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Crea el contexto
const CartContext = createContext();

// Proveedor de carrito
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Función para inicializar el carrito con datos del backend
  const initializeCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get('http://localhost:5000/api/carts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.products) {
        setCartItems(response.data.products); // Actualiza el estado con los productos
      }
    } catch (error) {
      console.error("Error al inicializar el carrito:", error);
    }
  };

  // Llama a la función para inicializar el carrito cuando el componente se monte
  useEffect(() => {
    initializeCart();
  }, []);

  // Función para agregar productos al carrito
  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  // Función para obtener los productos del carrito
  const getCartItems = () => cartItems;

  return (
    <CartContext.Provider value={{ cartItems, addToCart, getCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook para usar el contexto del carrito
export const useCart = () => useContext(CartContext);
