import {
    OBTENER_MONEDAS,
    OBTENER_MONEDAS_EXITO,
    OBTENER_MONEDAS_ERROR,
  } from "../types";
  
  // Cada reducer tiene su propio state
  
  const initialState = {
    monedas: [],
    error: null,
    loading: true,
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case OBTENER_MONEDAS:
        return {
          ...state,
          loading: true,
        };
      case OBTENER_MONEDAS_EXITO:
        return {
          ...state,
          monedas: action.payload,
          loading: false,
          error: false,
        };
  
      case OBTENER_MONEDAS_ERROR:
        return {
          ...state,
          monedas: [],
          error: true,
          loading: false,
        };
  
      default:
        return state;
    }
  }