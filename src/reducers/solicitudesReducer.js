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
  OBTENER_PRODUCTOS_EXCEL,
  OBTENER_PRODUCTOS_EXCEL_EXITO,
  OBTENER_PRODUCTOS_EXCEL_ERROR,
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  ELIMINAR_PRODUCTO,
  ELIMINAR_PRODUCTO_EXITO,
  ELIMINAR_PRODUCTO_ERROR,
  OBTENER_PRODUCTOS_SOLICITUD,
  OBTENER_PRODUCTOS_SOLICITUD_EXITO,
  OBTENER_PRODUCTOS_SOLICITUD_ERROR,
  APROBAR_SOLICITUD,
  APROBAR_SOLICITUD_EXITO,
  APROBAR_SOLICITUD_ERROR,
  EDITAR_PRODUCTO,
  EDITAR_PRODUCTO_EXITO,
  EDITAR_PRODUCTO_ERROR,
  FINALIZAR_SOLICITUD,
  FINALIZAR_SOLICITUD_EXITO,
  FINALIZAR_SOLICITUD_ERROR,
  OBTENER_SOLICITUD_IMPRIMIR,
  SOLICITUD_IMPRIMIR_EXITO,
  SOLICITUD_IMPRIMIR_ERROR,
  RECHAZAR_SOLICITUD,
  RECHAZAR_SOLICITUD_EXITO,
  RECHAZAR_SOLICITUD_ERROR,
} from "../types";

// Cada reducer tiene su propio state

const initialState = {
  solicitudes: [],
  error: null,
  loading: true,
  loadingSolicitud: true,
  solicitud: {},
  productos: [],
  errorProducto: null,
  loadingProducto: true,
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
        solicitudes: state.solicitudes.map((solicitud) =>
          solicitud.id === action.payload.id
            ? (solicitud = action.payload)
            : solicitud
        ),
      };

    case SOLICITUD_EDITADO_ERROR:
      return {
        ...state,
        error: true,
      };

    case OBTENER_PRODUCTOS_EXCEL:
      return {
        ...state,
        loadingProducto: true,
      };
    case OBTENER_PRODUCTOS_EXCEL_EXITO:
      return {
        ...state,
        productos: state.productos.concat(action.payload),
        loadingProducto: false,
        errorProducto: false,
      };

    case OBTENER_PRODUCTOS_EXCEL_ERROR:
      return {
        ...state,
        productos: [],
        errorProducto: true,
        loadingProducto: false,
      };

    case AGREGAR_PRODUCTO:
      return {
        ...state,
        errorProducto: false,
      };
    case AGREGAR_PRODUCTO_EXITO:
      return {
        ...state,
        errorProducto: false,
        productos: [...state.productos, action.payload],
      };

    case AGREGAR_PRODUCTO_ERROR:
      return {
        ...state,
        errorProducto: action.payload,
      };

    case EDITAR_PRODUCTO:
      return {
        ...state,
        errorProducto: null,
      };
    case EDITAR_PRODUCTO_EXITO:
      return {
        ...state,
        errorProducto: null,
        productos: state.productos.map((producto) =>
          producto.Código === action.payload.Código
            ? (producto = action.payload)
            : producto
        ),
      };

    case EDITAR_PRODUCTO_ERROR:
      return {
        ...state,
        errorProducto: true,
      };

    case ELIMINAR_PRODUCTO:
      return {
        ...state,
        errorProducto: null,
      };
    case ELIMINAR_PRODUCTO_EXITO:
      return {
        ...state,
        errorProducto: null,
        productos: state.productos.filter(
          (producto) => producto.Código !== action.payload
        ),
      };

    case ELIMINAR_PRODUCTO_ERROR:
      return {
        ...state,
        errorProducto: true,
      };

    case OBTENER_PRODUCTOS_SOLICITUD:
      return {
        ...state,
        loadingProducto: true,
        errorProducto: false,
      };
    case OBTENER_PRODUCTOS_SOLICITUD_EXITO:
      return {
        ...state,
        productos: action.payload,
        loadingProducto: false,
        errorProducto: false,
      };

    case OBTENER_PRODUCTOS_SOLICITUD_ERROR:
      return {
        ...state,
        loadingProducto: false,
        errorProducto: true,
      };

    case APROBAR_SOLICITUD:
      return {
        ...state,
        error: null,
      };
    case APROBAR_SOLICITUD_EXITO:
      return {
        ...state,
        error: null,
        solicitudes: state.solicitudes.map((solicitud) =>
          solicitud.id_solicitud === action.payload.id_solicitud
            ? (solicitud = action.payload)
            : solicitud
        ),
      };

    case APROBAR_SOLICITUD_ERROR:
      return {
        ...state,
        error: true,
      };


      case RECHAZAR_SOLICITUD:
      return {
        ...state,
        error: null,
      };
    case RECHAZAR_SOLICITUD_EXITO:
      return {
        ...state,
        error: null,
        solicitudes: state.solicitudes.map((solicitud) =>
          solicitud.id_solicitud === action.payload.id_solicitud
            ? (solicitud = action.payload)
            : solicitud
        ),
      };

    case RECHAZAR_SOLICITUD_ERROR:
      return {
        ...state,
        error: true,
      };

    case FINALIZAR_SOLICITUD:
      return {
        ...state,
        error: null,
      };
    case FINALIZAR_SOLICITUD_EXITO:
      return {
        ...state,
        error: null,
        solicitudes: state.solicitudes.map((solicitud) =>
          solicitud.id_solicitud === action.payload.id_solicitud
            ? (solicitud = action.payload)
            : solicitud
        ),
      };

    case FINALIZAR_SOLICITUD_ERROR:
      return {
        ...state,
        error: true,
      };


      case OBTENER_SOLICITUD_IMPRIMIR:
      return {
        ...state,
        error: null,
        loadingSolicitud: true,
      };
    case SOLICITUD_IMPRIMIR_EXITO:
      return {
        ...state,
        error: null,
        solicitud: action.payload,
        loadingSolicitud: false,
      };

    case SOLICITUD_IMPRIMIR_ERROR:
      return {
        ...state,
        error: true,
      };

    default:
      return state;
  }
}
