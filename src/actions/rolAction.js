import {
  OBTENER_ROL,
  OBTENER_ROL_EXITO,
  OBTENER_ROL_ERROR,
  OBTENER_ROL_LOG,
  OBTENER_ROL_LOG_EXITO,
  OBTENER_ROL_LOG_ERROR,
} from "../types";

import clienteAxios from "../config/axios";

//Obtener rol director de la BD
export function obtenerRolAction(id) {
  return (dispatch) => {
    //Inicia obtener rol
    dispatch(obtenerRol());

    //Consultar la API
    clienteAxios
      .get(`solicitudes/usuarioDirector/${id}`)
      .then((respuesta) => {
        //Rol obtenido con éxito
        dispatch(obtenerRolExito(respuesta.data));
      })
      .catch((error) => {
        //Error al obtener rol
        dispatch(obtenerRolError());
      });
  };
}

export const obtenerRol = () => ({
  type: OBTENER_ROL,
});

export const obtenerRolExito = (rol) => ({
  type: OBTENER_ROL_EXITO,
  payload: rol,
});

export const obtenerRolError = () => ({
  type: OBTENER_ROL_ERROR,
});

//Obtener   rol logístico de la BD
export function obtenerRolLogAction(id) {
  return (dispatch) => {
    //Inicia obtener rol
    dispatch(obtenerRol());

    //Consultar la API
    clienteAxios
      .get(`solicitudes/usuarioLogistico/${id}`)
      .then((respuesta) => {
        //Rol logístico obtenido con éxito
        dispatch(obtenerRolLogExito(respuesta.data));
      })
      .catch((error) => {
        //Error al obtener rol
        dispatch(obtenerRolLogError());
      });
  };
}

export const obtenerRolLog = () => ({
  type: OBTENER_ROL_LOG,
});

export const obtenerRolLogExito = (rol) => ({
  type: OBTENER_ROL_LOG_EXITO,
  payload: rol,
});

export const obtenerRolLogError = () => ({
  type: OBTENER_ROL_LOG_ERROR,
});
