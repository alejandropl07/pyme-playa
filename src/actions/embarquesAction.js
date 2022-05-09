import {
  OBTENER_EMBARQUES,
  OBTENER_EMBARQUES_EXITO,
  OBTENER_EMBARQUES_ERROR,
} from "../types";

import clienteAxios from "../config/axios";

//Obtener embarques   de la BD
export function obtenerEmbarquesAction() {
  return (dispatch) => {
    //Iniciar obtener embarques
    dispatch(obtenerEmbarques());

    //Consultar la API
    clienteAxios
      .get("/embarques")
      .then((respuesta) => {
        //Embarques obtenidos con éxito
        dispatch(obtenerEmbarquesExito(respuesta.data));
      })
      .catch((error) => {
        //Error al obtener embarques
        dispatch(obtenerEmbarquesError());
      });
  };
}

export const obtenerEmbarques = () => ({
  type: OBTENER_EMBARQUES,
});

export const obtenerEmbarquesExito = (embarques) => ({
  type: OBTENER_EMBARQUES_EXITO,
  payload: embarques,
});

export const obtenerEmbarquesError = () => ({
  type: OBTENER_EMBARQUES_ERROR,
});
