import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { TareasExternasProvider } from "./context/TareasExternasContext";
import Header from "./components/Header";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import PendienteRecoleccion from './components/PendienteRecoleccion';
import RecolectadosParaAtenderse from './components/RecolectadosParaAtenderse';
import RecibidosParaAtenderse from './components/RecibidosParaAtenderse';
import TerminadosParaRecolectar from './components/TerminadosParaRecolectar';
import RecolectadosParaEntrega from './components/RecolectadosParaEntrega';
import EntregadosASucursalOrigen from './components/EntregadosASucursalOrigen';
import Test from "./components/Test";

function App() {
  return (
    <TareasExternasProvider>
      <Router>
        <Header />
        <div className="home-container">
          {/* <Navbar />  */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/pendiente-recoleccion' element={<PendienteRecoleccion />} />
            <Route path='/recolectados-para-atenderse' element={<RecolectadosParaAtenderse />} />
            <Route path='/recibidos-para-atenderse' element={<RecibidosParaAtenderse />} />
            <Route path='/terminados-para-recolectar' element={<TerminadosParaRecolectar />} />
            <Route path='/recolectados-para-entrega' element={<RecolectadosParaEntrega />} />
            <Route path='/entregados-a-sucursal-origen' element={<EntregadosASucursalOrigen />} />
            <Route path='/test' element={<Test />} />
          </Routes>
        </div>
      </Router>
    </TareasExternasProvider>
  );
}

export default App;
