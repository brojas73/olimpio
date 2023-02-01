import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/comun/Header";
import Alta from "./components/tracking/Alta";
import PendienteRecoleccion from './components/tracking/PendienteRecoleccion';
import RecolectadosParaAtenderse from './components/tracking/RecolectadosParaAtenderse';
import RecibidosParaAtenderse from './components/tracking/RecibidosParaAtenderse';
import TerminadosParaRecolectar from './components/tracking/TerminadosParaRecolectar';
import RecolectadosParaEntrega from './components/tracking/RecolectadosParaEntrega';
import EntregadosASucursalOrigen from './components/tracking/EntregadosASucursalOrigen';
import Login from "./components/login/Login";
import ProtectedLayout from "./components/comun/ProtectedLayout";
import Home from "./components/comun/Home";
import Logout from "./components/login/Logout";
import IdleTimeoutHandler from "./components/comun/IdleTimeoutHandler";


function App() {
  const [isActive, setIsActive] = useState(true)
  const [isLogout, setIsLogout] = useState(false)

  return (
    <>
      <IdleTimeoutHandler 
          onActive={() => setIsActive(true)} 
          onIdle={() => setIsActive(false)} 
          onLogout={() => setIsLogout(true)}
          onLogoutURL="/login"
      />
      <div className="home-container">
        <Header isLogout={isLogout} />
        <Routes>
          <Route path='/logout' element={<Logout />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />

          <Route path='/tracking' element={<ProtectedLayout />} >
            <Route path='alta' element={<Alta />} />
            <Route path='pendiente-recoleccion' element={<PendienteRecoleccion />} />
            <Route path='recolectados-para-atenderse' element={<RecolectadosParaAtenderse />} />
            <Route path='recibidos-para-atenderse' element={<RecibidosParaAtenderse />} />
            <Route path='terminados-para-recolectar' element={<TerminadosParaRecolectar />} />
            <Route path='recolectados-para-entrega' element={<RecolectadosParaEntrega />} />
            <Route path='entregados-a-sucursal-origen' element={<EntregadosASucursalOrigen />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
