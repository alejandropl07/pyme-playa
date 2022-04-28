import React,   {useEffect, useState} from "react";
import *    as  XLSX from "xlsx";

//Redux
import { agregarProductoAction, obtenerProductosExcelAction } from "../actions/productosAction";
import { validarFormularioAction, validacionExito, validacionError } from "../actions/validacionAction";
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
import { Link } from "react-router-dom";

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
    },[dispatch]);

    const   [items, setItems]   =   useState([]);
    const   obtenerProductosExcel = (productosExcel)    => dispatch(obtenerProductosExcelAction(productosExcel)) ;

    const readExcel   =   (file)  =>  {
        const promise =   new Promise ((resolve,  reject) =>  {
            const fileReader    =   new FileReader();
            fileReader.readAsArrayBuffer(file)
  
            fileReader.onload =   (e)  =>  {
                const bufferArray =   e.target.result;
  
                const wb  =   XLSX.read(bufferArray,  {type:  'buffer'});
  
                const wsname  =   wb.SheetNames[0];
  
                const ws  =   wb.Sheets[wsname];
  
                const data    =   XLSX.utils.sheet_to_json(ws);
  
                resolve(data);
            };
            fileReader.onerror    =   (error) =>  {
                reject(error);
            };
        });
        promise.then((d)  =>  {
            console.log(d);
            setItems(d);
            obtenerProductosExcel(d);
        });
    };

    const   [id_division, guardarDivision]   =   useState('');
    const   [id_sucursal, guardarSucursal]   =   useState('');
    const   [id_proveedor, guardarProveedor]   =   useState('');
    const   [id_clase_pedido, guardarClasePedido]   =   useState('');
    const   [id_embarque, guardarEmbarque]   =   useState('');
    const   [id_cliente, guardarCliente]   =   useState('');
    const   [fecha_entrega, guardarFechaEntrega]   =   useState('');
    const   [referencia, guardarReferencia]   =   useState('');
    const   [id_destino, guardarDestino]   =   useState('');
    const   [id_tipo_producto, guardarTipoProducto]   =   useState('');
    const   [valor_solicitud, guardarValor]   =   useState('');
    const   [id_moneda, guardarMoneda]   =   useState('');
    const   [contrato_solicitud, guardarContrato]   =   useState('');

    const   [Pfx, guardarPfx]   =   useState('');
    const   [Código, guardarCodigo]   =   useState('');
    const   [Cantidad, guardarCantidad]   =   useState('');

  const   agregarSolicitud = (solicitud)    => dispatch(agregarSolicitudAction(solicitud)) ;
  const   agregarProducto = (producto)    => dispatch(agregarProductoAction(producto)) ;

  const   validarFormulario = ()    => dispatch(validarFormularioAction()) ;
  const   exitoValidacion = ()    => dispatch(validacionExito()) ;
  const   errorValidacion = ()    => dispatch(validacionError()) ;

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

  const productos =   useSelector((state) =>  state.productosSolicitud.productos);
    
  const submitCrearSolicitud =  e   =>{
    e.preventDefault();
    agregarSolicitud({
        id_division,
        id_sucursal,
        id_proveedor,
        id_clase_pedido,
        id_embarque,
        id_cliente,
        fecha_entrega,
        descrip_solicitud:  referencia,
        id_destino,
        id_tipo_producto,
        valor_solicitud,
        id_moneda,
        contrato_solicitud,
        fecha_finalizada:   fecha_entrega,
        fecha_aprobada:   fecha_entrega,
        fecha_revisada:   fecha_entrega,
        id_comercial:   3,
        productos
  });
}

