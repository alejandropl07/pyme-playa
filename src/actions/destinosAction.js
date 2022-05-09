import {
  OBTENER_DESTINOS,
  OBTENER_DESTINOS_EXITO,
  OBTENER_DESTINOS_ERROR,
} from "../types";

import clienteAxios from "../config/axios";

//Obtener destinos de la BD
export function obtenerDestinosAction() {
  return (dispatch) => {
    //Inicia obtner destinos
    dispatch(obtenerDestinos());

    //Consultar la API
    clienteAxios
      .get("/destinos")
      .then((respuesta) => {
        //Destinos obtenidos con éxito
        dispatch(obtenerDestinosExito(respuesta.data));
      })
      .catch((error) => {
        //Error al obtener destinos
        dispatch(obtenerDestinosError());
      });
  };
}

export const obtenerDestinos = () => ({
  type: OBTENER_DESTINOS,
});

export const obtenerDestinosExito = (destinos) => ({
  type: OBTENER_DESTINOS_EXITO,
  payload: destinos,
});

export const obtenerDestinosError = () => ({
  type: OBTENER_DESTINOS_ERROR,
});
