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
  OBTENER_PRODUCTOS_EXCEL,
  OBTENER_PRODUCTOS_EXCEL_EXITO,
  OBTENER_PRODUCTOS_EXCEL_ERROR,
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  ELIMINAR_PRODUCTO,
  ELIMINAR_PRODUCTO_EXITO,
  ELIMINAR_PRODUCTO_ERROR,
  OBTENER_PRODUCTOS_SOLICITUD,
  OBTENER_PRODUCTOS_SOLICITUD_EXITO,
  OBTENER_PRODUCTOS_SOLICITUD_ERROR,
  APROBAR_SOLICITUD,
  APROBAR_SOLICITUD_EXITO,
  APROBAR_SOLICITUD_ERROR,
  EDITAR_PRODUCTO,
  EDITAR_PRODUCTO_EXITO,
  EDITAR_PRODUCTO_ERROR,
  FINALIZAR_SOLICITUD,
  FINALIZAR_SOLICITUD_EXITO,
  FINALIZAR_SOLICITUD_ERROR,
  OBTENER_SOLICITUD_IMPRIMIR,
  SOLICITUD_IMPRIMIR_EXITO,
  SOLICITUD_IMPRIMIR_ERROR,
  RECHAZAR_SOLICITUD,
  RECHAZAR_SOLICITUD_EXITO,
  RECHAZAR_SOLICITUD_ERROR,
  ESPERAR_SOLICITUD_EXITO,
  ESPERAR_SOLICITUD,
  ESPERAR_SOLICITUD_ERROR,
  SOLICITUD_VACIA,
  APROBAR_SOLICITUD_LOG,
  APROBAR_SOLICITUD_LOG_EXITO,
  APROBAR_SOLICITUD_LOG_ERROR,
} from "../types";

import clienteAxios from "../config/axios";
import Swal from "sweetalert2";

export function solicitudVaciaAction() {
  return (dispatch) => {
    dispatch(solicitudVacia());
  };
}

export const solicitudVacia = () => ({
  type: SOLICITUD_VACIA,
});

export function obtenerSolicitudesAction(id) {
  return (dispatch) => {
    dispatch(obtenerSolicitudesComienzo());

    //Consultar la API
    clienteAxios
      .get(`/solicitudes/usuario/${id}`)
      .then((respuesta) => {
        dispatch(descargaSolicitudesExito(respuesta.data));
      })
      .catch((error) => {
        dispatch(descargaSolicitudesError());
      });
  };
}

export const obtenerSolicitudesComienzo = () => ({
  type: COMENZAR_DESCARGA_SOLICITUDES,
});

export const descargaSolicitudesExito = (solicitudes) => ({
  type: DESCARGA_SOLICITUDES_EXITO,
  payload: solicitudes,
});

export const descargaSolicitudesError = () => ({
  type: DESCARGA_SOLICITUDES_ERROR,
});

// AGREGAR SOLICITUD
export function agregarSolicitudAction(solicitud) {
  return (dispatch) => {
    dispatch(agregarSolicitudComienzo());

    //Insertar en la API
    clienteAxios
      .post("/solicitudes", solicitud)
      .then((respuesta) => {
        dispatch(agregarSolicitudExito(solicitud));
        Swal.fire({
          title: "Crear solicitud",
          text: `La solicitud ha sido creada`,
          position: "center",
          background: "white",
          showConfirmButton: true,
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        });
      })
      .catch((error) => {
        dispatch(agregarSolicitudError(error));
        Swal.fire({
          title: "Error",
          text: `Ha ocurrido un error`,
          position: "center",
          background: "white",
          showConfirmButton: true,
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        });
      });
  };
}

export const agregarSolicitudComienzo = () => ({
  type: AGREGAR_SOLICITUD,
});

export const agregarSolicitudExito = (solicitud) => ({
  type: AGREGAR_SOLICITUD_EXITO,
  payload: solicitud,
});

export const agregarSolicitudError = (error) => ({
  type: AGREGAR_SOLICITUD_ERROR,
  payload: error,
});

// Obtener solicitud a editar

export function obtenerSolicitudAction(id) {
  return (dispatch) => {
    dispatch(obtenerSolicitudEditar());
    dispatch(obtenerProductosSolicitud());

    clienteAxios
      .get(`/solicitudes/${id}`)
      .then((respuesta) => {
        dispatch(editarSolicitudExito(respuesta.data));
        dispatch(
          obtenerProductosSolicitudExito(respuesta.data.tc_solicitud_productos)
        );
      })
      .catch((error) => {
        dispatch(editarSolicitudError());
        dispatch(obtenerProductosSolicitudError());
      });
  };
}

