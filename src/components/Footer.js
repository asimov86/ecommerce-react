import React from 'react';
import '../styles/Footer.css'; // Actualiza la ruta para la nueva ubicación

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p className="text">© {new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.</p>
        <ul className="links">
          <li><a href="/terms" className="link">Términos de Servicio</a></li>
          <li><a href="/privacy" className="link">Política de Privacidad</a></li>
          <li><a href="/contact" className="link">Contáctanos</a></li>
        </ul>
      </div>
    </footer>
  );
};


export default Footer;
