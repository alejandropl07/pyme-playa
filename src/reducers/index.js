import { combineReducers } from "redux";
import solicitudesReducer from "./solicitudesReducer";
import validacionReducer from "./validacionReducer";
import clientesReducer from "./clientesReducer";

export default  combineReducers ({
    error:  validacionReducer,
    solicitudes:    solicitudesReducer,
    clientes:   clientesReducer,
});