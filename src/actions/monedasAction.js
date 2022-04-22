import {
    OBTENER_MONEDAS,
    OBTENER_MONEDAS_EXITO,
    OBTENER_MONEDAS_ERROR,
  } from "../types";

  import clienteAxios from "../config/axios";

export  function obtenerMonedasAction() {
    return(dispatch)    =>  {
        dispatch(obtenerMonedas());

        //Consultar la API
        clienteAxios.get('/monedas')
        .then(respuesta =>  {
            dispatch(obtenerMonedasExito(respuesta.data))
        })
        .catch(error    =>{
            dispatch(obtenerMonedasError())
        })
        
    }
}

export  const obtenerMonedas =   ()  =>  ({
    type:   OBTENER_MONEDAS,
});

export  const obtenerMonedasExito =   (monedas)  =>  ({
    type:   OBTENER_MONEDAS_EXITO,
    payload:    monedas,
});

export  const obtenerMonedasError =   ()  =>  ({
    type:   OBTENER_MONEDAS_ERROR,
});