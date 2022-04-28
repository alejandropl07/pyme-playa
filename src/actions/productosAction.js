import {
    OBTENER_PRODUCTOS_EXCEL,
    OBTENER_PRODUCTOS_EXCEL_EXITO,
    OBTENER_PRODUCTOS_EXCEL_ERROR,
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    ELIMINAR_PRODUCTO,
    ELIMINAR_PRODUCTO_EXITO,
    ELIMINAR_PRODUCTO_ERROR,
  } from "../types";

export  function obtenerProductosExcelAction(productosExcel) {
    return(dispatch)    =>  {
        dispatch(obtenerProductosExcel());

        try {
            dispatch(obtenerProductosExcelExito(productosExcel))
        } catch (error) {
            dispatch(obtenerProductosExcelError())
        }        
    }
}

export  const obtenerProductosExcel =   ()  =>  ({
    type:   OBTENER_PRODUCTOS_EXCEL,
});

export  const obtenerProductosExcelExito =   (productosExcel)  =>  ({
    type:   OBTENER_PRODUCTOS_EXCEL_EXITO,
    payload:    productosExcel,
});

export  const obtenerProductosExcelError =   ()  =>  ({
    type:   OBTENER_PRODUCTOS_EXCEL_ERROR,
});


// AGREGAR PRODUCTO AL STATE
export  function agregarProductoAction(producto) {
    return(dispatch)    =>  {
        dispatch(agregarProductoComienzo());
        
        try {
            dispatch(agregarProductoExito(producto))
        } catch (error) {
            dispatch(agregarProductoError(error))
        }        
    }
}

export  const agregarProductoComienzo =   ()  =>  ({
    type:   AGREGAR_PRODUCTO,
});

export  const agregarProductoExito =   (producto)  =>  ({
    type:   AGREGAR_PRODUCTO_EXITO,
    payload:    producto
});

export  const agregarProductoError =   (error)  =>  ({
    type:   AGREGAR_PRODUCTO_ERROR,
    payload:    error
});


export  function eliminarProductoAction(id) {
    return(dispatch)    =>  {
        dispatch(eliminarProducto());

        try {
            dispatch(eliminarProductoExito(id))
        } catch (error) {
            dispatch(eliminarProductoError())
        }
    }
}

export  const eliminarProducto =   ()  =>  ({
    type:   ELIMINAR_PRODUCTO,
});

export  const eliminarProductoExito =   (id)  =>  ({
    type:   ELIMINAR_PRODUCTO_EXITO,
    payload:    id,
});

export  const eliminarProductoError =   ()  =>  ({
    type:   ELIMINAR_PRODUCTO_ERROR,
});