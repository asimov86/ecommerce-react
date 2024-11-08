import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Importa el contexto de autenticación
import { Navbar, Nav, Container, Button } from 'react-bootstrap'; // Importa componentes de Bootstrap

const Header = () => {
  const { user, logout } = useContext(AuthContext); // Obtén el estado del usuario y la función de logout
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Llama a la función de logout desde el contexto
    navigate('/login'); // Redirige al usuario al login después de cerrar sesión
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/">
          TuMarca
        </Navbar.Brand>

        {/* Botón de despliegue en dispositivos móviles */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Links de navegación */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home Page</Nav.Link>
            <Nav.Link as={Link} to="/admin/add-product">Add Product</Nav.Link>
            <Nav.Link as={Link} to="/admin/add-products">Add Products</Nav.Link>
            <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
            <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
          </Nav>
          <Nav>
            {user ? (
              <Button variant="outline-light" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

