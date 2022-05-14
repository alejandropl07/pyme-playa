import {
  VALIDAR_FORMULARIO,
  VALIDAR_FORMULARIO_EXITO,
  VALIDAR_FORMULARIO_ERROR,
  VALIDAR_CLIENTE,
  VALIDAR_CLIENTE_EXITO,
  VALIDAR_CLIENTE_ERROR,
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


//Validar cliente
export function validarClienteAction() {
  return (dispatch) => {
    dispatch(iniciarValidacionCliente());
  };
}

//Iniciar validación cliente
export const iniciarValidacionCliente = () => {
  return {
    type: VALIDAR_CLIENTE,
  };
};

//Validado cliente con éxito
export const validacionClienteExito = () => {
  return {
    type: VALIDAR_CLIENTE_EXITO,
  };
};

//Error al validar cliente
export const validacionClienteError = () => {
  return {
    type: VALIDAR_CLIENTE_ERROR,
  };
};