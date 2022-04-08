import { combineReducers } from "redux";
import solicitudesReducer from "./solicitudesReducer";
import validacionReducer from "./validacionReducer";

export default  combineReducers ({
    error:  validacionReducer,
    solicitudes:    solicitudesReducer,
});