const submitAgregarProducto =  e   =>{
    e.preventDefault();
    validarFormulario();

    //Validar
    if(Pfx.trim() === ''  ||  Código.trim()===''    ||  Cantidad.trim()===''){
        errorValidacion();
        return;
    }
    
    //Si pasa la validadacion
    exitoValidacion();

    //Crear el nuevo producto
    agregarProducto({
        Pfx,
        Código,
        Cantidad
  });
}

  return (
    <div className="row justify-content-center mt-5">
    <div className="col-md-8">
        <div className="card">
            <div className="card-body">
                <form onSubmit={submitCrearSolicitud}>
                    <div className="form-group  mb-2">
                        <label><strong> División </strong> </label>
                        <select className="form-select" aria-label="División"   onChange={e =>  guardarDivision(e.target.value)}>
                            <option defaultValue>Seleccione la división</option>
                            {loadingDivisiones  ?
                            <option value="0">División</option>  
                            : 
                            divisiones.map(    division    => (
                                <option key={division.id_division} value={division.id_division}>{division.descrip_division}</option>
                            ) )}
                        </select>
                    </div>

                    <div className="form-group  mb-2">
                        <label> <strong>Sucursal</strong> </label>
                        <select className="form-select" aria-label="Sucursal"   onChange={e =>  guardarSucursal(e.target.value)}>
                            <option defaultValue>Seleccione la sucursal</option>
                            {loadingSucursal  ?
                            <option value="0">Sucursal</option>  
                            : 
                            sucursal.map(    sucursal    => (
                                <option key={sucursal.id_sucursal} value={sucursal.id_sucursal}>{sucursal.descrip_sucursal}</option>
                            ) )}
                        </select>
                    </div>

                    <div className="form-group mb-2">
                        <label><strong>Proveedor</strong></label>
                        <select className="form-select" aria-label="Proveedor"  onChange={e =>  guardarProveedor(e.target.value)}>
                            <option defaultValue>Seleccione el proveedor</option>
                            {loadingProveedores  ?
                            <option value="0">Proveedor</option>  
                            : 
                            proveedores.map(    proveedor    => (
                                <option key={proveedor.id_proveedor} value={proveedor.id_proveedor}>{proveedor.descrip_proveedor}</option>
                            ) )}
                        </select>
                    </div>

                    <div className="form-group mb-2">
                        <label><strong>Clase de pedido</strong></label>
                        <select className="form-select" aria-label="ClasePedido"    onChange={e =>  guardarClasePedido(e.target.value)}>
                            <option defaultValue>Seleccione la clase de pedido</option>
                            {loadingPedidos  ?
                            <option value="0">Clase pedido</option>  
                            : 
                            clasesPedido.map(    pedido    => (
                                <option key={pedido.id_clase_pedido} value={pedido.id_clase_pedido}>{pedido.descrip_clase_pedido}</option>
                            ) )}
                        </select>
                    </div>

                    <div className="form-group mb-2">
                        <label><strong>Embarque</strong></label>
                        <select className="form-select" aria-label="Embarque"   onChange={e =>  guardarEmbarque(e.target.value)}>
                            <option defaultValue>Seleccione el embarque</option>
                            {loadingEmbarques  ?
                            <option value="0">Embarque</option>  
                            : 
                            embarques.map(    embarque    => (
                                <option key={embarque.id_embarque} value={embarque.id_embarque}>{embarque.descrip_embarque}</option>
                            ) )}
                        </select>
                    </div>

                    <div className="form-group mb-2">
                        <label><strong>Cliente</strong></label>
                        <select className="form-select" aria-label="Cliente"    onChange={e =>  guardarCliente(e.target.value)}>
                            <option defaultValue>Seleccione el cliente</option>
                            {loadingClientes  ?
                            <option value="0">Cliente</option>  
                            : 
                            clientes.map(    cliente    => (
                                <option key={cliente.id_cliente} value={cliente.id_cliente}>{cliente.descrip_cliente}</option>
                            ) )}
                        </select>
                        <Link   to={`/crearcliente`} className="btn btn-primary mt-3   mb-2">Crear cliente</Link>
                    </div>

                    <div className="form-group mb-2">
                        <label><strong>Fecha de entrega</strong></label>
                        <input type="date"
                        onChange={e =>  guardarFechaEntrega(e.target.value)}/>
                    </div>

                    <div className="form-group mb-2">
                        <label> <strong>Referencia</strong> </label>
                        <input type="text"
                        className="form-control mx-sm-3" 
                        onChange={e =>  guardarReferencia(e.target.value)}/>
                    </div>

                    <div className="form-group mb-2">
                        <label><strong>Destino</strong></label>
                        <select className="form-select" aria-label="Destino"    onChange={e =>  guardarDestino(e.target.value)}>
                            <option defaultValue>Seleccione el destino</option>
                            {loadingDestinos  ?
                            <option value="0">Destino</option>  
                            : 
                            destinos.map(    destino    => (
                                <option key={destino.id_destino} value={destino.id_destino}>{destino.descrip_destino}</option>
                            ) )}
                        </select>
                    </div>

                    <div className="form-group mb-2">
                        <label><strong>Tipo de producto</strong></label>
                        <select className="form-select" aria-label="TipoProducto"   onChange={e =>  guardarTipoProducto(e.target.value)}>
                            <option defaultValue>Seleccione el tipo de producto</option>
                            {loadingProductos  ?
                            <option value="0">Producto</option>  
                            : 
                            tiposProducto.map(    producto    => (
                                <option key={producto.id_tipo_producto} value={producto.id_tipo_producto}>{producto.descrip_tipo_producto}</option>
                            ) )}
                        </select>
                    </div>

                    <div className="form-group mb-2">
                        <label><strong>Valor</strong></label>
                        <input type="text"
                        className="form-control mx-sm-3" 
                        onChange={e =>  guardarValor(e.target.value)}/>
                    </div>

                    <div className="form-group mb-2">
                        <label><strong>Moneda</strong></label>
                        <select className="form-select" aria-label="Moneda" onChange={e =>  guardarMoneda(e.target.value)}>
                            <option defaultValue>Seleccione el tipo de moneda</option>
                            {loadingMonedas  ?
                            <option value="0">Moneda</option>  
                            : 
                            monedas.map(    moneda    => (
                                <option key={moneda.id_moneda} value={moneda.id_moneda}>{moneda.descrip_moneda}</option>
                            ) )}
                        </select>
                    </div>

                    <div className="form-group mb-2">
                        <label><strong>Contrato</strong></label>
                        <input type="text"
                        className="form-control mx-sm-3" 
                        onChange={e =>  guardarContrato(e.target.value)}/>
                    </div>

                    <div className="form-group mb-2">
                        <label><strong>Importar datos desde un Excel</strong></label>
                        <input type="file"
                        className="form-control mx-sm-3"
                        onChange={(e)   =>  {
                            const file  =   e.target.files[0];
                            readExcel   (file);
                        }}
                        />
                    </div>
          
                <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100  mt-3">Guardar</button>
                </form>
                
                <Link   to={`/solicitudes/usuario/3`} className="btn btn-primary mt-3   mb-2">Ver todas las solicitudes</Link>
            
                <div    className="mt-5">
                <h3>Productos</h3>
                <table className="table table-striped   mt-2">
                    <thead className="bg-primary table-light">
                    <tr>
                        <th scope="col">Pfx</th>
                        <th scope="col">Código</th>
                        <th scope="col">Cantidad</th>
                    </tr>
                    </thead>
                
                    <tbody>
                        {productos.map(    item    => (
                            <tr key={item.Pfx}>
                                <td>{item.Pfx}</td>
                                <td>{item.Código}</td>
                                <td>{item.Cantidad}</td>
                            </tr>
                        ))} 
                    </tbody> 
                </table>
                </div>

                <form className="row g-4"   onSubmit={submitAgregarProducto}>
                <div className="col-auto">
                    <label className="visually-hidden">Pfx</label>
                    <input type="text" className="form-control" placeholder="Pfx"   value={Pfx}    onChange={e =>  guardarPfx(e.target.value)}/>
                </div>
                <div className="col-auto">
                    <label className="visually-hidden">Código</label>
                    <input type="text" className="form-control" placeholder="Código"    value={Código}     onChange={e =>  guardarCodigo(e.target.value)}/>
                </div>
                <div className="col-auto">
                    <label className="visually-hidden">Cantidad</label>
                    <input type="number" className="form-control" placeholder="Cantidad"    value={Cantidad}     onChange={e =>  guardarCantidad(e.target.value)}/>
                </div>
                <div className="col-auto">
                    <button type="submit" className="btn btn-primary mb-3">Agregar producto</button>
                </div>
                </form>

                {error  ? <div  className="font-weight-bold alert alert-danger text-center mt-4">Campos vacíos</div>  :null}

            </div>
        </div>
    </div>
</div>

  );
};

export default CrearSolicitud;