export const obtenerSolicitudEditar = () => ({
  type: OBTENER_SOLICITUD_EDITAR,
});

export const editarSolicitudExito = (solicitud) => ({
  type: SOLICITUD_EDITAR_EXITO,
  payload: solicitud,
});

export const editarSolicitudError = () => ({
  type: SOLICITUD_EDITAR_ERROR,
});

export const obtenerProductosSolicitud = () => ({
  type: OBTENER_PRODUCTOS_SOLICITUD,
});

export const obtenerProductosSolicitudExito = (productos) => ({
  type: OBTENER_PRODUCTOS_SOLICITUD_EXITO,
  payload: productos,
});

export const obtenerProductosSolicitudError = () => ({
  type: OBTENER_PRODUCTOS_SOLICITUD_ERROR,
});

// Editar solicitud

export function editarSolicitudAction(solicitud) {
  return (dispatch) => {
    dispatch(comenzarSolicitudEditar());

    clienteAxios
      .put(`/solicitudes/${solicitud.id_solicitud}`, solicitud)
      .then((respuesta) => {
        dispatch(solicitudEditadoExito(respuesta.data));

        Swal.fire(
          "Almacenado",
          "La solicitud se actualizó correctamente",
          "success"
        );
      })
      .catch((error) => {
        dispatch(solicitudEditadoError());
      });
  };
}

export const comenzarSolicitudEditar = () => ({
  type: COMENZAR_EDICION_SOLICITUD,
});

export const solicitudEditadoExito = (solicitud) => ({
  type: SOLICITUD_EDITADO_EXITO,
  payload: solicitud,
});

export const solicitudEditadoError = () => ({
  type: SOLICITUD_EDITADO_ERROR,
});

export function obtenerProductosExcelAction(productosExcel) {
  return (dispatch) => {
    dispatch(obtenerProductosExcel());

    try {
      dispatch(obtenerProductosExcelExito(productosExcel));
    } catch (error) {
      dispatch(obtenerProductosExcelError());
    }
  };
}

export const obtenerProductosExcel = () => ({
  type: OBTENER_PRODUCTOS_EXCEL,
});

export const obtenerProductosExcelExito = (productosExcel) => ({
  type: OBTENER_PRODUCTOS_EXCEL_EXITO,
  payload: productosExcel,
});

export const obtenerProductosExcelError = () => ({
  type: OBTENER_PRODUCTOS_EXCEL_ERROR,
});

// AGREGAR PRODUCTO AL STATE
export function agregarProductoAction(producto) {
  return (dispatch) => {
    dispatch(agregarProductoComienzo());

    try {
      dispatch(agregarProductoExito(producto));
    } catch (error) {
      dispatch(agregarProductoError(error));
    }
  };
}

export const agregarProductoComienzo = () => ({
  type: AGREGAR_PRODUCTO,
});

export const agregarProductoExito = (producto) => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto,
});

export const agregarProductoError = (error) => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: error,
});

//Editar producto
export function editarProductoAction(producto) {
  return (dispatch) => {
    dispatch(editarProducto());

    try {
      dispatch(editarProductoExito(producto));
    } catch (error) {
      dispatch(editarProductoError());
    }
  };
}

export const editarProducto = () => ({
  type: EDITAR_PRODUCTO,
});

export const editarProductoExito = (producto) => ({
  type: EDITAR_PRODUCTO_EXITO,
  payload: producto,
});

export const editarProductoError = () => ({
  type: EDITAR_PRODUCTO_ERROR,
});

export function eliminarProductoAction(id) {
  return (dispatch) => {
    dispatch(eliminarProducto());

    try {
      dispatch(eliminarProductoExito(id));
    } catch (error) {
      dispatch(eliminarProductoError());
    }
  };
}

export const eliminarProducto = () => ({
  type: ELIMINAR_PRODUCTO,
});

export const eliminarProductoExito = (id) => ({
  type: ELIMINAR_PRODUCTO_EXITO,
  payload: id,
});

export const eliminarProductoError = () => ({
  type: ELIMINAR_PRODUCTO_ERROR,
});

// Aprobar solicitud

export function aprobarSolicitudAction(id) {
  return (dispatch) => {
    dispatch(aprobarSolicitud());

    clienteAxios
      .put(`/solicitudes/aprobarSolicitud/${id}`)
      .then((respuesta) => {
        dispatch(aprobarSolicitudExito(respuesta.data));
      })
      .catch((error) => {
        dispatch(aprobarSolicitudError());
      });
  };
}

