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
});