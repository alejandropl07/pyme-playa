import {
  OBTENER_PROVEEDORES,
  OBTENER_PROVEEDORES_EXITO,
  OBTENER_PROVEEDORES_ERROR,
} from "../types";

import clienteAxios from "../config/axios";

//Obtener proveedores de la BD
export function obtenerProveedoresAction() {
  return (dispatch) => {
    //Inicia obtener proveedores
    dispatch(obtenerProveedores());

    //Consultar la API
    clienteAxios
      .get("/proveedores")
      .then((respuesta) => {
        //Proveedores obtenidos con éxito
        dispatch(obtenerProveedoresExito(respuesta.data));
      })
      .catch((error) => {
        //Error al obtener proveedores
        dispatch(obtenerProveedoresError());
      });
  };
}

export const obtenerProveedores = () => ({
  type: OBTENER_PROVEEDORES,
});

export const obtenerProveedoresExito = (proveedores) => ({
  type: OBTENER_PROVEEDORES_EXITO,
  payload: proveedores,
});

export const obtenerProveedoresError = () => ({
  type: OBTENER_PROVEEDORES_ERROR,
});
