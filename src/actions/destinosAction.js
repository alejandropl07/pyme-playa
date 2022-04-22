import {
    OBTENER_DESTINOS,
    OBTENER_DESTINOS_EXITO,
    OBTENER_DESTINOS_ERROR,
  } from "../types";

  import clienteAxios from "../config/axios";

export  function obtenerDestinosAction() {
    return(dispatch)    =>  {
        dispatch(obtenerDestinos());

        //Consultar la API
        clienteAxios.get('/destinos')
        .then(respuesta =>  {
            dispatch(obtenerDestinosExito(respuesta.data))
        })
        .catch(error    =>{
            dispatch(obtenerDestinosError())
        })
        
    }
}

export  const obtenerDestinos =   ()  =>  ({
    type:   OBTENER_DESTINOS,
});

export  const obtenerDestinosExito =   (destinos)  =>  ({
    type:   OBTENER_DESTINOS_EXITO,
    payload:    destinos,
});

export  const obtenerDestinosError =   ()  =>  ({
    type:   OBTENER_DESTINOS_ERROR,
});