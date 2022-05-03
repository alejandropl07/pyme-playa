import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import { aprobarSolicitudAction } from "../actions/solicitudesAction";

const Solicitud = ({ solicitud }) => {
  const dispatch = useDispatch();
  const { isDirector } = useSelector((state) => state.rol);

  const   aprobarSolicitud = (id)    => dispatch(aprobarSolicitudAction(id)) ;

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
        aprobarSolicitud (id);
        Swal.fire("Aprobada!", "Se ha aprobado la solicitud.", "success");
      }
    });
  };

  return (
    <tr className={solicitud.fecha_aprobada !== null ? "table-success" : "table-danger"}>
      <td>{solicitud.descrip_solicitud}</td>
      <td className="acciones">
        {isDirector &&  solicitud.fecha_aprobada  === null ? (
          <button
            className="btn btn-success"
            onClick={() => submitAprobarSolicitud(solicitud.id_solicitud)}
          >
            Aprobar
          </button>
        ) : null}
        <Link
          to={`/solicitudes/editar/${solicitud.id_solicitud}`}
          className="btn btn-primary mr-2"
        >
          Editar
        </Link>
        &nbsp;
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
