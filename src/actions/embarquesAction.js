import {
    OBTENER_EMBARQUES,
    OBTENER_EMBARQUES_EXITO,
    OBTENER_EMBARQUES_ERROR,
  } from "../types";

  import clienteAxios from "../config/axios";

export  function obtenerEmbarquesAction() {
    return(dispatch)    =>  {
        dispatch(obtenerEmbarques());

        //Consultar la API
        clienteAxios.get('/embarques')
        .then(respuesta =>  {
            dispatch(obtenerEmbarquesExito(respuesta.data))
        })
        .catch(error    =>{
            dispatch(obtenerEmbarquesError())
        })
        
    }
}

export  const obtenerEmbarques =   ()  =>  ({
    type:   OBTENER_EMBARQUES,
});

export  const obtenerEmbarquesExito =   (embarques)  =>  ({
    type:   OBTENER_EMBARQUES_EXITO,
    payload:    embarques,
});

export  const obtenerEmbarquesError =   ()  =>  ({
    type:   OBTENER_EMBARQUES_ERROR,
});