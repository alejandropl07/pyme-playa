import {
    COMENZAR_CREAR_CLIENTE,
    CREAR_CLIENTE_EXITO,
    CREAR_CLIENTE_ERROR,
  } from "../types";

  import clienteAxios from "../config/axios";
  import Swal from "sweetalert2";

export  function crearClienteAction(cliente) {
    return(dispatch)    =>  {
        dispatch(crearClienteComienzo());

        //Insertar en la API
        clienteAxios.post('/clientes', cliente)
        .then(respuesta =>  {
            dispatch(crearClienteExito(cliente))
            Swal.fire({
                title: "Crear cliente",
                text: `El cliente ha sido creado`,
                position: "center",
                background: "white",
                showConfirmButton: true,
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar',            
              });
        })
        .catch(error    =>{
            dispatch(crearClienteError(error))
            Swal.fire({
                title: "Error",
                text: `El cliente ya se encuentra creado`,
                position: "center",
                background: "white",
                showConfirmButton: true,
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar',            
              });
        })
        
    }
}

export  const crearClienteComienzo =   ()  =>  ({
    type:   COMENZAR_CREAR_CLIENTE,
});

export  const crearClienteExito =   (cliente)  =>  ({
    type:   CREAR_CLIENTE_EXITO,
    payload:    cliente
});

export  const crearClienteError =   (error)  =>  ({
    type:   CREAR_CLIENTE_ERROR,
    payload:    error
});