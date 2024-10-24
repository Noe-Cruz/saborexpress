import React from 'react';
import { Container } from 'react-bootstrap';
//import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-black text-center text-white-50">
      <Container fluid>
        <div className="py-3">Copyright &copy; Sabor Express 2024</div>
      </Container>
    </footer>
  );
}

export default Footer;