export const aprobarSolicitud = () => ({
  type: APROBAR_SOLICITUD,
});

export const aprobarSolicitudExito = (solicitud) => ({
  type: APROBAR_SOLICITUD_EXITO,
  payload: solicitud,
});

export const aprobarSolicitudError = () => ({
  type: APROBAR_SOLICITUD_ERROR,
});


// Aprobar solicitud logistico

export function aprobarSolicitudLogAction(id) {
  return (dispatch) => {
    dispatch(aprobarSolicitudLog());

    clienteAxios
      .put(`/solicitudes/aprobarSolicitudLog/${id}`)
      .then((respuesta) => {
        dispatch(aprobarSolicitudLogExito(respuesta.data));
      })
      .catch((error) => {
        dispatch(aprobarSolicitudLogError());
      });
  };
}

export const aprobarSolicitudLog = () => ({
  type: APROBAR_SOLICITUD_LOG,
});

export const aprobarSolicitudLogExito = (solicitud) => ({
  type: APROBAR_SOLICITUD_LOG_EXITO,
  payload: solicitud,
});

export const aprobarSolicitudLogError = () => ({
  type: APROBAR_SOLICITUD_LOG_ERROR,
});


// Rechazar solicitud

export function rechazarSolicitudAction(id) {
  return (dispatch) => {
    dispatch(rechazarSolicitud());

    clienteAxios
      .put(`/solicitudes/rechazarSolicitud/${id}`)
      .then((respuesta) => {
        dispatch(rechazarSolicitudExito(respuesta.data));
      })
      .catch((error) => {
        dispatch(rechazarSolicitudError());
      });
  };
}

export const rechazarSolicitud = () => ({
  type: RECHAZAR_SOLICITUD,
});

export const rechazarSolicitudExito = (solicitud) => ({
  type: RECHAZAR_SOLICITUD_EXITO,
  payload: solicitud,
});

export const rechazarSolicitudError = () => ({
  type: RECHAZAR_SOLICITUD_ERROR,
});

// Finalizar solicitud

export function finalizarSolicitudAction(id) {
  return (dispatch) => {
    dispatch(finalizarSolicitud());

    clienteAxios
      .put(`/solicitudes/finalizarSolicitud/${id}`)
      .then((respuesta) => {
        dispatch(finalizarSolicitudExito(respuesta.data));
      })
      .catch((error) => {
        dispatch(finalizarSolicitudError());
      });
  };
}

export const finalizarSolicitud = () => ({
  type: FINALIZAR_SOLICITUD,
});

export const finalizarSolicitudExito = (solicitud) => ({
  type: FINALIZAR_SOLICITUD_EXITO,
  payload: solicitud,
});

export const finalizarSolicitudError = () => ({
  type: FINALIZAR_SOLICITUD_ERROR,
});


// Esperar solicitud

export function esperarSolicitudAction(id, causa_espera) {
  return (dispatch) => {
    dispatch(esperarSolicitud());

    clienteAxios
      .put(`/solicitudes/esperarSolicitud/${id}`, {causa_espera})
      .then((respuesta) => {
        dispatch(esperarSolicitudExito(respuesta.data));
      })
      .catch((error) => {
        dispatch(esperarSolicitudError());
      });
  };
}

export const esperarSolicitud = () => ({
  type: ESPERAR_SOLICITUD,
});

export const esperarSolicitudExito = (solicitud) => ({
  type: ESPERAR_SOLICITUD_EXITO,
  payload: solicitud,
});

export const esperarSolicitudError = () => ({
  type: ESPERAR_SOLICITUD_ERROR,
});


// Obtener solicitud a imprimir

export function obtenerSolicitudImprimirAction(id) {
  return (dispatch) => {
    dispatch(obtenerSolicitudImprimir());

    clienteAxios
      .get(`/solicitudes/${id}`)
      .then((respuesta) => {
        dispatch(imprimirSolicitudExito(respuesta.data));
      })
      .catch((error) => {
        dispatch(imprimirSolicitudError());
      });
  };
}

export const obtenerSolicitudImprimir = () => ({
  type: OBTENER_SOLICITUD_IMPRIMIR,
});

export const imprimirSolicitudExito = (solicitud) => ({
  type: SOLICITUD_IMPRIMIR_EXITO,
  payload: solicitud,
});

export const imprimirSolicitudError = () => ({
  type: SOLICITUD_IMPRIMIR_ERROR,
});
