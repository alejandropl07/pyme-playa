import React from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { eliminarProductoAction } from "../actions/productosAction";

const Producto  =   ({producto})  =>{
    const dispatch  = useDispatch();
    const eliminarProducto = (id)    => dispatch(eliminarProductoAction(id)) ;

    const confirmarEliminarproducto = (id)  =>  {
        eliminarProducto(id);
    }

    return(
        <tr>
            <td>{producto.Pfx}</td>
            <td>{producto.Código}</td>
            <td>{producto.Cantidad}</td>
            <td>
                <button className="btn btn-danger"
                onClick={() => confirmarEliminarproducto(producto.Código)}>
                    Eliminar
                    </button>
                </td>
        </tr>
    );
}

export default Producto;