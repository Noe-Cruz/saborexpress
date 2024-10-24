import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Styles from '../styles/styles';
import BarraNavegacion from '../components/barraNavegacion';
import Footer from '../components/footer'

const Home = () => {
  return (
    <>
    <BarraNavegacion/>
    <section className='masterhead'>
      <br/>
      <Container className='px5'>
        <div className='row'>
          <div className='col-lg-6'>
            <div className='text-lg-start'>
              <h1 className='title-1'>¡Deliciosos platillos a tu puerta!</h1><br />
              <p className='title-2'>Con Sabor Express, la calidad y rapidez están a tu servicio. Ofrecemos una amplia selección de platillos preparados al momento, listos para satisfacer tu apetito. Haz tu pedido en minutos y recíbelo en la puerta de tu casa.</p>
              <br />
              <Link to="/login" className='btn btn-light' style={Styles.buttonInicial}>¡Ordenar Ahora!</Link>
            </div>
          </div>
          <div className='col-lg-6'></div>
        </div>
      </Container>
    </section>
    <Footer />
    </>
  );
}

export default Home;