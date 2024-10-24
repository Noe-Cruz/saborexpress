import React, { useState, useRef } from "react";

const OrdenItem = () => {

    const precioRef = useRef();
    const [numero, setNumero] = useState(1);
    const [subtotal, setSubtotal] = useState(0);

    //Validación de cantidad negativa y calculo de subtotal y total
    const validaChange = (event) => {
        const value = event.target.value;
        
        if (value === '' || Number(value) >= 1) {
            setNumero(value);

            const cantidad = Number(value);
            // Obtener el contenido del <td>
            const precioString = precioRef.current.textContent; 
            const precio = parseFloat(precioString.replace('$', ''));

            const calculo = cantidad * precio;
            setSubtotal(calculo)
        }
    };

    return (
    <>
    <tr>
        <td>1</td>
        <td>Pizza Pepperoni</td>
        <td>
            <input
                type="number"
                value={numero}
                onChange={validaChange}
                className="form-control" />
        </td>
        <td ref={precioRef}>$220</td>
        <td>${subtotal}</td>
    </tr>
    <tr>
        <td colSpan={4} style={{ textAlign: "right" }}>Total a pagar:</td>
        <td>$220</td>
    </tr>
    </>
    );
}

export default OrdenItem;