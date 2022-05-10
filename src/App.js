import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Componentes
import CrearSolicitud from "./components/CrearSolicitud";
import EditarSolicitud from "./components/EditarSolicitud";
import Solicitudes from "./components/Solicitudes";
import PDF from "./components/PDF";
import Error from "./components/Error";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<CrearSolicitud />} />
            <Route
              exact
              path="/solicitudes/usuario/:id"
              element={<Solicitudes />}
            />
            <Route
              exact
              path="/solicitudes/editar/:id"
              element={<EditarSolicitud />}
            />
            <Route exact path="/pdf/:id" element={<PDF />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
