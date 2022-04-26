import {
    COMENZAR_DESCARGA_SOLICITUDES,
    DESCARGA_SOLICITUDES_EXITO,
    DESCARGA_SOLICITUDES_ERROR,
    AGREGAR_SOLICITUD,
    AGREGAR_SOLICITUD_EXITO,
    AGREGAR_SOLICITUD_ERROR,
    OBTENER_SOLICITUD_EDITAR,
    SOLICITUD_EDITAR_ERROR,
    SOLICITUD_EDITAR_EXITO,
    COMENZAR_EDICION_SOLICITUD,
    SOLICITUD_EDITADO_EXITO,
    SOLICITUD_EDITADO_ERROR,
  } from "../types";

  import clienteAxios from "../config/axios";
  import Swal from "sweetalert2";

export  function obtenerSolicitudesAction(id) {
    return(dispatch)    =>  {
        dispatch(obtenerSolicitudesComienzo());

        //Consultar la API
        clienteAxios.get(`/solicitudes/usuario/${id}`)
        .then(respuesta =>  {
            dispatch(descargaSolicitudesExito(respuesta.data))
        })
        .catch(error    =>{
            dispatch(descargaSolicitudesError())
        })
        
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


// AGREGAR SOLICITUD
export  function agregarSolicitudAction(solicitud) {
    return(dispatch)    =>  {
        dispatch(agregarSolicitudComienzo());

        //Insertar en la API
        clienteAxios.post('/solicitudes', solicitud)
        .then(respuesta =>  {
            dispatch(agregarSolicitudExito(solicitud))
            Swal.fire({
                title: "Crear solicitud",
                text: `La solicitud ha sido creada`,
                position: "center",
                background: "white",
                showConfirmButton: true,
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar',            
              });
        })
        .catch(error    =>{
            dispatch(agregarSolicitudError(error))
            Swal.fire({
                title: "Error",
                text: `Ha ocurrido un error`,
                position: "center",
                background: "white",
                showConfirmButton: true,
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar',            
              });
        })
        
    }
}

export  const agregarSolicitudComienzo =   ()  =>  ({
    type:   AGREGAR_SOLICITUD,
});

export  const agregarSolicitudExito =   (solicitud)  =>  ({
    type:   AGREGAR_SOLICITUD_EXITO,
    payload:    solicitud
});

export  const agregarSolicitudError =   (error)  =>  ({
    type:   AGREGAR_SOLICITUD_ERROR,
    payload:    error
});


// Obtener solicitud a editar

export  function obtenerSolicitudAction(id) {
    return(dispatch)    =>  {
        dispatch(obtenerSolicitudEditar());

        clienteAxios.get(`/solicitudes/${id}`)
        .then(respuesta =>  {
            dispatch(editarSolicitudExito(respuesta.data))
        })
        .catch(error    =>{
            dispatch(editarSolicitudError())
        })
        
    }
}

export  const obtenerSolicitudEditar =   ()  =>  ({
    type:   OBTENER_SOLICITUD_EDITAR,
});

export  const editarSolicitudExito =   (solicitud)  =>  ({
    type:   SOLICITUD_EDITAR_EXITO,
    payload:    solicitud,
});

export  const editarSolicitudError =   ()  =>  ({
    type:   SOLICITUD_EDITAR_ERROR,
});



// Editar solicitud

export  function editarSolicitudAction(solicitud) {
    return(dispatch)    =>  {
        dispatch(comenzarSolicitudEditar());

        clienteAxios.put(`/solicitudes/${solicitud.id_solicitud}`, solicitud)
        .then(respuesta =>  {
            dispatch(solicitudEditadoExito(respuesta.data))

            Swal.fire(
                'Almacenado',
                'La solicitud se actualizó correctamente',
                'success'
            )
        })
        .catch(error    =>{
            dispatch(solicitudEditadoError())
        })
        
    }
}

export  const comenzarSolicitudEditar =   ()  =>  ({
    type:   COMENZAR_EDICION_SOLICITUD,
});

export  const solicitudEditadoExito =   (solicitud)  =>  ({
    type:   SOLICITUD_EDITADO_EXITO,
    payload:    solicitud,
});

export  const solicitudEditadoError =   ()  =>  ({
    type:   SOLICITUD_EDITADO_ERROR,
});