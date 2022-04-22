import {
    COMENZAR_CREAR_CLIENTE,
    CREAR_CLIENTE_EXITO,
    CREAR_CLIENTE_ERROR,
    OBTENER_CLIENTES,
    OBTENER_CLIENTES_EXITO,
    OBTENER_CLIENTES_ERROR
  } from "../types";
  
  // Cada reducer tiene su propio state
  
  const initialState = {
    clientes: [],
    error: null,
    cliente: {},
    loading: true,
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case COMENZAR_CREAR_CLIENTE:
        return {
          ...state,
          cliente: {},
        };
      case CREAR_CLIENTE_EXITO:
        return {
          ...state,
          error: false,
          cliente: action.payload,
        };
  
      case CREAR_CLIENTE_ERROR:
        return {
          ...state,
          error: action.payload,
          cliente: {},
        };

        case OBTENER_CLIENTES:
        return {
          ...state,
          loading: true,
        };
      case OBTENER_CLIENTES_EXITO:
        return {
          ...state,
          clientes: action.payload,
          loading: false,
          error: false,
        };
  
      case OBTENER_CLIENTES_ERROR:
        return {
          ...state,
          clientes: [],
          error: true,
          loading: false,
        };
  
      default:
        return state;
    }
  }