import React from "react";
import { Modal, Button, Table } from "react-bootstrap";

const TicketModal = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Comprobante</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{width: "70%"}}>Producto</th>
              <th style={{width: "10%"}}>Cantidad</th>
              <th style={{width: "10%"}}>Precio</th>
              <th style={{width: "10%"}}>Total</th>
            </tr>
          </thead>
          <tbody>
            {(props.resumen).map((orden, index) => (
              <tr key={index}>
                <td>{orden.nombre}</td>
                <td>{orden.cantidad}</td>
                <td>${orden.precio}</td>
                <td>${(orden.precio * orden.cantidad)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <h5 className="text-end">Total Pagado: ${props.total}</h5>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={props.onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TicketModal;
