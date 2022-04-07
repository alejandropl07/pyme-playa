import { combineReducers } from "redux";
import validacionReducer from "./validacionReducer";

export default  combineReducers ({
    error:  validacionReducer,
});