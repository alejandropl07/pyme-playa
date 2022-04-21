import {
    OBTENER_PROVEEDORES,
    OBTENER_PROVEEDORES_EXITO,
    OBTENER_PROVEEDORES_ERROR,
  } from "../types";

  import clienteAxios from "../config/axios";

export  function obtenerProveedoresAction() {
    return(dispatch)    =>  {
        dispatch(obtenerProveedores());

        //Consultar la API
        clienteAxios.get('/proveedores')
        .then(respuesta =>  {
            dispatch(obtenerProveedoresExito(respuesta.data))
        })
        .catch(error    =>{
            dispatch(obtenerProveedoresError())
        })
        
    }
}

export  const obtenerProveedores =   ()  =>  ({
    type:   OBTENER_PROVEEDORES,
});

export  const obtenerProveedoresExito =   (proveedores)  =>  ({
    type:   OBTENER_PROVEEDORES_EXITO,
    payload:    proveedores,
});

export  const obtenerProveedoresError =   ()  =>  ({
    type:   OBTENER_PROVEEDORES_ERROR,
});