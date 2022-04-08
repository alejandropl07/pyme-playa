import {
    COMENZAR_DESCARGA_SOLICITUDES,
    DESCARGA_SOLICITUDES_EXITO,
    DESCARGA_SOLICITUDES_ERROR,
  } from "../types";

 // import clienteAxios from "../config/axios";
  import Swal from "sweetalert2";

export  function obtenerSolicitudesAction() {
    return(dispatch)    =>  {
        dispatch(obtenerSolicitudesComienzo());

        //Consultar la API
   /*     clienteAxios.get('/solicitudes')
        .then(respuesta =>  {
            dispatch(descargaSolicitudesExito(respuesta.data))
        })
        .catch(error    =>{
            dispatch(descargaSolicitudesError())
        })*/
        
    }
}

export  const obtenerSolicitudesComienzo =   ()  =>  ({
    type:   COMENZAR_DESCARGA_SOLICITUDES,
});

export  const descargaSolicitudesExito =   (solicitudes)  =>  ({
    type:   DESCARGA_SOLICITUDES_EXITO,
    payload:    solicitudes,
});

export  const descargaSolicitudesError =   ()  =>  ({
    type:   DESCARGA_SOLICITUDES_ERROR,
});