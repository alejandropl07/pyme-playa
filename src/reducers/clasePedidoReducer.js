import {
    OBTENER_CLASE_PEDIDO,
    OBTENER_CLASE_PEDIDO_EXITO,
    OBTENER_CLASE_PEDIDO_ERROR,
  } from "../types";
  
  // Cada reducer tiene su propio state
  
  const initialState = {
    pedidos: [],
    error: null,
    loading: true,
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case OBTENER_CLASE_PEDIDO:
        return {
          ...state,
          loading: true,
        };
      case OBTENER_CLASE_PEDIDO_EXITO:
        return {
          ...state,
          pedidos: action.payload,
          loading: false,
          error: false,
        };
  
      case OBTENER_CLASE_PEDIDO_ERROR:
        return {
          ...state,
          pedidos: [],
          error: true,
          loading: false,
        };
  
      default:
        return state;
    }
  }