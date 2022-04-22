import {
    OBTENER_TIPO_PRODUCTO,
    OBTENER_TIPO_PRODUCTO_EXITO,
    OBTENER_TIPO_PRODUCTO_ERROR,
  } from "../types";
  
  // Cada reducer tiene su propio state
  
  const initialState = {
    productos: [],
    error: null,
    loading: true,
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case OBTENER_TIPO_PRODUCTO:
        return {
          ...state,
          loading: true,
        };
      case OBTENER_TIPO_PRODUCTO_EXITO:
        return {
          ...state,
          productos: action.payload,
          loading: false,
          error: false,
        };
  
      case OBTENER_TIPO_PRODUCTO_ERROR:
        return {
          ...state,
          productos: [],
          error: true,
          loading: false,
        };
  
      default:
        return state;
    }
  }