import {
    OBTENER_DESTINOS,
    OBTENER_DESTINOS_EXITO,
    OBTENER_DESTINOS_ERROR,
  } from "../types";
  
  // Cada reducer tiene su propio state
  
  const initialState = {
    destinos: [],
    error: null,
    loading: true,
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case OBTENER_DESTINOS:
        return {
          ...state,
          loading: true,
        };
      case OBTENER_DESTINOS_EXITO:
        return {
          ...state,
          destinos: action.payload,
          loading: false,
          error: false,
        };
  
      case OBTENER_DESTINOS_ERROR:
        return {
          ...state,
          destinos: [],
          error: true,
          loading: false,
        };
  
      default:
        return state;
    }
  }