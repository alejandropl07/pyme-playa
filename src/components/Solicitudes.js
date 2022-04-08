import React from "react";
import { useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";

const Solicitudes = () => {
  const   dispatch    =   useDispatch();

 /* useEffect(()  =>  {
  },[]);*/

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default Solicitudes;