import {
    COMENZAR_CREAR_CLIENTE,
    CREAR_CLIENTE_EXITO,
    CREAR_CLIENTE_ERROR
  } from "../types";
  
  // Cada reducer tiene su propio state
  
  const initialState = {
    clientes: [],
    error: null,
    cliente: {},
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
  
      default:
        return state;
    }
  }