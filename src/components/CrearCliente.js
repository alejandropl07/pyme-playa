import React,   { useState } from "react";

//Redux
import { validarFormularioAction, validacionExito, validacionError } from "../actions/validacionAction";
import { crearClienteAction } from "../actions/clientesAction";
import { useDispatch, useSelector } from "react-redux";

const CrearCliente = () => {
  const [descrip_cliente, guardar_descrip]  = useState('');

  //Validacion
  const dispatch  = useDispatch();
  const   validarFormulario = ()    => dispatch(validarFormularioAction()) ;
  const   exitoValidacion = ()    => dispatch(validacionExito()) ;
  const   errorValidacion = ()    => dispatch(validacionError()) ;
  const   agregarCliente  =   (cliente)  =>  dispatch(crearClienteAction(cliente));

  //Obtener los datos del state
  const error = useSelector((state) =>  state.error.error);

  const submitCrearCliente =  e   =>{
    e.preventDefault();

    //Validar
    validarFormulario();
    if(descrip_cliente.trim() === ''){
      errorValidacion();
      return;
  }

    //Si pasa la validadacion
    exitoValidacion();

    agregarCliente({
      descrip_cliente
  });

}

  return (
    <div className="row justify-content-center mt-5">
    <div className="col-md-8">
        <div className="card">
            <div className="card-body">
                <form onSubmit={submitCrearCliente}>
                    <div className="form-group">
                        <label>Descipción del cliente</label>
                        <input type="text"
                        className="form-control mx-sm-3"
                        value={descrip_cliente}
                        onChange={e=>guardar_descrip(e.target.value)} 
                        />
                    </div>
          
                <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100  mt-3">Guardar</button>
                </form>

                {error  ? <div  className="font-weight-bold alert alert-danger text-center mt-4">Campos vacíos</div>  :null}

            </div>
        </div>
    </div>
</div>

  );
};

export default CrearCliente;