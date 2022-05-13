import React, { useState } from "react";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Solicitud from "./Solicitud";

import { useDispatch, useSelector } from "react-redux";
//Actions
import { obtenerSolicitudesAction } from "../actions/solicitudesAction";
import { obtenerRolAction, obtenerRolLogAction } from "../actions/rolAction";

const Solicitudes = () => {
  const dispatch = useDispatch();
  //  Obtener parámetros del URL
  const params = useParams();
  const id = params.id;

  //Obtener datos del state
  const loading = useSelector((state) => state.solicitudes.loading);
  const error = useSelector((state) => state.solicitudes.error);
  const solicitudes = useSelector((state) => state.solicitudes.solicitudes);
  const { isDirector, isLogistico } = useSelector((state) => state.rol);

  //Se ejecuta al renderizar la vista
  useEffect(() => {
    dispatch(obtenerSolicitudesAction(id));
    dispatch(obtenerRolAction(id));
    dispatch(obtenerRolLogAction(id));
  }, [dispatch, id]);

  //State inicial paginado
  const [paginaActual, setPaginaActual] = useState(0);
  const [busqueda, setBusqueda] = useState("");

  //Filtrar solicitudes
  const filtro = () => {
    return solicitudes.filter((solicitud) =>
      solicitud.descrip_solicitud.toUpperCase().includes(busqueda.toUpperCase())
    );
  };

  const filtrarSolicitudes = () => {
    let resultado = [];

    if (busqueda.length === 0)
      resultado = solicitudes.slice(paginaActual, paginaActual + 10);
    else {
      resultado = filtro().slice(paginaActual, paginaActual + 10);
    }

    return resultado;
  };

  const paginaSiguiente = () => {
    if (filtro().length > paginaActual + 10) setPaginaActual(paginaActual + 10);
  };

  const paginaAnterior = () => {
    if (paginaActual > 0) setPaginaActual(paginaActual - 10);
  };

  const obtenerSolicitud = (e) => {
    setPaginaActual(0);
    setBusqueda(e.target.value);
  };

  let rowStyle = {
    solicitudes: {
      // width: isDirector ? 750 : isLogistico ? 950 : "",
    },
    acciones: {
      width: isDirector ? "5%" : isLogistico ? "5%" : "5%",
    },
  };

  return (
    <React.Fragment>
      {error ? (
        <div className="font-weight-bold alert alert-danger text-center mt-4">
          Error al cargar las solicitudes
        </div>
      ) : null}
      <div className="row justify-content-left mt-5 col-md-12">
        <div className="card ">
          <div className="card-body">
            {solicitudes.length === 0 && isDirector ? (
              <h2 className="text-center">No hay solicitudes finalizadas</h2>
            ) : solicitudes.length === 0 && !isDirector && !isLogistico ? (
              <h2 className="text-center">No hay solicitudes creadas</h2>
            ) : solicitudes.length === 0 && isLogistico ? (
              <h2 className="text-center">No hay solicitudes aprobadas</h2>
            ) : (
              <h2 className="text-center">Listado de solicitudes</h2>
            )}

            <hr></hr>

            <div className="d-flex justify-content-center">
              <div className="encabezado">
                <React.Fragment>
                  <div className="d-flex flex-column">
                    {solicitudes.length > 0 ? (
                      <div style={{ width: "30%" }}>
                        <input
                          type="text"
                          className="mb-2 form-control "
                          placeholder="Buscar solicitud"
                          value={busqueda}
                          onChange={obtenerSolicitud}
                        />
                      </div>
                    ) : null}

                    <div className="mb-2 d-flex">
                      {solicitudes.length > 0 ? (
                        <>
                          <button
                            className="btn btn-primary me-2"
                            onClick={paginaAnterior}
                          >
                            Anteriores
                          </button>
                          <button
                            className="btn btn-primary"
                            onClick={paginaSiguiente}
                          >
                            Siguientes
                          </button>
                        </>
                      ) : null}
                      {!isDirector && !isLogistico ? (
                        <Link
                          to={`/`}
                          className="btn btn-success "
                          style={{ marginLeft: "auto" }}
                        >
                          Crear solicitud
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </React.Fragment>

                <table className="table">
                  <thead className="bg-primary table-light">
                    <tr>
                      <th style={rowStyle.solicitudes} scope="col">
                        Solicitud
                      </th>
                      <th style={rowStyle.acciones} scope="col">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading
                      ? null
                      : filtrarSolicitudes().map((solicitud) => (
                          <Solicitud
                            key={solicitud.id_solicitud}
                            solicitud={solicitud}
                          />
                        ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Solicitudes;
