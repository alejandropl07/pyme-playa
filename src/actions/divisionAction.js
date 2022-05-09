import {
  OBTENER_DIVISION,
  OBTENER_DIVISION_EXITO,
  OBTENER_DIVISION_ERROR,
} from "../types";

import clienteAxios from "../config/axios";

//Obtner divisiones de la BD
export function obtenerDivisionAction() {
  return (dispatch) => {
    //Inicia obtener divisiones
    dispatch(obtenerDivision());

    //Consultar la API
    clienteAxios
      .get("/divisiones")
      .then((respuesta) => {
        //Divisiones obtenidas con éxito
        dispatch(obtenerDivisionExito(respuesta.data));
      })
      .catch((error) => {
        //Error al obtener divisiones
        dispatch(obtenerDivisionError());
      });
  };
}

export const obtenerDivision = () => ({
  type: OBTENER_DIVISION,
});

export const obtenerDivisionExito = (divisiones) => ({
  type: OBTENER_DIVISION_EXITO,
  payload: divisiones,
});

export const obtenerDivisionError = () => ({
  type: OBTENER_DIVISION_ERROR,
});
