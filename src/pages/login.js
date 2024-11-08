import React, { useState } from "react";
import Styles from "../styles/styles";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig/firebase"; 
import { createUserWithEmailAndPassword, getAdditionalUserInfo, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import BarraNavegacion from "../components/barraNavegacion";
import Footer from "../components/footer";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { Spinner } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [procesando, setProcesando] = useState(false);

  const rolesUser = collection(db, "usuarios");

  /****Inicio de Sesión mediante Google */
  const provider = new GoogleAuthProvider();

  const sesionGoogle = async (event) => {
    event.preventDefault();
    setProcesando(true);
    await signInWithPopup(auth, provider)
      .then((result) => {
        // Signed in 
        if(result){
          const operationType = getAdditionalUserInfo(result).isNewUser;
          if(operationType){
            insertRolUser(result.user.email);
          }else{
            getRolUser(result.user.email);
          }
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        setErrorMessage("Usuario o Contraseña no válidos");
      });
  }

  /****Inicio de Sesión y Registro con Correo y Contraseña */
  const createUser = async (event) => {
    event.preventDefault();
    setProcesando(true);
    await createUserWithEmailAndPassword(auth, email, password )
    .then((userCredencial) => {
      // Signed up 
      if(userCredencial){
        insertRolUser(userCredencial.user.email);
      }
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage)
      setErrorMessage("Datos no válidos");
    });
  };

  const iniciarSesion = async (event) => {
    event.preventDefault();
    setProcesando(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredencial) => {
        // Signed in
        if(userCredencial){
          getRolUser(userCredencial.user.email);
        } 
      })
      .catch((error)  => {
        const errorMessage = error.message;
        console.log(errorMessage)
        setErrorMessage("Usuario o Contraseña no válidos");
      });
  };

  /**Consulta de roles de Usuario */
  const insertRolUser = async (user) => {
    try {
      const result = await addDoc(collection(db, "usuarios"), {
        usuario: user,
        rol: "cliente"
      });

      if(result.id){
        navigate('/orden');
      }
    }
    catch (error) {
      console.log(error);
    }
    finally {
      setProcesando(false);
    }
  }

  const getRolUser = async (user) => {
    const q = query(rolesUser, where("usuario", "==", user));
    try {
      const result = await getDocs(q);

      const rol = result.docs[0].data().rol;

      if(rol === "cliente"){
        navigate('/orden');
      }
      else if(rol === "administrador"){
        navigate('/pedidos');
      }
    } 
    catch (error) {
      console.log(error);
    }
    finally {
      setProcesando(false);
    }
  }

  return (
    <>
      <BarraNavegacion />
      <div style={Styles.container}><br /><br />
        <h2 style={Styles.title}>Iniciar Sesión</h2>
        <form style={Styles.form}>
          <div style={Styles.inputContainer}>
            <label htmlFor="email" style={Styles.label}>Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              placeholder="correo@ejemplo.com"
              onChange={(ev) => setEmail(ev.target.value)}
              style={Styles.input}
              required
            />
          </div>
          <div style={Styles.inputContainer}>
            <label htmlFor="password" style={Styles.label}>Contraseña:</label>
            <input
              type="password"
              id="password"
              placeholder="******"
              onChange={(ev) => setPassword(ev.target.value)}
              style={Styles.input}
              required
            />
          </div>
          {
          errorMessage && (
            <>
            <div style={{ color: 'red', marginTop: '10px' }}>
              {errorMessage}
            </div>
            <br/>
            </>
          )
          }
          <div style={Styles.buttonContainer}>
            <button type="button" style={Styles.button} onClick={iniciarSesion}>Iniciar Sesión</button>
          </div><br />
          <div style={Styles.buttonContainer}>
            <button type="button" style={Styles.button} onClick={createUser}>Registrarse</button>
          </div>
        </form>
        <div style={Styles.googleLogin}>
          <p>O inicia sesión con:</p>
          <button type="button" style={Styles.googleButton} onClick={sesionGoogle}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" alt="Google Icon" style={Styles.googleIcon} />
            Iniciar Sesión con Google
          </button>
        </div>
        {
        procesando && ( 
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999
            }}>
                <div style={{ textAlign: 'center', color: 'white' }}>
                    <Spinner animation="border" role="status" />
                    <p>Validando Usuario...</p>
                </div>
            </div>
        )
        }
      </div>
      <Footer/>
    </>
  );
};

export default Login;
