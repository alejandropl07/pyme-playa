import React,   {useEffect, useState,   useRef} from "react";
import { useParams } from "react-router-dom";
import *    as  XLSX from "xlsx";

//Redux
import { obtenerSolicitudAction,    editarSolicitudAction } from "../actions/solicitudesAction";
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

const EditarSolicitud = () => {
    const   id_division_ref   =   useRef('');
    const   id_sucursal_ref  =   useRef('');
    const   id_proveedor_ref   =   useRef('');
    const   id_clase_pedido_ref   =   useRef('');
    const   id_embarque_ref   =   useRef('');
    const   id_cliente_ref   =   useRef('');
    const   fecha_entrega_ref   =   useRef('');
    const   referencia_ref   =   useRef('');
    const   id_destino_ref    =   useRef('');
    const   id_tipo_producto_ref   =   useRef('');
    const   valor_solicitud_ref   =   useRef('');
    const   id_moneda_ref   =   useRef('');
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

    const   [items, setItems]   =   useState([]);

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
        });
    };

  const   editarSolicitud = (solicitud)    => dispatch(editarSolicitudAction(solicitud)) ;

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

  if(!solicitud)   return 'Cargando...';
    
  const submitEditarSolicitud =  e   =>{
    e.preventDefault();
    editarSolicitud({
        id_division:   id_division_ref.current.value ,
        id_sucursal:    id_sucursal_ref.current.value,
        id_proveedor:   id_proveedor_ref.current.value,
        id_clase_pedido:    id_clase_pedido_ref.current.value,
        id_embarque:    id_embarque_ref.current.value,
        id_cliente:     id_cliente_ref.current.value,
        fecha_entrega:  fecha_entrega_ref.current.value,
        descrip_solicitud:  referencia_ref.current.value,
        id_destino:     id_destino_ref.current.value,
        id_tipo_producto:   id_tipo_producto_ref.current.value,
        valor_solicitud:    valor_solicitud_ref.current.value,
        id_moneda:      id_moneda_ref.current.value,
        contrato_solicitud:     contrato_solicitud_ref.current.value,
        fecha_finalizada:   fecha_entrega_ref.current.value,
        fecha_aprobada:   fecha_entrega_ref.current.value,
        fecha_revisada:   fecha_entrega_ref.current.value,
        id_comercial:   3,
  });
}

  return (
    <div className="row justify-content-center mt-5">
    <div className="col-md-8">
        <div className="card">
            <div className="card-body">
                <form onSubmit={submitEditarSolicitud}>
                    <div className="form-group">
                        <label> <strong>División</strong> </label>
                        <select className="form-select" aria-label="División"   ref={id_division_ref}>
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

                     <div className="form-group">
                        <label> <strong>Sucursal</strong> </label>
                        <select className="form-select" aria-label="Sucursal"   ref={id_sucursal_ref}>
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

                    <div className="form-group">
                        <label> <strong>Proveedor</strong> </label>
                        <select className="form-select" aria-label="Proveedor"  ref={id_proveedor_ref}>
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

                    <div className="form-group">
                        <label> <strong>Clase de pedido</strong> </label>
                        <select className="form-select" aria-label="ClasePedido"    ref={id_clase_pedido_ref}>
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

                    <div className="form-group">
                        <label> <strong>Embarque</strong> </label>
                        <select className="form-select" aria-label="Embarque"   ref={id_embarque_ref}>
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

                    <div className="form-group">
                        <label> <strong>Cliente</strong> </label>
                        <select className="form-select" aria-label="Cliente"    ref={id_cliente_ref}>
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

                    <div className="form-group">
                        <label> <strong>Fecha de entrega</strong> </label>
                        <input type="date" 
                        value={solicitud.fecha_entrega}
                        ref={fecha_entrega_ref}/>
                    </div>

                    <div className="form-group">
                        <label> <strong>Referencia</strong> </label>
                        <input type="text"
                        className="form-control mx-sm-3" 
                        defaultValue={solicitud.descrip_solicitud}
                        ref={referencia_ref}/>
                    </div>

                    <div className="form-group">
                        <label> <strong>Destino</strong> </label>
                        <select className="form-select" aria-label="Destino"    ref={id_destino_ref}>
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

                    <div className="form-group">
                        <label> <strong>Tipo de producto</strong> </label>
                        <select className="form-select" aria-label="TipoProducto"   ref={id_tipo_producto_ref}>
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

                    <div className="form-group">
                        <label> <strong>Valor</strong> </label>
                        <input type="text"
                        className="form-control mx-sm-3" 
                        defaultValue={solicitud.valor_solicitud}
                        ref={valor_solicitud_ref}/>
                    </div>

                    <div className="form-group">
                        <label> <strong>Moneda</strong> </label>
                        <select className="form-select" aria-label="Moneda" ref={id_moneda_ref}>
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

                    <div className="form-group">
                        <label> <strong>Contrato</strong> </label>
                        <input type="text"
                        className="form-control mx-sm-3"
                        defaultValue={solicitud.contrato_solicitud} 
                        ref={contrato_solicitud_ref}/>
                    </div>

                    <div className="form-group">
                        <label> <strong>Importar datos desde un Excel</strong> </label>
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

                {error  ? <div  className="font-weight-bold alert alert-danger text-center mt-4">Campos vacíos</div>  :null}

            </div>
        </div>
    </div>
</div>

  );
};

export default EditarSolicitud;