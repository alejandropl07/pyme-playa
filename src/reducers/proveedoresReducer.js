import {
    OBTENER_PROVEEDORES,
    OBTENER_PROVEEDORES_EXITO,
    OBTENER_PROVEEDORES_ERROR,
  } from "../types";
  
  // Cada reducer tiene su propio state
  
  const initialState = {
    proveedores: [],
    error: null,
    loading: false,
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case OBTENER_PROVEEDORES:
        return {
          ...state,
          loading: true,
        };
      case OBTENER_PROVEEDORES_EXITO:
        return {
          ...state,
          proveedores: action.payload,
          loading: false,
          error: false,
        };
  
      case OBTENER_PROVEEDORES_ERROR:
        return {
          ...state,
          proveedores: [],
          error: true,
          loading: false,
        };
  
      default:
        return state;
    }
  }