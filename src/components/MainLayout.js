// components/MainLayout.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
//import Header from './Header';
import SidebarLeft from './SidebarLeft';
import SidebarRight from './SidebarRight';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  return (
    <div>
      <Container fluid>
        <Row>
          <Col xs={12} md={2} className="d-none d-md-block bg-light">
            <SidebarLeft />
          </Col>
          <Col xs={12} md={8}>
            {children} {/* Aquí se mostrarán las páginas que pasemos */}
          </Col>
          <Col xs={12} md={2} className="d-none d-md-block bg-light">
            <SidebarRight />
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default MainLayout;
