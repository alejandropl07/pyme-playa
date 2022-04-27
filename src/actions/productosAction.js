import {
    OBTENER_PRODUCTOS_EXCEL,
    OBTENER_PRODUCTOS_EXCEL_EXITO,
    OBTENER_PRODUCTOS_EXCEL_ERROR,
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