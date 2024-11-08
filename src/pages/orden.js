import React, { useEffect, useState } from "react";
import { Container, Table, Button, Spinner } from "react-bootstrap";
import CatalogoModal from "../components/catalogoModal.js";
import FormModal from "../components/formModal.js";
import TicketModal from "../components/ticketModal.js";
import BarraNavegacion from "../components/barraNavegacion.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { db } from "../firebaseConfig/firebase.js";
import { messaging } from "../firebaseConfig/firebase.js";
import { getToken, onMessage } from "firebase/messaging";
import { collection, addDoc } from "firebase/firestore";
import Footer from "../components/footer.js";

const Orden = () => {

    const [show, setShow] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [ordenes, setOrdenes] = useState([]);
    const [cantidades, setCantidades] = useState([]);
    const [procesando, setProcesando] = useState(false);
    const [modal, setModal] = useState(false);
    const [total, setTotal] = useState(0);
    const [ticket, setTicket] = useState([]);
    const [tokenu, setTokenu] = useState();

    //Validación de cantidad negativa y calculo de subtotal y total
    const validaChange = (event, index, precio) => {
        const cantidad = event.target.value;
        const nuevaCantidad = Number(cantidad);
        
        if (cantidad === '' || nuevaCantidad >= 1) {
            const changeCantidades = [...cantidades];
            changeCantidades[index] = nuevaCantidad; 
            setCantidades(changeCantidades);

            const total = (nuevaCantidad * precio).toFixed(2);
            ordenes[index].subtotal = total;
            ordenes[index].cantidad = nuevaCantidad;
        }
    };


    /*******CRUD ORDENES */

    //Agregar producto a la orden
    const agregaProducto = (producto) => {
        setModalShow(false);
        
        const index = ordenes.findIndex((orden) => orden.nombre === producto.nombre);

        if( index !== -1 ){
            const buscaProducto = ordenes.find((orden) => orden.nombre === producto.nombre);
            actualizaOrden( index, buscaProducto.precio, buscaProducto.cantidad );
        }
        else{
            setOrdenes([...ordenes, producto]); 
            setCantidades([...cantidades, producto.cantidad]);
        }
    };

    //Actualiza cantidad y subtotal
    const actualizaOrden = (index, precio, cantidad) => {
        const nuevaCantidad = cantidad + 1
        const changeCantidades = [...cantidades];
        changeCantidades[index] = nuevaCantidad; 
        setCantidades(changeCantidades);

        const total = (nuevaCantidad * precio).toFixed(2);
        ordenes[index].subtotal = total;
        ordenes[index].cantidad = nuevaCantidad;
    }

    const borrarProducto = (index) => {
        ordenes.splice(index, 1);
        cantidades.splice(index, 1);

        setOrdenes([...ordenes]);
    }

    /*******Confirmar Pago y registar pedido en BD */
    const confirmarPago = async (datapago) => {
        setProcesando(true);
        try {
            await addDoc(collection(db, "pedidos"), {
                orden: ordenes,
                pago: datapago,
                fecha: new Date(),
                status: false,
                total: ordenes.reduce((total, orden) => total + parseFloat(orden.subtotal), 0)
            });

            setTicket(ordenes);
            setOrdenes([]);
            setTotal(ordenes.reduce((total, orden) => total + parseFloat(orden.subtotal), 0));
        }
        catch (error){
            console.log(error);
        }
        finally {
            setProcesando(false);
            setModal(true);
            recibeNotificacion(tokenu);
        }
    }

    /******Permisos de Notificaciones Push */
    const getPermisos = async () => {
        try {
            const permisos = await Notification.requestPermission();
            if (permisos === "granted") {
                const registration = await navigator.serviceWorker.ready;
                const token = await getToken(messaging, {vapidKey: "BMUwYuIs2Jr5DN-NVjd5LacBLzey3NVVs4Iy4284dpMzkvNeed6mNLnsBOG3tdRbwNdmL02LozGFUEjsis_cmms"});
                if(token) {
                    console.log("token: ", token);
                    setTokenu(token);
                }
            }    
        } 
        catch (error) {
            console.log("Error en solicitud de permisos", error);
        }
    }

    /**Genera y recibe Notificación Push*/
    function recibeNotificacion(token) {
        fetch('https://saborexpressbackend.onrender.com/api/createNotificacion', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: token })
        }).then(response => {
            if (response.ok) {
                console.log("respuesta ", response);
                onMessage(messaging, (payload) => {
                    if (Notification.permission === 'granted') {
                        new Notification(payload.notification.title, {
                          body: payload.notification.body,
                          icon: '/logo.png',
                        });
                    }
                });
            }
        }).catch(error => console.error('Error de notificación:', error));
    }

    useEffect(() => {
        getPermisos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
    <>
    <TicketModal
        show={modal}
        onHide={() => setModal(false)}
        total={total}
        resumen={ticket}
    />
    <BarraNavegacion/><br/>
    <section className='masterhead2'>
        <Container className='px5'>
            <div>
                <div className='row'>
                    <div className='col-lg-6' style={{textAlign: 'left'}}>
                        <h1>Mi Orden</h1>
                    </div>
                    <div className='col-lg-6' style={{textAlign: 'right'}}>
                        <Button 
                            variant="dark" 
                            onClick={() => setModalShow(true)}
                            style={{textTransform: 'capitalize'}}
                        >
                            Agregar
                        </Button>
                        <CatalogoModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            onOrden={agregaProducto}
                        />
                    </div>
                </div>
                <br/>
                {
                    ordenes.length === 0 &&
                    <>
                    <br/>
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <i className="fas fa-shopping-cart" style={{ fontSize: 'xxx-large', marginBottom: '8px' }}></i> 
                            <p style={{ margin: 0, fontSize: '1.5rem' }}>Orden vacía</p>
                        </div>
                    </div> 
                    </>                   
                }
                {
                    ordenes.length > 0 &&
                    <>
                    <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th style={{ width: "5%" }}>#</th>
                        <th style={{ width: "50%" }}>Producto</th>
                        <th style={{ width: "15%" }}>Cantidad</th>
                        <th style={{ width: "10%" }} className="d-none d-md-table-cell">Precio</th>
                        <th style={{ width: "12%" }}>Total</th>
                        <th style={{ width: "8%" }}>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordenes.map((orden, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{orden.descripcion}</td>
                            <td>
                            <input
                                type="number"
                                value={cantidades[index]}
                                onChange={(e) => validaChange(e, index, orden.precio)}
                                className="form-control"
                            />
                            </td>
                            <td className="d-none d-md-table-cell">${orden.precio}</td>
                            <td>${parseFloat(ordenes[index].subtotal)}</td>
                            <td style={{ textAlign: "center" }}>
                            <button className="btn" variant="light" onClick={() => borrarProducto(index)}>
                                <FontAwesomeIcon icon="fas fa-trash" />
                            </button>
                            </td>
                        </tr>
                        ))}
                        <tr>
                        <td colSpan={window.innerWidth < 768 ? 3 : 4} style={{ textAlign: "right", fontWeight: "bold" }}>
                            Total a pagar:
                        </td>
                        <td colSpan={2} style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                            ${ordenes.reduce((total, orden) => total + parseFloat(orden.subtotal), 0)}
                        </td>
                        </tr>
                    </tbody>
                    </Table>
                    <br/>
                    <div className='row'>
                        <div className='col-lg-9' style={{textAlign: 'left'}}></div>
                        <div className='col-lg-3' style={{textAlign: 'right'}}>
                            <Button 
                                variant="dark" 
                                className="btn form-control" 
                                onClick={() => setShow(true)}
                                style={{textTransform: 'capitalize'}}
                            >
                                <FontAwesomeIcon icon="fas fa-utensils" />&nbsp;&nbsp;
                                Ordenar 
                            </Button>
                            <FormModal
                                show={show}
                                onHide={() => setShow(false)}
                                datosPago={confirmarPago}
                            />
                        </div>
                    </div>
                    </>
                }
            </div>
        </Container>
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
                    <p>Procesando pago...</p>
                </div>
            </div>
        )
        }
    </section>
    <Footer/>
    </>
    );
}

export default Orden;