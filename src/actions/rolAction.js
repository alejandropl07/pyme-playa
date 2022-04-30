import {
    OBTENER_ROL,
    OBTENER_ROL_EXITO,
    OBTENER_ROL_ERROR,
  } from "../types";

  import clienteAxios from "../config/axios";

export  function obtenerRolAction(id) {
    return(dispatch)    =>  {
        dispatch(obtenerRol());

        //Consultar la API
        clienteAxios.get(`solicitudes/usuarioDirector/${id}`)
        .then(respuesta =>  {
            dispatch(obtenerRolExito(respuesta.data))
        })
        .catch(error    =>{
            dispatch(obtenerRolError())
        })
        
    }
}

export  const obtenerRol =   ()  =>  ({
    type:   OBTENER_ROL,
});

export  const obtenerRolExito =   (rol)  =>  ({
    type:   OBTENER_ROL_EXITO,
    payload:    rol,
});

export  const obtenerRolError =   ()  =>  ({
    type:   OBTENER_ROL_ERROR,
});