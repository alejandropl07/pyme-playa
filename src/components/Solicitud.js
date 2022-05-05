import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { obtenerSolicitudesAction } from "../actions/solicitudesAction";

import {
  aprobarSolicitudAction,
  finalizarSolicitudAction,
} from "../actions/solicitudesAction";

const Solicitud = ({ solicitud }) => {
  const dispatch = useDispatch();
  const params =   useParams();
  const idUsuario  = params.id;
  const { isDirector } = useSelector((state) => state.rol);

  const aprobarSolicitud = (id) => dispatch(aprobarSolicitudAction(id));
  const finalizarSolicitud = (id) => dispatch(finalizarSolicitudAction(id));
  const obtenerSolicitudes  = (id)  =>  dispatch(obtenerSolicitudesAction(id));

  const submitAprobarSolicitud = (id) => {
    // Confirmacion de Sweet Alert

    Swal.fire({
      title: "Está seguro?",
      text: "No podrá revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        aprobarSolicitud(id);
        Swal.fire("Aprobada!", "Se ha aprobado la solicitud.", "success");
        obtenerSolicitudes(idUsuario);
      }
    });
  };

  const submitFinalizarSolicitud = (id) => {
    // Confirmacion de Sweet Alert

    Swal.fire({
      title: "Está seguro?",
      text: "No podrá revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        finalizarSolicitud(id);
        Swal.fire("Finalizada!", "Se ha completado la solicitud.", "success");
      }
    });
  };

  return (
    <tr 
      className={
        (isDirector && solicitud.fecha_aprobada !== null) ||
        (!isDirector && solicitud.fecha_finalizada !== null)
          ? "table-success"
          : "table-danger"
      }
    >
      <td>{solicitud.descrip_solicitud}</td>
      <td className="acciones">
        {isDirector && solicitud.fecha_aprobada === null ? (
          <button
            className="btn btn-success me-2"
            onClick={() => submitAprobarSolicitud(solicitud.id_solicitud)}
          >
            Aprobar
          </button>
        ) : null}
        
        {!isDirector ? ( <Link
          to={`/solicitudes/editar/${solicitud.id_solicitud}`}
          className="btn btn-primary me-2"
        >
          Editar
        </Link>): null}
       

        {!isDirector && solicitud.fecha_finalizada === null ? (
          <button
            className="btn btn-success me-2"
            onClick={() => submitFinalizarSolicitud(solicitud.id_solicitud)}
          >
            Finalizar
          </button>
        ) : null}

        {!isDirector && solicitud.fecha_finalizada !== null ? (
          <Link
            to={`/pdf/${solicitud.id_solicitud}`}
            className="btn btn-secondary"
          >
            Imprimir
          </Link>
        ) : null}
      </td>
    </tr>
  );
};

export default Solicitud;
