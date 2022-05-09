import {
  OBTENER_MONEDAS,
  OBTENER_MONEDAS_EXITO,
  OBTENER_MONEDAS_ERROR,
} from "../types";

import clienteAxios from "../config/axios";

//Obtener tipos de moneda de la BD
export function obtenerMonedasAction() {
  return (dispatch) => {
    //Inicia obtener monedas
    dispatch(obtenerMonedas());

    //Consultar la API
    clienteAxios
      .get("/monedas")
      .then((respuesta) => {
        //Monedas obtenidas con éxito
        dispatch(obtenerMonedasExito(respuesta.data));
      })
      .catch((error) => {
        //Error al obtener monedas
        dispatch(obtenerMonedasError());
      });
  };
}

export const obtenerMonedas = () => ({
  type: OBTENER_MONEDAS,
});

export const obtenerMonedasExito = (monedas) => ({
  type: OBTENER_MONEDAS_EXITO,
  payload: monedas,
});

export const obtenerMonedasError = () => ({
  type: OBTENER_MONEDAS_ERROR,
});
