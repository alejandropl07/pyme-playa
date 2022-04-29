import React from "react";
import { useDispatch } from "react-redux";

import { eliminarProductoEditarAction } from "../actions/solicitudesAction";

const ProductoEditarSolicitud  =   ({producto})  =>{
    const dispatch  = useDispatch();
    const eliminarProducto = (id)    => dispatch(eliminarProductoEditarAction(id)) ;

    const confirmarEliminarproducto = (id)  =>  {
        eliminarProducto(id);
    }

    return(
        <tr>
            <td>{producto.id_proveedor}</td>
            <td>{producto.id_producto}</td>
            <td>{producto.cantidad}</td>
            <td>
                <button className="btn btn-danger"
                onClick={() => confirmarEliminarproducto(producto.id_producto)}>
                    Eliminar
                    </button>
                </td>
        </tr>
    );
}

export default ProductoEditarSolicitud;