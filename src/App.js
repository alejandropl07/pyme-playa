import {Provider} from  'react-redux';
import store from './store'; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PDFViewer } from '@react-pdf/renderer';

// Componentes
import CrearSolicitud from "./components/CrearSolicitud";
import Solicitudes from './components/Solicitudes';
import PDF from './components/PDF';

function App() {
  return (
    <Router>

    <Provider store={store}>
        <div className="container">
            <Routes>
                <Route exact path="/" element={<CrearSolicitud/>} /> 
                <Route exact path="/solicitudes" element={<Solicitudes/>} />
                <Route exact path="/pdf" element={<PDFViewer  style={{width:"100%", height:"90vh"}}><PDF/></PDFViewer>} />  
            </Routes>
        </div>
    </Provider>
  </Router>
  );
}

export default App;
