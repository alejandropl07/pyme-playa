import {Provider} from  'react-redux';
import store from './store'; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Componentes
import CrearSolicitud from "./components/CrearSolicitud";
import Solicitudes from './components/Solicitudes';

function App() {
  return (
    <Router>

    <Provider store={store}>
        <div className="container">
            <Routes>
                <Route exact path="/" element={<CrearSolicitud/>} /> 
                <Route exact path="/solicitudes" element={<Solicitudes/>} /> 
            </Routes>
        </div>
    </Provider>
  </Router>
  );
}

export default App;
