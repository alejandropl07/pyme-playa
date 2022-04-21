import {
    OBTENER_CLASE_PEDIDO,
    OBTENER_CLASE_PEDIDO_EXITO,
    OBTENER_CLASE_PEDIDO_ERROR,
  } from "../types";

  import clienteAxios from "../config/axios";

export  function obtenerPedidosAction() {
    return(dispatch)    =>  {
        dispatch(obtenerPedidos());

        //Consultar la API
        clienteAxios.get('/clasesPedido')
        .then(respuesta =>  {
            dispatch(obtenerPedidosExito(respuesta.data))
        })
        .catch(error    =>{
            dispatch(obtenerPedidosError())
        })
        
    }
}

export  const obtenerPedidos =   ()  =>  ({
    type:   OBTENER_CLASE_PEDIDO,
});

export  const obtenerPedidosExito =   (pedidos)  =>  ({
    type:   OBTENER_CLASE_PEDIDO_EXITO,
    payload:    pedidos,
});

export  const obtenerPedidosError =   ()  =>  ({
    type:   OBTENER_CLASE_PEDIDO_ERROR,
});