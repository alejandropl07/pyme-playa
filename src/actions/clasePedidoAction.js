import {
  OBTENER_CLASE_PEDIDO,
  OBTENER_CLASE_PEDIDO_EXITO,
  OBTENER_CLASE_PEDIDO_ERROR,
} from "../types";

import clienteAxios from "../config/axios";

//Obtener clases de pedidos de la base de datos
export function obtenerPedidosAction() {
  return (dispatch) => {
    //Iniciar obtener clases de pedidos
    dispatch(obtenerPedidos());

    //Consultar la API
    clienteAxios
      .get("/clasesPedido")
      .then((respuesta) => {
        //Clases de pedidos obtenidos con éxito
        dispatch(obtenerPedidosExito(respuesta.data));
      })
      .catch((error) => {
        //Error al obtener pedidos
        dispatch(obtenerPedidosError());
      });
  };
}

export const obtenerPedidos = () => ({
  type: OBTENER_CLASE_PEDIDO,
});

export const obtenerPedidosExito = (pedidos) => ({
  type: OBTENER_CLASE_PEDIDO_EXITO,
  payload: pedidos,
});

export const obtenerPedidosError = () => ({
  type: OBTENER_CLASE_PEDIDO_ERROR,
});
