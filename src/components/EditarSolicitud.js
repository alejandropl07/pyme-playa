import React,   {useEffect, useState,   useRef} from "react";
import { useNavigate, useParams } from "react-router-dom";
import *    as  XLSX from "xlsx";
import Producto from "./Producto";

//Redux
import { validarFormularioAction, validacionExito, validacionError } from "../actions/validacionAction";
import { obtenerSolicitudAction,    editarSolicitudAction,  agregarProductoAction, obtenerProductosExcelAction } from "../actions/solicitudesAction";
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
import Swal from "sweetalert2";

const EditarSolicitud = () => {
    const   fecha_entrega_ref   =   useRef('');
    const   referencia_ref   =   useRef('');
    const   valor_solicitud_ref   =   useRef('');
    const   contrato_solicitud_ref   =   useRef('');

    const   dispatch    =   useDispatch();

    const params =   useParams();
    const id  = params.id;

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
        dispatch(obtenerSolicitudAction(id));
    },[dispatch, id]);

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
            var stop    =   false;
        for (let i = 0; i < productos.length    &&  !stop; i++) {
            for (let j = 0; j < d.length   &&  !stop; j++) {
                if(productos[i].Código ==  d[j].Código){
                    stop    =   true;
                }
                
            }
        }
        if(!stop){
            obtenerProductosExcel(d);
        }
        else{
            Swal.fire({
                title: "Error al cargar los datos",
                text: `Existen productos con el mismo código`,
                position: "center",
                background: "white",
                showConfirmButton: true,
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar',            
              });
        }
        });
    };


    const navigate    =   useNavigate();
    
    const   [Pfx, guardarPfx]   =   useState('');
    const   [Código, guardarCodigo]   =   useState('');
    const   [Cantidad, guardarCantidad]   =   useState('');

  const   editarSolicitud = (solicitud)    => dispatch(editarSolicitudAction(solicitud)) ;
  const   agregarProducto = (producto)    => dispatch(agregarProductoAction(producto)) ;

  const   validarFormulario = ()    => dispatch(validarFormularioAction()) ;
  const   exitoValidacion = ()    => dispatch(validacionExito()) ;
  const   errorValidacion = ()    => dispatch(validacionError()) ;

  //Obtener los datos del state
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

  const error = useSelector((state) =>  state.error.error);
  const loading = useSelector((state) =>  state.solicitudes.loadingSolicitud);
  const solicitud = useSelector((state) =>  state.solicitudes.solicitud);
  const productos =   useSelector((state) =>  state.solicitudes.productos);

  const [id_division, guardarDivision] = useState(solicitud.id_division);
  const [id_sucursal, guardarSucursal] = useState(solicitud.id_sucursal);
  const [id_proveedor, guardarProveedor] = useState(solicitud.id_proveedor);
  const [id_clase_pedido, guardarClasePedido] = useState(solicitud.id_clase_pedido);
  const [id_embarque, guardarEmbarque] = useState(solicitud.id_embarque);
  const [id_cliente, guardarCliente] = useState(solicitud.id_cliente);
  const [id_destino, guardarDestino] = useState(solicitud.id_destino);
  const [id_tipo_producto, guardarTipoProducto] = useState(solicitud.id_tipo_producto);
  const [id_moneda, guardarMoneda] = useState(solicitud.id_moneda);

  if(!solicitud)   return 'Cargando...';
    
  const submitEditarSolicitud =  e   =>{
    e.preventDefault();
    editarSolicitud({
        id_solicitud:   solicitud.id_solicitud,
        id_division ,
        id_sucursal,
        id_proveedor,
        id_clase_pedido,
        id_embarque,
        id_cliente,
        fecha_entrega:  fecha_entrega_ref.current.value,
        descrip_solicitud:  referencia_ref.current.value,
        id_destino,
        id_tipo_producto,
        valor_solicitud:    valor_solicitud_ref.current.value,
        id_moneda,
        contrato_solicitud:     contrato_solicitud_ref.current.value,
        id_comercial:   3,
        productos
  });
 // navigate('/solicitudes/usuario/3')
}


