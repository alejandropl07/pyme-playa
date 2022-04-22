import {
    OBTENER_DIVISION,
    OBTENER_DIVISION_EXITO,
    OBTENER_DIVISION_ERROR,
  } from "../types";
  
  // Cada reducer tiene su propio state
  
  const initialState = {
    divisiones: [],
    error: null,
    loading: true,
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case OBTENER_DIVISION:
        return {
          ...state,
          loading: true,
        };
      case OBTENER_DIVISION_EXITO:
        return {
          ...state,
          divisiones: action.payload,
          loading: false,
          error: false,
        };
  
      case OBTENER_DIVISION_ERROR:
        return {
          ...state,
          divisiones: [],
          error: true,
          loading: false,
        };
  
      default:
        return state;
    }
  }