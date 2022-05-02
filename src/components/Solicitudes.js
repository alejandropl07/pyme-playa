import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { obtenerSolicitudesAction } from "../actions/solicitudesAction";
import { obtenerRolAction } from "../actions/rolAction";
import Solicitud from "./Solicitud";

const Solicitudes = () => {
  const   dispatch    =   useDispatch();

  const params =   useParams();
  const id  = params.id;

  useEffect(()  =>  {
    dispatch(obtenerSolicitudesAction(id)) ;
    dispatch(obtenerRolAction(id)) ;
  },[dispatch,id]);

  const loading = useSelector(state => state.solicitudes.loading);
  const error = useSelector(state=> state.solicitudes.error);
  const solicitudes = useSelector(state=> state.solicitudes.solicitudes);

  return (
    <React.Fragment>
       {error  ? <div  className="font-weight-bold alert alert-danger text-center mt-4">Error al cargar las solicitudes</div>
      : null
      }
      <h2 className="text-center my-5">Listado de solicitudes</h2>

      <table className="table">
        <thead className="bg-primary table-light">
          <tr>
            <th scope="col">Solicitud</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
        {loading  ? 
        null  : 
        solicitudes.map( solicitud => (
          <Solicitud
              key={solicitud.id_solicitud}
              solicitud={solicitud}
          />
       ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default Solicitudes;