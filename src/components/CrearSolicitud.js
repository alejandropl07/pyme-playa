import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import Producto from "./Producto";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

//Actions para validar formulario
import {
  validarFormularioAction,
  validacionExito,
  validacionError,
  validacionClienteError,
  validacionClienteExito,
  validarClienteAction,
} from "../actions/validacionAction";
import {
  solicitudVaciaAction,
  agregarSolicitudAction,
  agregarProductoAction,
  obtenerProductosExcelAction,
} from "../actions/solicitudesAction";
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
import { useNavigate } from "react-router-dom";

import {
  crearClienteAction,
  crearClienteComienzo,
  crearClienteFinal,
} from "../actions/clientesAction";
import Swal from "sweetalert2";

const CrearSolicitud = () => {
  const dispatch = useDispatch();
  //Hook useEffect, se ejecuta al renderizar la página
  useEffect(() => {
    const solicitudVacia = () => dispatch(solicitudVaciaAction());
    const obtenerDivision = () => dispatch(obtenerDivisionAction());
    const obtenerSucursales = () => dispatch(obtenerSucursalesAction());
    const obtenerProveedores = () => dispatch(obtenerProveedoresAction());
    const obtenerPedidos = () => dispatch(obtenerPedidosAction());
    const obtenerEmbarques = () => dispatch(obtenerEmbarquesAction());
    const obtenerClientes = () => dispatch(obtenerClientesAction());
    const obtenerDestinos = () => dispatch(obtenerDestinosAction());
    const obtenerProductos = () => dispatch(obtenerProductosAction());
    const obtenerMonedas = () => dispatch(obtenerMonedasAction());
    solicitudVacia();
    obtenerDivision();
    obtenerSucursales();
    obtenerProveedores();
    obtenerPedidos();
    obtenerEmbarques();
    obtenerClientes();
    obtenerDestinos();
    obtenerProductos();
    obtenerMonedas();
  }, [dispatch]);

  //Para guardar productos del excel en el state
  const obtenerProductosExcel = (productosExcel) =>
    dispatch(obtenerProductosExcelAction(productosExcel));

  //Leer datos de fichero excel
  const readExcel = (e, file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    //Comprueba que no existan productos iguales en el state
    promise.then((d) => {
      var stop = false;
      for (let i = 0; i < productos.length && !stop; i++) {
        for (let j = 0; j < d.length && !stop; j++) {
          if (productos[i].Código == d[j].Código) {
            stop = true;
          }
        }
      }
      if (!stop) {
        //Guarda productos en el state
        obtenerProductosExcel(d);
      } else {
        Swal.fire({
          title: "Error al cargar los datos",
          text: `Existen productos con el mismo código`,
          position: "center",
          background: "white",
          showConfirmButton: true,
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        });
      }
    });
    e.target.value = "";
  };

  //Estados iniciales variables del formulario
  const [id_division, guardarDivision] = useState("");
  const [id_sucursal, guardarSucursal] = useState("");
  const [id_proveedor, guardarProveedor] = useState("");
  const [id_clase_pedido, guardarClasePedido] = useState("");
  const [id_embarque, guardarEmbarque] = useState("");
  const [id_cliente, guardarCliente] = useState("");
  const [fecha_entrega, guardarFechaEntrega] = useState("");
  const [referencia, guardarReferencia] = useState("");
  const [descrip_solicitud, guardarDescrip] = useState("");
  const [id_destino, guardarDestino] = useState("");
  const [id_tipo_producto, guardarTipoProducto] = useState("");
  const [valor_solicitud, guardarValor] = useState("");
  const [id_moneda, guardarMoneda] = useState("");
  const [contrato_solicitud, guardarContrato] = useState("");

  //Estados iniciales productos
  const [Pfx, guardarPfx] = useState("");
  const [Código, guardarCodigo] = useState("");
  const [Cantidad, guardarCantidad] = useState("");
  //Estado inicial para crear cliente
  const [descrip_cliente, guardar_descrip] = useState("");

  //Para redireccionar
  const navigate = useNavigate();

  const agregarSolicitud = (solicitud) =>
    dispatch(agregarSolicitudAction(solicitud));
  const agregarProducto = (producto) =>
    dispatch(agregarProductoAction(producto));

  const validarFormulario = () => dispatch(validarFormularioAction());
  const exitoValidacion = () => dispatch(validacionExito());
  const errorValidacion = () => dispatch(validacionError());

  const validarCliente = () => dispatch(validarClienteAction());
  const exitoValidacionCliente = () => dispatch(validacionClienteExito());
  const errorValidacionCliente = () => dispatch(validacionClienteError());

  //Métodos para crear cliente nuevo
  const agregarCliente = (cliente) => dispatch(crearClienteAction(cliente));
  const comenzarCrearCliente = () => dispatch(crearClienteComienzo());
  const finalizarCrearCliente = () => dispatch(crearClienteFinal());

  //Obtener los datos del state
  const error = useSelector((state) => state.error.error);
  const {errorCliente} = useSelector((state) => state.error);
  const loadingDivisiones = useSelector((state) => state.divisiones.loading);
  const { divisiones } = useSelector((state) => state.divisiones.divisiones);
  const loadingSucursal = useSelector((state) => state.sucursales.loading);
  const { sucursal } = useSelector((state) => state.sucursales.sucursales);
  const loadingProveedores = useSelector((state) => state.proveedores.loading);
  const { proveedores } = useSelector((state) => state.proveedores.proveedores);
  const loadingPedidos = useSelector((state) => state.pedidos.loading);
  const { clasesPedido } = useSelector((state) => state.pedidos.pedidos);
  const loadingEmbarques = useSelector((state) => state.embarques.loading);
  const { embarques } = useSelector((state) => state.embarques.embarques);
  const loadingClientes = useSelector((state) => state.clientes.loading);
  const { clientes } = useSelector((state) => state.clientes.clientes);
  const loadingDestinos = useSelector((state) => state.destinos.loading);
  const { destinos } = useSelector((state) => state.destinos.destinos);
  const loadingProductos = useSelector((state) => state.productos.loading);
  const { tiposProducto } = useSelector((state) => state.productos.productos);
  const loadingMonedas = useSelector((state) => state.monedas.loading);
  const { monedas } = useSelector((state) => state.monedas.monedas);

  const modalCliente = useSelector((state) => state.clientes.modal);

  const productos = useSelector((state) => state.solicitudes.productos);

  //Submit para crear cliente
  const submitCrearCliente = (e) => {
    e.preventDefault();

    //Validar
    validarCliente();

    if (descrip_cliente.trim() === "") {
      errorValidacionCliente();
      return;
    }

    //Si pasa la validadacion
    exitoValidacionCliente();

    //Crear nuevo cliente
    agregarCliente({
      descrip_cliente,
    });

    guardar_descrip("");
  };

  //Submit crear nueva solicitud
  const submitCrearSolicitud = (e) => {
    e.preventDefault();
    validarFormulario();
    //Validar
    if (
      id_division.trim() === "" ||
      id_sucursal.trim() === "" ||
      id_proveedor.trim() === "" ||
      id_clase_pedido.trim() === "" ||
      id_embarque.trim() === "" ||
      id_cliente.trim() === "" ||
      fecha_entrega.trim() === "" ||
      referencia.trim() === "" ||
      descrip_solicitud.trim() === "" ||
      id_destino.trim() === "" ||
      id_tipo_producto.trim() === "" ||
      valor_solicitud.trim() === "" ||
      id_moneda.trim() === "" ||
      contrato_solicitud.trim() === "" ||
      productos.length === 0
    ) {
      errorValidacion();
      return;
    }

    //Si pasa la validadacion
    exitoValidacion();

    //Crear nueva solicitud
    agregarSolicitud({
      id_division,
      id_sucursal,
      id_proveedor,
      id_clase_pedido,
      id_embarque,
      id_cliente,
      fecha_entrega,
      referencia,
      descrip_solicitud,
      id_destino,
      id_tipo_producto,
      valor_solicitud,
      id_moneda,
      contrato_solicitud,
      id_comercial: 1,
      productos,
    });
    //Redireccionar
    navigate("/solicitudes/usuario/1");
  };

  //Submit para agregar nuevo producto al state
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

    //Verifica q no existan productos con mismo código
    if (productos.some((producto) => producto.Código == Código)) {
      Swal.fire({
        title: "Error",
        text: `Ya existe un producto con ese código`,
        position: "center",
        background: "white",
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      });
    } else {
      //Crear el nuevo producto
      agregarProducto({
        Pfx,
        Código,
        Cantidad,
      });
    }

    //Reiniciar valores de formulario
    guardarPfx("");
    guardarCodigo("");
    guardarCantidad("");
  };

  return (
    <div className="row justify-content-left mt-5 col-md-12">
      <div className="card ">
        <div className="card-body">
          <h2 align="center">Crear nueva solicitud</h2>
          <hr></hr>
          <div className="row">
            <div className="col-xl-7">
              <form>
                <div className="form-group  mb-2 row">
                  <div className="col-md-3 mt-1">
                    <label>
                      <strong> División </strong>{" "}
                    </label>
                  </div>
                  <div className="col-md-6">
                    <select
                      className="form-select"
                      aria-label="División"
                      onChange={(e) => guardarDivision(e.target.value)}
                    >
                      <option defaultValue>Seleccione la división</option>
                      {loadingDivisiones ? (
                        <option value="0">División</option>
                      ) : (
                        divisiones.map((division) => (
                          <option
                            key={division.id_division}
                            value={division.id_division}
                          >
                            {division.descrip_division}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                </div>

                <div className="form-group  mb-2 row">
                  <div className="col-md-3 mt-1">
                    <label>
                      {" "}
                      <strong>Sucursal</strong>{" "}
                    </label>
                  </div>
                  <div className="col-md-6">
                    <select
                      className="form-select"
                      aria-label="Sucursal"
                      onChange={(e) => guardarSucursal(e.target.value)}
                    >
                      <option defaultValue>Seleccione la sucursal</option>
                      {loadingSucursal ? (
                        <option value="0">Sucursal</option>
                      ) : (
                        sucursal.map((sucursal) => (
                          <option
                            key={sucursal.id_sucursal}
                            value={sucursal.id_sucursal}
                          >
                            {sucursal.descrip_sucursal}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                </div>

                <div className="form-group mb-2 row">
                  <div className="col-md-3 mt-1">
                    <label>
                      <strong>Proveedor</strong>
                    </label>
                  </div>
                  <div className="col-md-6">
                    <select
                      className="form-select"
                      aria-label="Proveedor"
                      onChange={(e) => guardarProveedor(e.target.value)}
                    >
                      <option defaultValue>Seleccione el proveedor</option>
                      {loadingProveedores ? (
                        <option value="0">Proveedor</option>
                      ) : (
                        proveedores.map((proveedor) => (
                          <option
                            key={proveedor.id_proveedor}
                            value={proveedor.id_proveedor}
                          >
                            {proveedor.descrip_proveedor}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                </div>

                <div className="form-group mb-2 row">
                  <div className="col-md-3 mt-1">
                    <label>
                      <strong>Clase de pedido</strong>
                    </label>
                  </div>
                  <div className="col-md-6">
                    <select
                      className="form-select"
                      aria-label="ClasePedido"
                      onChange={(e) => guardarClasePedido(e.target.value)}
                    >
                      <option defaultValue>
                        Seleccione la clase de pedido
                      </option>
                      {loadingPedidos ? (
                        <option value="0">Clase pedido</option>
                      ) : (
                        clasesPedido.map((pedido) => (
                          <option
                            key={pedido.id_clase_pedido}
                            value={pedido.id_clase_pedido}
                          >
                            {pedido.descrip_clase_pedido}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                </div>

                <div className="form-group mb-2 row">
                  <div className="col-md-3 mt-1">
                    <label>
                      <strong>Embarque</strong>
                    </label>
                  </div>
                  <div className="col-md-6">
                    <select
                      className="form-select"
                      aria-label="Embarque"
                      onChange={(e) => guardarEmbarque(e.target.value)}
                    >
                      <option defaultValue>Seleccione el embarque</option>
                      {loadingEmbarques ? (
                        <option value="0">Embarque</option>
                      ) : (
                        embarques.map((embarque) => (
                          <option
                            key={embarque.id_embarque}
                            value={embarque.id_embarque}
                          >
                            {embarque.descrip_embarque}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                </div>

                <div className="form-group mb-2 row">
                  <div className="col-md-3 mt-1">
                    <label>
                      <strong>Cliente</strong>
                    </label>
                  </div>
                  <div className="col-md-6">
                    <select
                      className="form-select"
                      aria-label="Cliente"
                      onChange={(e) => guardarCliente(e.target.value)}
                    >
                      <option defaultValue>Seleccione el cliente</option>
                      {loadingClientes ? (
                        <option value="0">Cliente</option>
                      ) : (
                        clientes.map((cliente) => (
                          <option
                            key={cliente.id_cliente}
                            value={cliente.id_cliente}
                          >
                            {cliente.descrip_cliente}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <Button
                      color="primary"
                      onClick={() => comenzarCrearCliente()}
                    >
                      Crear cliente
                    </Button>
                  </div>
                </div>

                <div className="form-group mb-2 row">
                  <div className="col-md-3 mt-1">
                    <label>
                      {" "}
                      <strong>Descripción</strong>{" "}
                    </label>
                  </div>
                  <div className="col-md-6">
                    <textarea
                      type="text"
                      className="form-control "
                      onChange={(e) => guardarDescrip(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group mb-2 row">
                  <div className="col-md-3 mt-1">
                    <label>
                      <strong>Fecha de entrega</strong>
                    </label>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="date"
                      onChange={(e) => guardarFechaEntrega(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group mb-2 row">
                  <div className="col-md-3 mt-1">
                    <label>
                      {" "}
                      <strong>Referencia</strong>{" "}
                    </label>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control "
                      onChange={(e) => guardarReferencia(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group mb-2 row">
                  <div className="col-md-3 mt-1">
                    <label>
                      <strong>Destino</strong>
                    </label>
                  </div>
                  <div className="col-md-6">
                    <select
                      className="form-select"
                      aria-label="Destino"
                      onChange={(e) => guardarDestino(e.target.value)}
                    >
                      <option defaultValue>Seleccione el destino</option>
                      {loadingDestinos ? (
                        <option value="0">Destino</option>
                      ) : (
                        destinos.map((destino) => (
                          <option
                            key={destino.id_destino}
                            value={destino.id_destino}
                          >
                            {destino.descrip_destino}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                </div>

                <div className="form-group mb-2 row">
                  <div className="col-md-3 mt-1">
                    <label>
                      <strong>Tipo de producto</strong>
                    </label>
                  </div>
                  <div className="col-md-6">
                    <select
                      className="form-select"
                      aria-label="TipoProducto"
                      onChange={(e) => guardarTipoProducto(e.target.value)}
                    >
                      <option defaultValue>
                        Seleccione el tipo de producto
                      </option>
                      {loadingProductos ? (
                        <option value="0">Producto</option>
                      ) : (
                        tiposProducto.map((producto) => (
                          <option
                            key={producto.id_tipo_producto}
                            value={producto.id_tipo_producto}
                          >
                            {producto.descrip_tipo_producto}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                </div>

                <div className="form-group mb-2 row">
                  <div className="col-md-3 mt-1">
                    <label>
                      <strong>Valor</strong>
                    </label>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => guardarValor(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group mb-2 row">
                  <div className="col-md-3 mt-1">
                    <label>
                      <strong>Moneda</strong>
                    </label>
                  </div>
                  <div className="col-md-6">
                    <select
                      className="form-select"
                      aria-label="Moneda"
                      onChange={(e) => guardarMoneda(e.target.value)}
                    >
                      <option defaultValue>Seleccione el tipo de moneda</option>
                      {loadingMonedas ? (
                        <option value="0">Moneda</option>
                      ) : (
                        monedas.map((moneda) => (
                          <option
                            key={moneda.id_moneda}
                            value={moneda.id_moneda}
                          >
                            {moneda.descrip_moneda}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                </div>

                <div className="form-group mb-2 row">
                  <div className="col-md-3 mt-1">
                    <label>
                      <strong>Contrato</strong>
                    </label>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => guardarContrato(e.target.value)}
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="col-xl-5">
              <h3 align="center">Productos</h3>
              <div className="form-group mb-2">
                <label>
                  <strong>Importar productos</strong>
                </label>
                <label className="custom-file-upload">
                  <input
                    type="file"
                    className="form-control mx-sm-3"
                    accept=".xls,.xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      readExcel(e, file);
                    }}
                  />
                  Subir archivo
                </label>
              </div>

              <div className="col-md-8">
                <table className="table mt-2">
                  <thead className="bg-primary table-light">
                    <tr>
                      <th scope="col">Pfx</th>
                      <th scope="col">Código</th>
                      <th scope="col">Cantidad</th>
                    </tr>
                  </thead>

                  <tbody>
                    {productos.map((producto) => (
                      <Producto key={producto.Código} producto={producto} />
                    ))}
                  </tbody>
                </table>
              </div>

              <form className="row g-2" onSubmit={submitAgregarProducto}>
                <div className="col-md-2">
                  <label className="visually-hidden">Pfx</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="Pfx"
                    value={Pfx}
                    onChange={(e) => guardarPfx(e.target.value)}
                  />
                </div>
                <div className="col-md-2">
                  <label className="visually-hidden">Código</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="Código"
                    value={Código}
                    onChange={(e) => guardarCodigo(e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <label className="visually-hidden">Cantidad</label>
                  <input
                    type="number"
                    required
                    min="1"
                    className="form-control"
                    placeholder="Cantidad"
                    value={Cantidad}
                    onChange={(e) => guardarCantidad(e.target.value)}
                  />
                </div>
                <div style={{ width: "40%" }}>
                  <button type="submit" className="btn btn-primary mb-3">
                    Agregar producto
                  </button>
                </div>
              </form>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold d-block w-100  mt-3"
                onClick={submitCrearSolicitud}
              >
                Guardar solicitud
              </button>

              {error ? (
                <div className="font-weight-bold alert alert-danger text-center mt-4">
                  Debe ingresar todos los datos
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Ventana para crear nuevo cliente */}
      <Modal isOpen={modalCliente}>
        <ModalHeader>
          <div>
            <h3>Insertar cliente</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Nombre del cliente:</label>

            <input
              className="form-control"
              name="descrip_cliente"
              type="text"
              value={descrip_cliente}
              onChange={(e) => guardar_descrip(e.target.value)}
            />
          </FormGroup>
          {errorCliente ? (
            <div className="font-weight-bold alert alert-danger text-center mt-4">
              Debe ingresar el nombre del cliente
            </div>
          ) : null}
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={submitCrearCliente}>
            Insertar
          </Button>
          <Button
            className="btn btn-danger"
            onClick={() => finalizarCrearCliente()}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CrearSolicitud;
