import {
    OBTENER_SUCURSALES,
    OBTENER_SUCURSALES_EXITO,
    OBTENER_SUCURSALES_ERROR,
  } from "../types";
  
  // Cada reducer tiene su propio state
  
  const initialState = {
    sucursales: [],
    error: null,
    loading: false,
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case OBTENER_SUCURSALES:
        return {
          ...state,
          loading: true,
        };
      case OBTENER_SUCURSALES_EXITO:
        return {
          ...state,
          sucursales: action.payload,
          loading: false,
          error: false,
        };
  
      case OBTENER_SUCURSALES_ERROR:
        return {
          ...state,
          sucursales: [],
          error: true,
          loading: false,
        };
  
      default:
        return state;
    }
  }