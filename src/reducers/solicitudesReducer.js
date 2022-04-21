import {
    COMENZAR_DESCARGA_SOLICITUDES,
    DESCARGA_SOLICITUDES_EXITO,
    DESCARGA_SOLICITUDES_ERROR,
    AGREGAR_SOLICITUD,
    AGREGAR_SOLICITUD_EXITO,
    AGREGAR_SOLICITUD_ERROR,
  } from "../types";
  
  // Cada reducer tiene su propio state
  
  const initialState = {
    solicitudes: [],
    error: null,
    loading: false,
    solicitud: {},
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case COMENZAR_DESCARGA_SOLICITUDES:
        return {
          ...state,
          loading: true,
          solicitud: {},
        };
      case DESCARGA_SOLICITUDES_EXITO:
        return {
          ...state,
          solicitudes: action.payload,
          loading: false,
          error: false,
          solicitud: {},
        };
  
      case DESCARGA_SOLICITUDES_ERROR:
        return {
          ...state,
          solicitudes: [],
          error: true,
          loading: false,
          solicitud: {},
        };

        case AGREGAR_SOLICITUD:
        return {
          ...state,
          solicitud: {},
        };
      case AGREGAR_SOLICITUD_EXITO:
        return {
          ...state,
          error: false,
          solicitud: action.payload,
        };
  
      case AGREGAR_SOLICITUD_ERROR:
        return {
          ...state,
          error: action.payload,
          solicitud: {},
        };
  
      default:
        return state;
    }
  }