const submitAgregarProducto = (e) => {
    e.preventDefault();
    validarFormulario();

    //Validar
    if (Pfx.trim() === "" || Código.trim() === "" || Cantidad.trim() === "") {
      errorValidacion();
      return;
    }

    //Si pasa la validadacion
    exitoValidacion();

    if(productos.some((producto)    =>  (
        producto.Código  ==  Código 
    ))){
        Swal.fire({
            title: "Error",
            text: `Ya existe un producto con ese código`,
            position: "center",
            background: "white",
            showConfirmButton: true,
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar',            
          });
    }
    else{

    //Crear el nuevo producto
    agregarProducto({
      Pfx,
      Código,
      Cantidad,
    });
    }

    guardarPfx("");
    guardarCodigo("");
    guardarCantidad("");
  };

  return (
    <div className="row justify-content-center mt-5">
        <div className="card">
            <div className="card-body">
            <h2 align="center">Editar solicitud</h2>
                <hr></hr>
                <div className="row">
                <div className="col-md-6">
                <form onSubmit={submitEditarSolicitud}>
                    <div className="form-group  mb-2 row">
                    <div className="col-md-3 mt-1">
                        <label> <strong>División</strong> </label>
                        </div>
                        <div className="col-md-6">
                        <select className="form-select" aria-label="División"   onChange={(e) => guardarDivision(e.target.value)}>
                        {loading  ?
                            <option defaultValue="0"></option>  
                            : 
                            <option defaultValue={solicitud.id_division}>{solicitud.tc_division.descrip_division}</option>
                        }
                            {loadingDivisiones  ?
                            <option value="0">División</option>  
                            : 
                            divisiones.map(    division    => (
                                <option key={division.id_division} value={division.id_division}>{division.descrip_division}</option>
                            ) )}
                        </select>
                        </div>
                    </div>

                     <div className="form-group mb-2 row">
                     <div className="col-md-3 mt-1">
                        <label> <strong>Sucursal</strong> </label>
                        </div>
                        <div className="col-md-6">
                        <select className="form-select" aria-label="Sucursal"   onChange={(e) => guardarSucursal(e.target.value)}>
                        {loading  ?
                            <option defaultValue="0"></option>  
                            :
                            <option defaultValue={solicitud.id_sucursal}>{solicitud.tc_sucursal.descrip_sucursal}</option>
                        }
                        
                            {loadingSucursal  ?
                            <option value="0">Sucursal</option>  
                            : 
                            sucursal.map(    sucursal    => (
                                <option key={sucursal.id_sucursal} value={sucursal.id_sucursal}>{sucursal.descrip_sucursal}</option>
                            ) )}
                        </select>
                        </div>
                    </div>

                    <div className="form-group  mb-2 row">
                    <div className="col-md-3 mt-1">
                        <label> <strong>Proveedor</strong> </label>
                        </div>
                        <div className="col-md-6">
                        <select className="form-select" aria-label="Proveedor"  onChange={(e) => guardarProveedor(e.target.value)}>
                        {loading  ?
                            <option defaultValue="0"></option>  
                            :
                            <option defaultValue={solicitud.id_proveedor}>{solicitud.tc_proveedor.descrip_proveedor}</option>
                        }
                            {loadingProveedores  ?
                            <option value="0">Proveedor</option>  
                            : 
                            proveedores.map(    proveedor    => (
                                <option key={proveedor.id_proveedor} value={proveedor.id_proveedor}>{proveedor.descrip_proveedor}</option>
                            ) )}
                        </select>
                        </div>
                    </div>

                    <div className="form-group  mb-2 row">
                    <div className="col-md-3 mt-1">
                        <label> <strong>Clase de pedido</strong> </label>
                        </div>
                        <div className="col-md-6">
                        <select className="form-select" aria-label="ClasePedido"   onChange={(e) => guardarClasePedido(e.target.value)}>
                        {loading  ?
                            <option defaultValue="0"></option>  
                            :
                            <option defaultValue={solicitud.id_clase_pedido}>{solicitud.tc_clase_pedido.descrip_clase_pedido}</option>
                        }
                            {loadingPedidos  ?
                            <option value="0">Clase pedido</option>  
                            : 
                            clasesPedido.map(    pedido    => (
                                <option key={pedido.id_clase_pedido} value={pedido.id_clase_pedido}>{pedido.descrip_clase_pedido}</option>
                            ) )}
                        </select>
                        </div>
                    </div>

                    <div className="form-group mb-2 row">
                    <div className="col-md-3 mt-1">
                        <label> <strong>Embarque</strong> </label>
                        </div>
                        <div className="col-md-6">
                        <select className="form-select" aria-label="Embarque"   onChange={(e) => guardarEmbarque(e.target.value)}>
                        {loading  ?
                            <option defaultValue="0"></option>  
                            :
                            <option defaultValue={solicitud.id_embarque}>{solicitud.tc_embarque.descrip_embarque}</option>
                        }
                            {loadingEmbarques  ?
                            <option value="0">Embarque</option>  
                            : 
                            embarques.map(    embarque    => (
                                <option key={embarque.id_embarque} value={embarque.id_embarque}>{embarque.descrip_embarque}</option>
                            ) )}
                        </select>
                        </div>
                    </div>

                    <div className="form-group mb-2 row">
                    <div className="col-md-3 mt-1">
                        <label> <strong>Cliente</strong> </label>
                        </div>
                        <div className="col-md-6">
                        <select className="form-select" aria-label="Cliente"    onChange={(e) => guardarCliente(e.target.value)}>
                        {loading  ?
                            <option defaultValue="0"></option>  
                            :
                            <option defaultValue={solicitud.id_cliente}>{solicitud.tc_cliente.descrip_cliente}</option>
                        }
                            {loadingClientes  ?
                            <option value="0">Cliente</option>  
                            : 
                            clientes.map(    cliente    => (
                                <option key={cliente.id_cliente} value={cliente.id_cliente}>{cliente.descrip_cliente}</option>
                            ) )}
                        </select>
                        </div>
                    </div>

                    <div className="form-group mb-2 row">
                    <div className="col-md-3 mt-1">
                        <label> <strong>Fecha de entrega</strong> </label>
                        </div>
                        <div className="col-md-6">
                        <input type="date" 
                        value={solicitud.fecha_entrega}
                        ref={fecha_entrega_ref}/>
                    </div>
                    </div>

                    <div className="form-group mb-2 row">
                    <div className="col-md-3 mt-1">
                        <label> <strong>Referencia</strong> </label>
                        </div>
                        <div className="col-md-6">
                        <input type="text"
                        className="form-control" 
                        defaultValue={solicitud.descrip_solicitud}
                        ref={referencia_ref}/>
                    </div>
                    </div>

                    <div className="form-group mb-2 row">
                    <div className="col-md-3 mt-1">
                        <label> <strong>Destino</strong> </label>
                        </div>
                        <div className="col-md-6">
                        <select className="form-select" aria-label="Destino"   onChange={(e) => guardarDestino(e.target.value)}>
                        {loading  ?
                            <option defaultValue="0"></option>  
                            :
                            <option defaultValue={solicitud.id_destino}>{solicitud.tc_destino.descrip_destino}</option>
                        }
                            {loadingDestinos  ?
                            <option value="0">Destino</option>  
                            : 
                            destinos.map(    destino    => (
                                <option key={destino.id_destino} value={destino.id_destino}>{destino.descrip_destino}</option>
                            ) )}
                        </select>
                        </div>
                    </div>

                    <div className="form-group mb-2 row">
                        <div className="col-md-3 mt-1">
                        <label> <strong>Tipo de producto</strong> </label>
                        </div>
                        <div className="col-md-6">
                        <select className="form-select" aria-label="TipoProducto"   onChange={(e) => guardarTipoProducto(e.target.value)}>
                        {loading  ?
                            <option defaultValue="0"></option>  
                            :
                            <option defaultValue={solicitud.id_tipo_producto}>{solicitud.tc_tipo_producto.descrip_tipo_producto}</option>
                        }
                            {loadingProductos  ?
                            <option value="0">Producto</option>  
                            : 
                            tiposProducto.map(    producto    => (
                                <option key={producto.id_tipo_producto} value={producto.id_tipo_producto}>{producto.descrip_tipo_producto}</option>
                            ) )}
                        </select>
                        </div>
                    </div>

                    <div className="form-group mb-2 row">
                    <div className="col-md-3 mt-1">
                        <label> <strong>Valor</strong> </label>
                        </div>
                        <div className="col-md-6">
                        <input type="text"
                        className="form-control" 
                        defaultValue={solicitud.valor_solicitud}
                        ref={valor_solicitud_ref}/>
                        </div>
                    </div>

                    <div className="form-group mb-2 row">
                    <div className="col-md-3 mt-1">
                        <label> <strong>Moneda</strong> </label>
                        </div>
                        <div className="col-md-6">
                        <select className="form-select" aria-label="Moneda" onChange={(e) => guardarMoneda(e.target.value)}>
                        {loading  ?
                            <option defaultValue="0"></option>  
                            :
                            <option defaultValue={solicitud.id_moneda}>{solicitud.tc_moneda.descrip_moneda}</option>
                        }
                            {loadingMonedas  ?
                            <option value="0">Moneda</option>  
                            : 
                            monedas.map(    moneda    => (
                                <option key={moneda.id_moneda} value={moneda.id_moneda}>{moneda.descrip_moneda}</option>
                            ) )}
                        </select>
                        </div>
                    </div>

                    <div className="form-group mb-2 row">
                    <div className="col-md-3 mt-1">
                        <label> <strong>Contrato</strong> </label>
                        </div>
                        <div className="col-md-6">
                        <input type="text"
                        className="form-control"
                        defaultValue={solicitud.contrato_solicitud} 
                        ref={contrato_solicitud_ref}/>
                    </div>
                    </div>

                    <button type="submit" className="btn btn-primary font-weight-bold d-block w-100  mt-3">Guardar solicitud</button>

               
                </form>
                </div>

                <div className="col-md-6" >
                <h3 align="center">Productos</h3>
                <div className="form-group mb-2">
                        <label> <strong>Importar datos desde un Excel</strong> </label>
                        <input type="file"
                        className="form-control mx-sm-3"
                        onChange={(e)   =>  {
                            const file  =   e.target.files[0];
                            readExcel   (file);
                        }}
                        />
                    </div>

                    <div className="col-md-8">
                <table className="table  mt-2">
                    <thead className="bg-primary table-light">
                    <tr>
                        <th scope="col">Pfx</th>
                        <th scope="col">Código</th>
                        <th scope="col">Cantidad</th>
                    </tr>
                    </thead>
                
                    <tbody>
                        {productos.map(    producto    => (
                            <Producto
                            key={producto.Código}
                            producto={producto}
                        />
                        ))} 
                    </tbody> 
                </table>
                </div>
                
               

                <form className="row g-2"   onSubmit={submitAgregarProducto}>
                <div className="col-md-2">
                    <label className="visually-hidden">Pfx</label>
                    <input type="text" required className="form-control" placeholder="Pfx"   value={Pfx}    onChange={e =>  guardarPfx(e.target.value)}/>
                </div>
                <div className="col-md-2">
                    <label className="visually-hidden">Código</label>
                    <input type="text" required className="form-control" placeholder="Código"    value={Código}     onChange={e =>  guardarCodigo(e.target.value)}/>
                </div>
                <div className="col-md-3">
                    <label className="visually-hidden">Cantidad</label>
                    <input type="number" required min= "1" className="form-control" placeholder="Cantidad"    value={Cantidad}     onChange={e =>  guardarCantidad(e.target.value)}/>
                </div>
                <div className="col-md-4">
                    <button type="submit" required className="btn btn-primary mb-3">Agregar producto</button>
                </div>
                </form>
                </div>
                </div>

                {error  ? <div  className="font-weight-bold alert alert-danger text-center mt-4">Campos vacíos</div>  :null}

            </div>
        </div>
</div>

  );
};

export default EditarSolicitud;