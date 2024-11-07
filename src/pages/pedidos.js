import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import BarraNavegacion from "../components/barraNavegacion.js";
import Footer from "../components/footer.js";
import { db } from "../firebaseConfig/firebase.js";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import TablaPedidos from "../components/tablaPedidos.js";

const Pedidos = () => {
    
    const [ordenes, setOrdenes] = useState([]);
    const [lista, setLista] = useState([]);
    const [text, setText] = useState("Historial");

    const pedidosCollection = collection(db, "pedidos");
    const cerradas = query(pedidosCollection, orderBy("fecha", "desc"));
    const abiertas = query(pedidosCollection, where("status", "==", false), orderBy("fecha", "desc"));

    const historialProductos = () => {
        if (text === "Historial") {
            setText("Regresar");
            const unsubscribe = onSnapshot(cerradas, (data) => {
                setLista(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            });
            return () => unsubscribe();
        } else {
            setText("Historial");
            ordenesAbiertas();
        }
    };

    const ordenesAbiertas = () => {
        const unsubscribe = onSnapshot(abiertas, (data) => {
            setOrdenes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
        return () => unsubscribe();
    };

    useEffect(() => {
        const unsubscribe = ordenesAbiertas();
        return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <BarraNavegacion />
            <br />
            <section className="masterhead2">
                <Container className="px5">
                    <div>
                        <div className="row">
                            <div className="col-lg-6" style={{ textAlign: "left" }}>
                                <h2>Lista de Ordenes</h2>
                            </div>
                            <div className="col-lg-6" style={{ textAlign: "right" }}>
                                <Button
                                    variant="dark"
                                    onClick={historialProductos}
                                    style={{ textTransform: "capitalize" }}
                                >
                                    {text}
                                </Button>
                            </div>
                        </div>
                    </div>
                    <br />
                    {(ordenes.length === 0 && text === "Historial") && (
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <i className="fas fa-tasks" style={{ fontSize: "xxx-large", marginBottom: "8px" }}></i>
                                <p style={{ margin: 0, fontSize: "1.5rem" }}>Lista vacía</p>
                            </div>
                        </div>
                    )}
                    {(lista.length === 0 && text === "Regresar") && (
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <i className="fas fa-tasks" style={{ fontSize: "xxx-large", marginBottom: "8px" }}></i>
                                <p style={{ margin: 0, fontSize: "1.5rem" }}>Lista vacía</p>
                            </div>
                        </div>
                    )}
                    {(ordenes.length > 0 && text === "Historial") && 
                        <TablaPedidos 
                        data={ordenes} 
                    />}
                    {(lista.length > 0 && text === "Regresar") && 
                        <TablaPedidos 
                        data={lista}
                    />}
                </Container>
            </section>
            <Footer />
        </>
    );
};

export default Pedidos;
