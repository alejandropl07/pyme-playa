import {
    COMENZAR_CREAR_CLIENTE,
    CREAR_CLIENTE_EXITO,
    CREAR_CLIENTE_ERROR,
    OBTENER_CLIENTES,
    OBTENER_CLIENTES_EXITO,
    OBTENER_CLIENTES_ERROR,
    FINALIZAR_CREAR_CLIENTE,
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
            dispatch(obtenerClientesAction())
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

export  const crearClienteFinal =   ()  =>  ({
    type:   FINALIZAR_CREAR_CLIENTE,
});


export  function obtenerClientesAction() {
    return(dispatch)    =>  {
        dispatch(obtenerClientes());

        //Consultar la API
        clienteAxios.get('/clientes')
        .then(respuesta =>  {
            dispatch(obtenerClientesExito(respuesta.data))
        })
        .catch(error    =>{
            dispatch(obtenerClientesError())
        })
        
    }
}

export  const obtenerClientes =   ()  =>  ({
    type:   OBTENER_CLIENTES,
});

export  const obtenerClientesExito =   (clientes)  =>  ({
    type:   OBTENER_CLIENTES_EXITO,
    payload:    clientes,
});

export  const obtenerClientesError =   ()  =>  ({
    type:   OBTENER_CLIENTES_ERROR,
});