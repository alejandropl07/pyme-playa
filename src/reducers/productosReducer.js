import {
    OBTENER_PRODUCTOS_EXCEL,
    OBTENER_PRODUCTOS_EXCEL_EXITO,
    OBTENER_PRODUCTOS_EXCEL_ERROR,
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    ELIMINAR_PRODUCTO,
    ELIMINAR_PRODUCTO_EXITO,
    ELIMINAR_PRODUCTO_ERROR
  } from "../types";
  
  // Cada reducer tiene su propio state
  
  const initialState = {
    productos: [],
    error: null,
    loading: true,
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case OBTENER_PRODUCTOS_EXCEL:
        return {
          ...state,
          loading: true,
        };
      case OBTENER_PRODUCTOS_EXCEL_EXITO:
        return {
          ...state,
          productos: [...state.productos, action.payload],
          loading: false,
          error: false,
        };
  
      case OBTENER_PRODUCTOS_EXCEL_ERROR:
        return {
          ...state,
          productos: [],
          error: true,
          loading: false,
        };


        case AGREGAR_PRODUCTO:
        return {
          ...state,
        };
      case AGREGAR_PRODUCTO_EXITO:
        return {
          ...state,
          error: false,
          productos: [...state.productos, action.payload],
        };
  
      case AGREGAR_PRODUCTO_ERROR:
        return {
          ...state,
          error: action.payload,
        };

      case ELIMINAR_PRODUCTO:
        return {
          ...state,
          error: null,
        };
      case ELIMINAR_PRODUCTO_EXITO:
        return {
        ...state,
        error: null,
        productos: state.productos.filter(
          (producto) => producto.Código !== action.payload
        ),
      };

      case ELIMINAR_PRODUCTO_ERROR:
        return {
          ...state,
          error: true,
        };
  
      default:
        return state;
    }
  }