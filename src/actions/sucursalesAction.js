import {
  OBTENER_SUCURSALES,
  OBTENER_SUCURSALES_EXITO,
  OBTENER_SUCURSALES_ERROR,
} from "../types";

import clienteAxios from "../config/axios";

//Obtener sucursales de la BD
export function obtenerSucursalesAction() {
  return (dispatch) => {
    //Inicia obtener sucursales
    dispatch(obtenerSucursales());

    //Consultar la API
    clienteAxios
      .get("/sucursales")
      .then((respuesta) => {
        //Sucursales obtenidas con éxito
        dispatch(obtenerSucursalesExito(respuesta.data));
      })
      .catch((error) => {
        //Error al obtener sucursales
        dispatch(obtenerSucursalesError());
      });
  };
}

export const obtenerSucursales = () => ({
  type: OBTENER_SUCURSALES,
});

export const obtenerSucursalesExito = (sucursales) => ({
  type: OBTENER_SUCURSALES_EXITO,
  payload: sucursales,
});

export const obtenerSucursalesError = () => ({
  type: OBTENER_SUCURSALES_ERROR,
});
