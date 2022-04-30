import {
    OBTENER_ROL,
    OBTENER_ROL_EXITO,
    OBTENER_ROL_ERROR,
  } from "../types";
  
  // Cada reducer tiene su propio state
  
  const initialState = {
    isDirector: false,
    error: null,
    loading: true,
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case OBTENER_ROL:
        return {
          ...state,
          loading: true,
        };
      case OBTENER_ROL_EXITO:
        return {
          ...state,
          isDirector: action.payload,
          loading: false,
          error: false,
        };
  
      case OBTENER_ROL_ERROR:
        return {
          ...state,
          isDirector: false,
          error: true,
          loading: false,
        };
  
      default:
        return state;
    }
  }