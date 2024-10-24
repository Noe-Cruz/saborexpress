import React from "react";
import { Card, Button } from "react-bootstrap";

const CatalogoItem = (props) => {
  
  const prodSeleccionado = () => {
    props.onOrden({
      nombre: props.nombre,
      descripcion: props.descripcion,
      precio: props.precio,
      subtotal: props.precio,
      cantidad: 1,
    });
  };

  return (
    <Card style={{ width: '18rem', marginBottom: '1rem' }}>
      <Card.Img variant='top' src={`${props.imagen}`}  style={{width: '100%', height: '270px', objectFit: 'cover'}}/>
      <Card.Body style={{ textAlign: "end", display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Card.Title style={{color: 'red', textAlign: "start", fontSize: "1.5rem"}}> 
          ${props.precio} 
        </Card.Title>
        <Card.Subtitle className="mb-2" style={{color: 'dark', textAlign: "start", fontSize: "1.2rem"}}> 
          {props.nombre} 
        </Card.Subtitle>
        <Card.Text style={{ textAlign: "start" }}>
          {props.descripcion}
        </Card.Text>
        <Button 
          variant='dark' 
          style={{ 
            marginTop: 'auto', 
            textTransform: "capitalize" 
          }} 
          onClick={prodSeleccionado}
          >
            Seleccionar
          </Button>
      </Card.Body>
    </Card>
  );
}

export default CatalogoItem;