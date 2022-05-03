import React, { useState } from "react";
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

  const [paginaActual, setPaginaActual] = useState(0);
  const [busqueda, setBusqueda ] = useState('');

  const filtrarSolicitudes = () =>{

    let resultado = [ ];

    if(busqueda.length === 0)
      resultado = solicitudes.slice(paginaActual, paginaActual + 10);
    
      else{
        const filtro = solicitudes.filter (solicitud => (solicitud.descrip_solicitud.toUpperCase()).includes (busqueda.toUpperCase()));
        resultado = filtro.slice(paginaActual, paginaActual + 10);
      }

      return resultado;

  }

  const paginaSiguiente = () => {
    
   if(solicitudes.filter (solicitud => (solicitud.descrip_solicitud.toUpperCase()).includes (busqueda.toUpperCase())).length > paginaActual + 10)
     setPaginaActual(paginaActual + 10);
        
  }

  const paginaAnterior = () => {
    if(paginaActual > 0)
    setPaginaActual(paginaActual - 10);
  }

  const obtenerSolicitud = (e) => {
    setPaginaActual(0);
    setBusqueda (e.target.value);

  }

  return (
    
    <React.Fragment>
     
       {error  ? <div  className="font-weight-bold alert alert-danger text-center mt-4">Error al cargar las solicitudes</div>
      : null
      }
      <h2 className="text-center my-5">Listado de solicitudes</h2>

      <div className="col-md-4">
       <input 
          type="text" 
          className="mb-2 form-control" 
          placeholder="Buscar solicitud"
          value={busqueda}
          onChange={obtenerSolicitud}
       />
      </div>

      <button className="btn btn-primary" onClick={paginaAnterior}> Anteriores</button>
      &nbsp;
      <button className="btn btn-primary" onClick={paginaSiguiente}> Siguientes</button>
      
      <div className=" col-md-10">
      <table className="table" >
        <thead className="bg-primary table-light">
          <tr>
            <th style={{width:800}}scope="col">Solicitud</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
        {loading  ? 
        null  : 
        filtrarSolicitudes().map( solicitud => (
          <Solicitud
              key={solicitud.id_solicitud}
              solicitud={solicitud}
          />
       ))}
        </tbody>
      </table>
      </div>
    </React.Fragment>
  );
};

export default Solicitudes;