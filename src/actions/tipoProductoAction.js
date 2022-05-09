import {
  OBTENER_TIPO_PRODUCTO,
  OBTENER_TIPO_PRODUCTO_EXITO,
  OBTENER_TIPO_PRODUCTO_ERROR,
} from "../types";

import clienteAxios from "../config/axios";

//Obtener tipos de productos de la BD
export function obtenerProductosAction() {
  return (dispatch) => {
    //Inicia obtner tipos de productos
    dispatch(obtenerProductos());

    //Consultar la API
    clienteAxios
      .get("/tiposProducto")
      .then((respuesta) => {
        //Tipos de productos obtenidos
        dispatch(obtenerProductosExito(respuesta.data));
      })
      .catch((error) => {
        //Error al obtener tipos de productos
        dispatch(obtenerProductosError());
      });
  };
}

export const obtenerProductos = () => ({
  type: OBTENER_TIPO_PRODUCTO,
});

export const obtenerProductosExito = (productos) => ({
  type: OBTENER_TIPO_PRODUCTO_EXITO,
  payload: productos,
});

export const obtenerProductosError = () => ({
  type: OBTENER_TIPO_PRODUCTO_ERROR,
});
