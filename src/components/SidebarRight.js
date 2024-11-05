import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Button, Offcanvas, ListGroup, Image } from 'react-bootstrap';

const SideBarRight = () => {
  const { cartItems } = useCart();
  const [showCart, setShowCart] = useState(false);
  const handleClose = () => setShowCart(false);
  const handleShow = () => setShowCart(true);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Cart
      </Button>

      <Offcanvas show={showCart} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cartItems.length > 0 ? (
            <ListGroup>
              {cartItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Image src={item.imageUrl} thumbnail style={{ width: '50px', height: '50px'}} />
                  <div>{item.name}</div>
                  <div>{item.price}</div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p>Your cart is empty</p>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SideBarRight;
