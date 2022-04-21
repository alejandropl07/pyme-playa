import {
    OBTENER_DIVISION,
    OBTENER_DIVISION_EXITO,
    OBTENER_DIVISION_ERROR,
  } from "../types";

  import clienteAxios from "../config/axios";

export  function obtenerDivisionAction() {
    return(dispatch)    =>  {
        dispatch(obtenerDivision());

        //Consultar la API
        clienteAxios.get('/divisiones')
        .then(respuesta =>  {
            dispatch(obtenerDivisionExito(respuesta.data))
        })
        .catch(error    =>{
            dispatch(obtenerDivisionError())
        })
        
    }
}

export  const obtenerDivision =   ()  =>  ({
    type:   OBTENER_DIVISION,
});

export  const obtenerDivisionExito =   (divisiones)  =>  ({
    type:   OBTENER_DIVISION_EXITO,
    payload:    divisiones,
});

export  const obtenerDivisionError =   ()  =>  ({
    type:   OBTENER_DIVISION_ERROR,
});