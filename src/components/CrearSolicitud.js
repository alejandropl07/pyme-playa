import React from "react";

//Redux
import { agregarSolicitudAction } from "../actions/solicitudesAction";
import { useDispatch, useSelector } from "react-redux";

const CrearSolicitud = () => {

  //Validacion
  const dispatch  = useDispatch();
  const   agregarSolicitud = (solicitud)    => dispatch(agregarSolicitudAction(solicitud)) ;

  //Obtener los datos del state
  const error = useSelector((state) =>  state.error.error);

  const submitCrearSolicitud =  e   =>{
    agregarSolicitud({
  });
}

  return (
    <div className="row justify-content-center mt-5">
    <div className="col-md-8">
        <div className="card">
            <div className="card-body">
                <form onSubmit={submitCrearSolicitud}>
                    <div className="form-group">
                        <label>División</label>
                        <select className="form-select" aria-label="División">
                            <option defaultValue>Seleccione la división</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Sucursal</label>
                        <select className="form-select" aria-label="Sucursal">
                            <option defaultValue>Seleccione la sucursal</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Proveedor</label>
                        <select className="form-select" aria-label="Proveedor">
                            <option defaultValue>Seleccione el proveedor</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Clase de pedido</label>
                        <select className="form-select" aria-label="ClasePedido">
                            <option defaultValue>Seleccione la clase de pedido</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Embarque</label>
                        <select className="form-select" aria-label="Embarque">
                            <option defaultValue>Seleccione el embarque</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Cliente</label>
                        <select className="form-select" aria-label="Cliente">
                            <option defaultValue>Seleccione el cliente</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Fecha de entrega</label>
                        <input type="date" />
                    </div>

                    <div className="form-group">
                        <label>Referencia</label>
                        <input type="text"
                        className="form-control mx-sm-3" />
                    </div>

                    <div className="form-group">
                        <label>Destino</label>
                        <select className="form-select" aria-label="Destino">
                            <option defaultValue>Seleccione el destino</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Tipo de producto</label>
                        <select className="form-select" aria-label="TipoProducto">
                            <option defaultValue>Seleccione el tipo de producto</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Valor</label>
                        <input type="text"
                        className="form-control mx-sm-3" />
                    </div>

                    <div className="form-group">
                        <label>Moneda</label>
                        <select className="form-select" aria-label="Moneda">
                            <option defaultValue>Seleccione el tipo de moneda</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Contrato</label>
                        <input type="text"
                        className="form-control mx-sm-3" />
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

export default CrearSolicitud;