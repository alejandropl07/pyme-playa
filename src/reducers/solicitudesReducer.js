import {
    COMENZAR_DESCARGA_SOLICITUDES,
    DESCARGA_SOLICITUDES_EXITO,
    DESCARGA_SOLICITUDES_ERROR,
    AGREGAR_SOLICITUD,
    AGREGAR_SOLICITUD_EXITO,
    AGREGAR_SOLICITUD_ERROR,
    OBTENER_SOLICITUD_EDITAR,
    SOLICITUD_EDITAR_ERROR,
    SOLICITUD_EDITAR_EXITO,
    COMENZAR_EDICION_SOLICITUD,
    SOLICITUD_EDITADO_EXITO,
    SOLICITUD_EDITADO_ERROR,
  } from "../types";
  
  // Cada reducer tiene su propio state
  
  const initialState = {
    solicitudes: [],
    error: null,
    loading: true,
    loadingSolicitud: true,
    solicitud: {},
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case COMENZAR_DESCARGA_SOLICITUDES:
        return {
          ...state,
          loading: true,
          solicitud: {},
          loadingSolicitud: true,
        };
      case DESCARGA_SOLICITUDES_EXITO:
        return {
          ...state,
          solicitudes: action.payload,
          loading: false,
          error: false,
          loadingSolicitud: true,
          solicitud: {},
        };
  
      case DESCARGA_SOLICITUDES_ERROR:
        return {
          ...state,
          solicitudes: [],
          error: true,
          loading: false,
          loadingSolicitud: true,
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

        case OBTENER_SOLICITUD_EDITAR:
          return {
            ...state,
            error: null,
            loadingSolicitud: true,
          };
        case SOLICITUD_EDITAR_EXITO:
          return {
            ...state,
            error: null,
            solicitud: action.payload,
            loadingSolicitud: false,
          };
    
        case SOLICITUD_EDITAR_ERROR:
          return {
            ...state,
            error: true,
          };
    
        case COMENZAR_EDICION_SOLICITUD:
          return {
            ...state,
            error: null,
          };
        case SOLICITUD_EDITADO_EXITO:
          return {
            ...state,
            error: null,
            solicitudes: state.solicitudes.map(solicitud =>  solicitud.id === action.payload.id ? solicitud  = action.payload  : solicitud),
          };
    
        case SOLICITUD_EDITADO_ERROR:
          return {
            ...state,
            error: true,
          };
  
      default:
        return state;
    }
  }