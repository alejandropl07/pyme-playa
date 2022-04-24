import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

//import { eliminarSolicitudAction } from "../actions/solicitudesAction";

const Solicitud  =   ({solicitud})  =>{
    const dispatch  = useDispatch();

    const confirmarEliminarSolicitud = (id)  =>  {
        // Confirmacion de Sweet Alert

        Swal.fire({
            title: 'Está seguro?',
            text: "No podrá revertir esta acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Eliminado!',
                'Se ha eliminado la solicitud.',
                'success'
              )
            console.log(id);
            }
          })    
    }

    return(
        <tr>
            <td>{solicitud.descrip_solicitud}</td>
            <td className="acciones">
                <Link   to={`/solicitudes/editar/${solicitud.id_solicitud}`} className="btn btn-primary mr-2">Editar</Link>
                <button className="btn btn-danger"
                onClick={() => confirmarEliminarSolicitud(solicitud.id_solicitud)}>
                    Eliminar
                    </button>
                </td>
        </tr>
    );
}

export default Solicitud;