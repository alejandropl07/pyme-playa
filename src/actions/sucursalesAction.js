import {
    OBTENER_SUCURSALES,
    OBTENER_SUCURSALES_EXITO,
    OBTENER_SUCURSALES_ERROR,
  } from "../types";

  import clienteAxios from "../config/axios";

export  function obtenerSucursalesAction() {
    return(dispatch)    =>  {
        dispatch(obtenerSucursales());

        //Consultar la API
        clienteAxios.get('/sucursales')
        .then(respuesta =>  {
            dispatch(obtenerSucursalesExito(respuesta.data))
        })
        .catch(error    =>{
            dispatch(obtenerSucursalesError())
        })
        
    }
}

export  const obtenerSucursales =   ()  =>  ({
    type:   OBTENER_SUCURSALES,
});

export  const obtenerSucursalesExito =   (sucursales)  =>  ({
    type:   OBTENER_SUCURSALES_EXITO,
    payload:    sucursales,
});

export  const obtenerSucursalesError =   ()  =>  ({
    type:   OBTENER_SUCURSALES_ERROR,
});