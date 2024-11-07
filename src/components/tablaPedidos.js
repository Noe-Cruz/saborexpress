import React from "react";
import { Table, Form } from "react-bootstrap";
import { db } from "../firebaseConfig/firebase";
import { doc, updateDoc } from "firebase/firestore";

const TablaPedidos = (props) => {
    
    const changeStatus = async (value, id) => {
        const refDoc = doc(db, "pedidos", id);

        try {
            await updateDoc(refDoc, {
                status: value
            });
        } 
        catch (error) {
            console.log(error);
        }
    }

    return (
        <Table responsive="sm" striped bordered>
            <thead>
                <tr>
                    <th style={{ width: "5%" }}>#</th>
                    <th style={{ width: "10%" }}>Fecha</th>
                    <th style={{ width: "50%" }}>Producto</th>
                    <th style={{ width: "15%" }}>Cantidad</th>
                    <th style={{ width: "12%" }}>Total</th>
                    <th style={{ width: "8%" }}>Status</th>
                </tr>
            </thead>
            <tbody>
                {props.data.map((orden) => (
                    orden.orden.map((producto, index) => (
                        <tr key={producto.descripcion + orden.id + index}>
                            {index === 0 && (
                                <>
                                    <td rowSpan={orden.orden.length}>{orden.id}</td>
                                    <td rowSpan={orden.orden.length}>
                                        {new Date(orden.fecha.seconds * 1000).toLocaleDateString()} 
                                        {' '}
                                        {new Date(orden.fecha.seconds * 1000).toLocaleTimeString()}
                                    </td>
                                </>
                            )}
                            <td>{producto.descripcion}</td>
                            <td>{producto.cantidad}</td>
                            {index === 0 && (
                                <>
                                    <td rowSpan={orden.orden.length}>${orden.total}</td>
                                    <td rowSpan={orden.orden.length}>
                                        <Form.Check 
                                            type="switch"
                                            checked={orden.status}
                                            onChange={(ev) => changeStatus(ev.target.checked, orden.id)}
                                            label={orden.status ? "Completa" : "Pendiente"}
                                        />
                                    </td>
                                </>
                            )}
                        </tr>
                    ))
                ))}
            </tbody>
        </Table>
    );
}

export default TablaPedidos;
