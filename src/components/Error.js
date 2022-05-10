import { Link } from "react-router-dom";
const Error = () => {
    return (
        
        <div style={{marginTop: "30px"}}>
             <h1>Error, página no encontrada</h1>
             <Link
                to={`/solicitudes/usuario/${1}`}
                className="btn btn-primary"  
              >
                Inicio
              </Link>
        </div>
      
    )
}

export default Error;