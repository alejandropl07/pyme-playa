import {
  VALIDAR_FORMULARIO,
  VALIDAR_FORMULARIO_EXITO,
  VALIDAR_FORMULARIO_ERROR,
} from "../types";

//Validar formulario
export function validarFormularioAction() {
  return (dispatch) => {
    dispatch(iniciarValidacion());
  };
}

//Iniciar validación
export const iniciarValidacion = () => {
  return {
    type: VALIDAR_FORMULARIO,
  };
};

//Validado con éxito
export const validacionExito = () => {
  return {
    type: VALIDAR_FORMULARIO_EXITO,
  };
};

//Error al validar
export const validacionError = () => {
  return {
    type: VALIDAR_FORMULARIO_ERROR,
  };
};