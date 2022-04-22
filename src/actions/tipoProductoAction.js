import {
    OBTENER_TIPO_PRODUCTO,
    OBTENER_TIPO_PRODUCTO_EXITO,
    OBTENER_TIPO_PRODUCTO_ERROR,
  } from "../types";

  import clienteAxios from "../config/axios";

export  function obtenerProductosAction() {
    return(dispatch)    =>  {
        dispatch(obtenerProductos());

        //Consultar la API
        clienteAxios.get('/tiposProducto')
        .then(respuesta =>  {
            dispatch(obtenerProductosExito(respuesta.data))
        })
        .catch(error    =>{
            dispatch(obtenerProductosError())
        })
        
    }
}

export  const obtenerProductos =   ()  =>  ({
    type:   OBTENER_TIPO_PRODUCTO,
});

export  const obtenerProductosExito =   (productos)  =>  ({
    type:   OBTENER_TIPO_PRODUCTO_EXITO,
    payload:    productos,
});

export  const obtenerProductosError =   ()  =>  ({
    type:   OBTENER_TIPO_PRODUCTO_ERROR,
});