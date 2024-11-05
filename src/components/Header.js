// src/components/Header.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Importa el contexto de autenticación

const Header = () => {
  const { user, logout } = useContext(AuthContext); // Obtén el estado del usuario y la función de logout
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Llama a la función de logout desde el contexto
    navigate('/login'); // Redirige al usuario al login después de cerrar sesión
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">TuMarca</Link>
      </div>
      <nav className="navbar">
        <ul>
        <li><Link to="/">Home Page</Link></li>
          <li><Link to="/admin/add-product">Add product to system </Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          {user ? (
            <li>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </li>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
