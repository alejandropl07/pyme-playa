import { combineReducers } from "redux";
import solicitudesReducer from "./solicitudesReducer";
import validacionReducer from "./validacionReducer";
import clientesReducer from "./clientesReducer";
import divisionReducer from "./divisionReducer";
import sucursalesReducer from "./sucursalesReducer";
import proveedoresReducer from "./proveedoresReducer";
import clasePedidoReducer from "./clasePedidoReducer";
import embarquesReducer from "./embarquesReducer";
import destinosReducer from "./destinosReducer";
import tipoProductoReducer from "./tipoProductoReducer";
import monedasReducer from "./monedasReducer";
import productosReducer from "./productosReducer";

export default  combineReducers ({
    error:  validacionReducer,
    solicitudes:    solicitudesReducer,
    clientes:   clientesReducer,
    divisiones: divisionReducer,
    sucursales: sucursalesReducer,
    proveedores:    proveedoresReducer,
    pedidos:    clasePedidoReducer,
    embarques:  embarquesReducer,
    destinos:   destinosReducer,
    productos:  tipoProductoReducer,
    monedas:  monedasReducer,
    productosSolicitud: productosReducer,
});