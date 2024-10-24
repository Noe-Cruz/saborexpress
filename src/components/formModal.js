import React, { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";

const FormModal = (props) => {

    /**Dirección */
    const [calle, setCalle] = useState('');
    const [numero, setNumero] = useState('');
    const [codigo, setCodigo] = useState('');
    const [colonia, setColonia] = useState('');

    /**Método de pago */
    const [nombre, setNombre] = useState('');
    const [tarjeta, setTarjeta] = useState('');
    const [fecha, setFecha] = useState('');
    const [cvv, setCvv] = useState('');


    const procesarPago = () => {
        props.datosPago({
            calle   : calle,
            numero  : numero,
            codigo  : codigo,
            colonia : colonia,
            nombre  : nombre,
            tarjeta : tarjeta,
            fecha   : fecha,
            cvv     : cvv
        });

        props.onHide();
    };

    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Datos de envío</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h6 style={{ textAlign: "center", fontWeight: "bold" }}>Dirección - Envío</h6>
                <Form>
                    <Form.Group className="mb-3" controlId="formCalle">
                        <Form.Label>Calle:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingresa tu calle"
                            value={calle}
                            onChange={(ev) => setCalle(ev.target.value)}
                        />
                    </Form.Group>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formNumero">
                                <Form.Label>Número:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Número"
                                    value={numero}
                                    onChange={(ev) => setNumero(ev.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formCodigoPostal">
                                <Form.Label>Código Postal:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Código Postal"
                                    value={codigo}
                                    onChange={(ev) => setCodigo(ev.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3" controlId="formColonia">
                        <Form.Label>Colonia:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingresa tu colonia"
                            value={colonia}
                            onChange={(ev) => setColonia(ev.target.value)}
                        />
                    </Form.Group>
                </Form>

                <h6 style={{ textAlign: "center", fontWeight: "bold", marginTop: "20px" }}>
                    Método de Pago - Tarjeta
                </h6><br/>
                <Form>
                    <Form.Group className="mb-3" controlId="formNombreTitular">
                        <Form.Label>Nombre del Títular:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nombre del titular"
                            value={nombre}
                            onChange={(ev) => setNombre(ev.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formNumeroTarjeta">
                        <Form.Label>Número de Tarjeta:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Número de tarjeta"
                            value={tarjeta}
                            onChange={(ev) => setTarjeta(ev.target.value)}
                        />
                    </Form.Group>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formFechaExpiracion">
                                <Form.Label>Fecha de Expiración:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="MM/AA"
                                    value={fecha}
                                    onChange={(ev) => setFecha(ev.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formCVV">
                                <Form.Label>CVV:</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="CVV"
                                    value={cvv}
                                    onChange={(ev) => setCvv(ev.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Cancelar
                </Button>
                <Button variant="dark" onClick={procesarPago}>
                    Confirmar Orden
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default FormModal;
