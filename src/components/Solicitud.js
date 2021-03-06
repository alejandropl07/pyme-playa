import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";
//Actions para validar fomulario
import {
  validarFormularioAction,
  validacionExito,
  validacionError,
} from "../actions/validacionAction";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

import {
  aprobarSolicitudAction,
  rechazarSolicitudAction,
  finalizarSolicitudAction,
  esperarSolicitudAction,
  obtenerSolicitudesAction,
  aprobarSolicitudLogAction,
} from "../actions/solicitudesAction";

const Solicitud = ({ solicitud }) => {
  const dispatch = useDispatch();
  //Obtener parámetros del URL
  const params = useParams();
  const idUsuario = params.id;

  const validarFormulario = () => dispatch(validarFormularioAction());
  const exitoValidacion = () => dispatch(validacionExito());
  const errorValidacion = () => dispatch(validacionError());

  //Obtener datos del state
  const { isDirector } = useSelector((state) => state.rol);
  const { isLogistico } = useSelector((state) => state.rol);
  const error = useSelector((state) => state.error.error);

  //State inicial causa de espera
  const [causa_espera, guardar_causa] = useState("");
  const [modal_causa, guardar_modal] = useState(false);

  //Actions
  const aprobarSolicitud = (id) => dispatch(aprobarSolicitudAction(id));
  const aprobarSolicitudLog = (id) => dispatch(aprobarSolicitudLogAction(id));
  const rechazarSolicitud = (id) => dispatch(rechazarSolicitudAction(id));
  const finalizarSolicitud = (id) => dispatch(finalizarSolicitudAction(id));
  const esperarSolicitud = (id) =>
    dispatch(esperarSolicitudAction(id, causa_espera));
  const obtenerSolicitudes = (id) => dispatch(obtenerSolicitudesAction(id));

  //Submit para aprobar solicitud director
  const submitAprobarSolicitud = (id) => {
    // Confirmación de Sweet Alert
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

  //Submit para aprobar solicitud logístico
  const submitAprobarSolicitudLog = (id) => {
    // Confirmación de Sweet Alert
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
        aprobarSolicitudLog(id);
        Swal.fire("Aprobada!", "Se ha aprobado la solicitud.", "success");
        obtenerSolicitudes(idUsuario);
      }
    });
  };

  //Submit para rechazar solicitud director
  const submitRechazarSolicitud = (id) => {
    // Confirmación de Sweet Alert
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
        rechazarSolicitud(id);
        Swal.fire("Rechazada!", "Se ha rechazado la solicitud.", "success");
        obtenerSolicitudes(idUsuario);
      }
    });
  };

  //Submit para finalizar solicitud comercial
  const submitFinalizarSolicitud = (id) => {
    // Confirmación de Sweet Alert
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

  //Submit para poner solicitud en espera
  const submitEsperarSolicitud = (id) => {
    validarFormulario();

    //Validar
    if (causa_espera.trim() === "") {
      errorValidacion();
      return;
    }
    //Si pasa la validadacion
    exitoValidacion();
    // Confirmacion de Sweet Alert
    Swal.fire({
      title: "Está seguro?",
      text: "La solicitud se pondrá en espera!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        esperarSolicitud(id, causa_espera);
        guardar_modal(false);
        Swal.fire(
          "En espera!",
          "La solicitud se encuentra en espera.",
          "success"
        );
      }
    });
  };

  return (
    <React.Fragment>
      <tr
        className={
          !isDirector && !isLogistico
            ? solicitud.fecha_finalizada !== null
              ? "table-success"
              : "table-danger"
            : isDirector && solicitud.fecha_espera !== null
            ? "table-warning"
            : null
        }
      >
        <td>{solicitud.descrip_solicitud}</td>
        <td className="acciones">
          {isDirector ? (
            <button
              className="btn btn-success"
              onClick={() => submitAprobarSolicitud(solicitud.id_solicitud)}
            >
              Aprobar
            </button>
          ) : null}

          {isLogistico ? (
            <button
              className="btn btn-success"
              onClick={() => submitAprobarSolicitudLog(solicitud.id_solicitud)}
            >
              Aprobar
            </button>
          ) : null}

          {isDirector ? (
            <button
              className="btn btn-danger"
              onClick={() => submitRechazarSolicitud(solicitud.id_solicitud)}
            >
              Rechazar
            </button>
          ) : null}

          {isDirector && solicitud.fecha_espera === null ? (
            <button
              className="btn btn-warning"
              onClick={() => guardar_modal(true)}
            >
              Espera
            </button>
          ) : null}

          {!isDirector && solicitud.fecha_finalizada === null ? (
            <Link
              to={`/solicitudes/editar/${solicitud.id_solicitud}`}
              className="btn btn-primary"
            >
              Editar
            </Link>
          ) : null}

          {!isDirector && solicitud.fecha_finalizada === null ? (
            <button
              className="btn btn-success"
              onClick={() => submitFinalizarSolicitud(solicitud.id_solicitud)}
            >
              Finalizar
            </button>
          ) : null}

          {!isDirector &&
          !isLogistico &&
          solicitud.fecha_finalizada !== null ? (
            <Link
              target="_blank"
              to={`/pdf/${solicitud.id_solicitud}`}
              className="btn btn-secondary"
            >
              Imprimir
            </Link>
          ) : null}
        </td>
      </tr>

      {/* Ventana causa de espera */}
      <Modal isOpen={modal_causa}>
        <ModalHeader>
          <div>
            <h3>Solicitud en espera</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Causa:</label>
            <textarea
              className="form-control"
              name="causa_espera"
              type="text"
              value={causa_espera}
              onChange={(e) => guardar_causa(e.target.value)}
            />
          </FormGroup>
          {error ? (
            <div className="font-weight-bold alert alert-danger text-center mt-4">
              Campos vacíos
            </div>
          ) : null}
        </ModalBody>

        <ModalFooter>
          <Button
            color="primary"
            onClick={() => submitEsperarSolicitud(solicitud.id_solicitud)}
          >
            Aceptar
          </Button>
          <Button
            className="btn btn-danger"
            onClick={() => guardar_modal(false)}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default Solicitud;
