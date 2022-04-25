import {Provider} from  'react-redux';
import store from './store'; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PDFViewer } from '@react-pdf/renderer';

// Componentes
import CrearSolicitud from "./components/CrearSolicitud";
import EditarSolicitud from "./components/EditarSolicitud";
import Solicitudes from './components/Solicitudes';
import PDF from './components/PDF';
import CrearCliente from './components/CrearCliente';

function App() {
  return (
    <Router>

    <Provider store={store}>
        <div className="container">
            <Routes>
                <Route exact path="/" element={<CrearSolicitud/>} /> 
                <Route exact path="/crearcliente" element={<CrearCliente/>} />
                <Route exact path="/solicitudes" element={<Solicitudes/>} />
                <Route exact path="/solicitudes/editar/:id" element={<EditarSolicitud/>} />
                <Route exact path="/pdf" element={<PDFViewer  style={{width:"100%", height:"90vh"}}><PDF/></PDFViewer>} />  
            </Routes>
        </div>
    </Provider>
  </Router>
  );
}

export default App;
