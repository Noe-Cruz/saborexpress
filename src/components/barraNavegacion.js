import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig/firebase';
import { NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const [opciones, setOpciones] = useState('Contáctanos');
  const [perfil, setPerfil] = useState('https://www.svgrepo.com/show/350417/user-circle.svg');
  const [navColor, setNavColor] = useState('#fff');
  const [name, setName] = useState(false);
  const localizacion = useLocation(); 
  const navigate = useNavigate();

  /******Sesión con Correo y Contraseña/Google */
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getDataUser = async () => {
    await onAuthStateChanged(auth, (user) => {
      if(user) {
        const name = user.displayName;
        const photo = user.photoURL;

        if(name && photo){
          setOpciones(name);
          setPerfil(photo);
          setName(true);
        }
        else{
          const email = user.email;
          setOpciones(email);
          setName(false);
        }
      }
      else{
        navigate('/login');
      }
    });
  };

  const cerrarSesion = async () => {
    await signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error)  => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getLocalizacion = () => {
    const pathSegmento = localizacion.pathname.split('/');
    return pathSegmento[pathSegmento.length - 1];
  };

  // Actualizar el color de los enlaces basado en la URL
  useEffect(() => {
    const pageLocalizacion = getLocalizacion();
    if (pageLocalizacion === 'orden' || pageLocalizacion === 'login') {
      setNavColor('#000000fc');
      if( pageLocalizacion === 'orden' ){
        getDataUser();
      } 
    } else {
      setNavColor('#fff'); 
    }
  }, [getLocalizacion, getDataUser, localizacion]); 

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
      <div className="container px-4 px-lg-5">
        <img
          src="logo.png"
          width="70"
          height="75"
          className="d-inline-block align-top"
          alt="Sabor Express"
        />
        <a className="navbar-brand" href="http://localhost:3000/" style={{ color: navColor }}>
          Sabor Express
        </a>
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          Menu
          <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              {
                opciones === "Contáctanos" &&
                <p
                  className="nav-link"
                  style={{
                    color: navColor,
                    border: 'none',
                    boxShadow: 'none',
                    background: 'none',
                    padding: 0,
                    textTransform: 'uppercase',
                  }}
                >
                  Contáctanos
                </p>
              }
              {
                opciones !== "Contáctanos" &&
                <NavDropdown 
                title={
                        <>
                        <span
                        className="custom-dropdown-title"
                        style={{
                          color: navColor,
                          textTransform: name ? 'capitalize' : 'lowercase',
                        }}
                      >
                        {opciones}
                      </span>&nbsp;&nbsp;
                      <img 
                        src={`${perfil}`} 
                        alt="Perfil" 
                        className="dropdown-profile-image" 
                        style={{
                          width: '40px', 
                          height: '40px',
                          borderRadius: '50%'
                        }} 
                      />
                      </>
                      }
                id="basic-nav-dropdown"
                style={{
                  textAlign: "end"
                }}
                >
                  <NavDropdown.Item onClick={cerrarSesion} style={{textTransform: 'capitalize'}}>Cerrar Sesión</NavDropdown.Item>
                </NavDropdown>
              }
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
