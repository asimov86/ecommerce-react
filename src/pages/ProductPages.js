// src/pages/ProductPage.js
import React from 'react';
import { useCart } from '../context/CartContext';

const ProductPage = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product); // Agregar el producto al carrito
  };

  const product = {
    name: 'Product Name',
    price: '$10',
    image: 'image-url.jpg',
  };

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.price}</p>
      <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductPage;
