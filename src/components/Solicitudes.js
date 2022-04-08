import React from "react";
import { useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { obtenerSolicitudesAction } from "../actions/solicitudesAction";

const Solicitudes = () => {
  const   dispatch    =   useDispatch();

  useEffect(()  =>  {
    const   obtenerSolicitudes = ()    => dispatch(obtenerSolicitudesAction()) ;
    obtenerSolicitudes();
  },[]);

  const loading = useSelector(state => state.solicitudes.loading);
  const error = useSelector(state=> state.solicitudes.error);
  const solicitudes = useSelector(state=> state.solicitudes.solicitudes);

  return (
    <React.Fragment>
       {error  ? <div  className="font-weight-bold alert alert-danger text-center mt-4">Error al cargar las solicitudes</div>
      : null
      }
      <h2 className="text-center my-5">Listado de solicitudes</h2>

      <table className="table table-striped">
        <thead className="bg-primary table-light">
          <tr>
            <th scope="col">Solicitud</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
            
        </tbody>
      </table>
      {loading  ? "Cargando solicitudes"  : null}
    </React.Fragment>
  );
};

export default Solicitudes;