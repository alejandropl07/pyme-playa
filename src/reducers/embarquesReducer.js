import {
    OBTENER_EMBARQUES,
    OBTENER_EMBARQUES_EXITO,
    OBTENER_EMBARQUES_ERROR,
  } from "../types";
  
  // Cada reducer tiene su propio state
  
  const initialState = {
    embarques: [],
    error: null,
    loading: true,
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case OBTENER_EMBARQUES:
        return {
          ...state,
          loading: true,
        };
      case OBTENER_EMBARQUES_EXITO:
        return {
          ...state,
          embarques: action.payload,
          loading: false,
          error: false,
        };
  
      case OBTENER_EMBARQUES_ERROR:
        return {
          ...state,
          embarques: [],
          error: true,
          loading: false,
        };
  
      default:
        return state;
    }
  }