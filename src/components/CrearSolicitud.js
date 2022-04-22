import React,   {useEffect} from "react";

//Redux
import { agregarSolicitudAction } from "../actions/solicitudesAction";
import { obtenerDivisionAction } from "../actions/divisionAction";
import { obtenerSucursalesAction } from "../actions/sucursalesAction";
import { obtenerProveedoresAction } from "../actions/proveedoresAction";
import { obtenerPedidosAction } from "../actions/clasePedidoAction";
import { obtenerEmbarquesAction } from "../actions/embarquesAction";
import { obtenerClientesAction } from "../actions/clientesAction";
import { obtenerDestinosAction } from "../actions/destinosAction";
import { obtenerProductosAction } from "../actions/tipoProductoAction";
import { obtenerMonedasAction } from "../actions/monedasAction";
import { useDispatch, useSelector } from "react-redux";

const CrearSolicitud = () => {
    const   dispatch    =   useDispatch();
    useEffect(()  =>  {
        const   obtenerDivision = ()    => dispatch(obtenerDivisionAction()) ;
        const   obtenerSucursales = ()    => dispatch(obtenerSucursalesAction()) ;
        const   obtenerProveedores = ()    => dispatch(obtenerProveedoresAction()) ;
        const   obtenerPedidos = ()    => dispatch(obtenerPedidosAction()) ;
        const   obtenerEmbarques = ()    => dispatch(obtenerEmbarquesAction()) ;
        const   obtenerClientes = ()    => dispatch(obtenerClientesAction()) ;
        const   obtenerDestinos = ()    => dispatch(obtenerDestinosAction()) ;
        const   obtenerProductos = ()    => dispatch(obtenerProductosAction()) ;
        const   obtenerMonedas = ()    => dispatch(obtenerMonedasAction()) ;
        obtenerDivision();
        obtenerSucursales();
        obtenerProveedores();
        obtenerPedidos();
        obtenerEmbarques();
        obtenerClientes();
        obtenerDestinos();
        obtenerProductos();
        obtenerMonedas();
    },[]);

  const   agregarSolicitud = (solicitud)    => dispatch(agregarSolicitudAction(solicitud)) ;

  //Obtener los datos del state
  const error = useSelector((state) =>  state.error.error);
  const loadingDivisiones =   useSelector((state) =>  state.divisiones.loading);
  const {divisiones} =   useSelector((state) =>  state.divisiones.divisiones);
  const loadingSucursal =   useSelector((state) =>  state.sucursales.loading);
  const {sucursal} =   useSelector((state) =>  state.sucursales.sucursales);
  const loadingProveedores =   useSelector((state) =>  state.proveedores.loading);
  const {proveedores} =   useSelector((state) =>  state.proveedores.proveedores);
  const loadingPedidos =   useSelector((state) =>  state.pedidos.loading);
  const {clasesPedido} =   useSelector((state) =>  state.pedidos.pedidos);
  const loadingEmbarques =   useSelector((state) =>  state.embarques.loading);
  const {embarques} =   useSelector((state) =>  state.embarques.embarques);
  const loadingClientes =   useSelector((state) =>  state.clientes.loading);
  const {clientes} =   useSelector((state) =>  state.clientes.clientes);
  const loadingDestinos =   useSelector((state) =>  state.destinos.loading);
  const {destinos} =   useSelector((state) =>  state.destinos.destinos);
  const loadingProductos =   useSelector((state) =>  state.productos.loading);
  const {tiposProducto} =   useSelector((state) =>  state.productos.productos);
  const loadingMonedas =   useSelector((state) =>  state.monedas.loading);
  const {monedas} =   useSelector((state) =>  state.monedas.monedas);
    
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
                            {loadingDivisiones  ?
                            <option value="0">División</option>  
                            : 
                            divisiones.map(    division    => (
                                <option value={division.id_division}>{division.descrip_division}</option>
                            ) )}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Sucursal</label>
                        <select className="form-select" aria-label="Sucursal">
                            <option defaultValue>Seleccione la sucursal</option>
                            {loadingSucursal  ?
                            <option value="0">Sucursal</option>  
                            : 
                            sucursal.map(    sucursal    => (
                                <option value={sucursal.id_sucursal}>{sucursal.descrip_sucursal}</option>
                            ) )}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Proveedor</label>
                        <select className="form-select" aria-label="Proveedor">
                            <option defaultValue>Seleccione el proveedor</option>
                            {loadingProveedores  ?
                            <option value="0">Proveedor</option>  
                            : 
                            proveedores.map(    proveedor    => (
                                <option value={proveedor.id_proveedor}>{proveedor.descrip_proveedor}</option>
                            ) )}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Clase de pedido</label>
                        <select className="form-select" aria-label="ClasePedido">
                            <option defaultValue>Seleccione la clase de pedido</option>
                            {loadingPedidos  ?
                            <option value="0">Clase pedido</option>  
                            : 
                            clasesPedido.map(    pedido    => (
                                <option value={pedido.id_clase_pedido}>{pedido.descrip_clase_pedido}</option>
                            ) )}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Embarque</label>
                        <select className="form-select" aria-label="Embarque">
                            <option defaultValue>Seleccione el embarque</option>
                            {loadingEmbarques  ?
                            <option value="0">Embarque</option>  
                            : 
                            embarques.map(    embarque    => (
                                <option value={embarque.id_embarque}>{embarque.descrip_embarque}</option>
                            ) )}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Cliente</label>
                        <select className="form-select" aria-label="Cliente">
                            <option defaultValue>Seleccione el cliente</option>
                            {loadingClientes  ?
                            <option value="0">Cliente</option>  
                            : 
                            clientes.map(    cliente    => (
                                <option value={cliente.id_cliente}>{cliente.descrip_cliente}</option>
                            ) )}
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
                            {loadingDestinos  ?
                            <option value="0">Destino</option>  
                            : 
                            destinos.map(    destino    => (
                                <option value={destino.id_destino}>{destino.descrip_destino}</option>
                            ) )}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Tipo de producto</label>
                        <select className="form-select" aria-label="TipoProducto">
                            <option defaultValue>Seleccione el tipo de producto</option>
                            {loadingProductos  ?
                            <option value="0">Producto</option>  
                            : 
                            tiposProducto.map(    producto    => (
                                <option value={producto.id_tipo_producto}>{producto.descrip_tipo_producto}</option>
                            ) )}
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
                            {loadingMonedas  ?
                            <option value="0">Moneda</option>  
                            : 
                            monedas.map(    moneda    => (
                                <option value={moneda.id_moneda}>{moneda.descrip_moneda}</option>
                            ) )}
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