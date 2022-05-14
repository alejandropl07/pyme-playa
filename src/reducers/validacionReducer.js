import {
    VALIDAR_FORMULARIO,
    VALIDAR_FORMULARIO_EXITO,
    VALIDAR_FORMULARIO_ERROR,
    VALIDAR_CLIENTE,
    VALIDAR_CLIENTE_EXITO,
    VALIDAR_CLIENTE_ERROR,
  } from "../types";
  
  const initialState = {
    error: null,
    errorCliente: null,
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case VALIDAR_FORMULARIO:
          return {
              ...state,
              error: null,
            };
  
      case VALIDAR_FORMULARIO_EXITO:
          return {
              ...state,
              error: null,
            };
  
      case VALIDAR_FORMULARIO_ERROR:
          return {
              ...state,
              error: true,
            };

            case VALIDAR_CLIENTE:
          return {
              ...state,
              errorCliente: null,
            };
  
      case VALIDAR_CLIENTE_EXITO:
          return {
              ...state,
              errorCliente: null,
            };
  
      case VALIDAR_CLIENTE_ERROR:
          return {
              ...state,
              errorCliente: true,
            };
  
      default:
        return  state;
    }
  }