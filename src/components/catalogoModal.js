// catalogoModal.js
import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import CatalogoItem from "./catalogoItem";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../firebaseConfig/firebase';

const CatalogoModal = (props) => {
    const [productos, setProductos] = useState([]);

    const productosCollection = collection(db, "platillos");

    useEffect(() => {
        // Verifica si el modal está abierta
        if (props.show) {
            const unsubscribe = onSnapshot(productosCollection, (data) => {
                setProductos(
                    data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                );
            });
            return () => unsubscribe();
        }
    }, [productosCollection, props.show]);

    return (
        <Modal
            show={props.show} 
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Menú del día
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='px5'>
                <div className='row'>
                    {productos.map((producto) => (
                        <div key={producto.id} className='d-flex justify-content-center col-lg-4'>
                            <CatalogoItem
                                nombre={producto.nombre}
                                descripcion={producto.descripcion}
                                precio={producto.precio}
                                imagen={producto.imagen}
                                onHide={props.onHide}
                                onOrden={props.onOrden}
                            />
                        </div>
                    ))}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="dark" onClick={props.onHide}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CatalogoModal;
