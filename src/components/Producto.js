import React,   { useState, useRef} from "react";
import { useDispatch ,  useSelector} from "react-redux";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter,
  } from "reactstrap";

import { eliminarProductoAction, editarProductoAction } from "../actions/solicitudesAction";
import { validarFormularioAction, validacionExito, validacionError } from "../actions/validacionAction";

const Producto  =   ({producto})  =>{
    const   pfx_ref   =   useRef('');
    const   cantidad_ref   =   useRef('');

    const dispatch  = useDispatch();
    const eliminarProducto = (id)    => dispatch(eliminarProductoAction(id)) ;
    const editarProducto = (id)    => dispatch(editarProductoAction(id)) ;

    const   validarFormulario = ()    => dispatch(validarFormularioAction()) ;
    const   exitoValidacion = ()    => dispatch(validacionExito()) ;
    const   errorValidacion = ()    => dispatch(validacionError()) ;

    const [modalProducto, setModalProducto] = useState(false);
    const error = useSelector((state) =>  state.error.error);

    const confirmarEliminarproducto = (id)  =>  {
        eliminarProducto(id);
    }

    const submitEditarProducto = ()  =>  {
    validarFormulario();

    //Validar
     if (pfx_ref.current.value.trim() === "" || cantidad_ref.current.value.trim() === "") {
       errorValidacion();
       return;
     }

    //Si pasa la validadacion
    exitoValidacion();

    //Crear el nuevo producto
    editarProducto({
      Pfx:  pfx_ref.current.value,
      Código:   producto.Código,
      Cantidad: cantidad_ref.current.value,
    });
    setModalProducto(false);
    }

    return(
        <React.Fragment>
        <tr>
            <td>{producto.Pfx}</td>
            <td>{producto.Código}</td>
            <td>{producto.Cantidad}</td>
            <td>
            <Button color="primary" onClick={()=>setModalProducto(true)}>Modificar</Button>
                </td>
            <td>
                <button className="btn btn-danger"
                onClick={() => confirmarEliminarproducto(producto.Código)}>
                    Eliminar
                    </button>
                </td>
        </tr>
        <Modal isOpen={modalProducto}>
        <ModalHeader>
         <div><h3>Modificar producto</h3></div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
          <div className="col-md-2">
                  <label    className="my-2">   <strong>Pfx</strong>    </label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="Pfx"
                    defaultValue={producto.Pfx}
                    ref={pfx_ref}
                  />
                </div>
                
                <div className="col-md-3">
                  <label    className="my-2">   <strong>Cantidad</strong>   </label>
                  <input
                    type="number"
                    required
                    min="1"
                    className="form-control"
                    placeholder="Cantidad"
                    defaultValue={producto.Cantidad}
                    ref={cantidad_ref}
                  />
                </div>
          </FormGroup>

          {error  ? <div  className="font-weight-bold alert alert-danger text-center mt-4">Campos vacíos</div>  :null}
          
        </ModalBody>

        <ModalFooter>
          <Button
            color="primary"
            onClick={() => submitEditarProducto()}
            
          >
            Modificar
          </Button>
          <Button
            className="btn btn-danger"
            onClick={() => setModalProducto(false)}
            
            
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
      </React.Fragment>
    );
}

export default Producto;