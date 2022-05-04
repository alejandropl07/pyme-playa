import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import {
  aprobarSolicitudAction,
  finalizarSolicitudAction,
} from "../actions/solicitudesAction";

const Solicitud = ({ solicitud }) => {
  const dispatch = useDispatch();
  const { isDirector } = useSelector((state) => state.rol);

  const aprobarSolicitud = (id) => dispatch(aprobarSolicitudAction(id));
  const finalizarSolicitud = (id) => dispatch(finalizarSolicitudAction(id));

  const confirmarEliminarSolicitud = (id) => {
    // Confirmacion de Sweet Alert

    Swal.fire({
      title: "Está seguro?",
      text: "No podrá revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Eliminado!", "Se ha eliminado la solicitud.", "success");
      }
    });
  };

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
        
        {!isDirector && solicitud.fecha_finalizada === null ? (
          <button
            className="btn btn-success me-2"
            onClick={() => submitFinalizarSolicitud(solicitud.id_solicitud)}
          >
            Finalizar
          </button>
        ) : null}
        
        <Link
          to={`/solicitudes/editar/${solicitud.id_solicitud}`}
          className="btn btn-primary me-2"
        >
          Editar
        </Link>
        
        <button
          className="btn btn-danger"
          onClick={() => confirmarEliminarSolicitud(solicitud.id_solicitud)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Solicitud;
