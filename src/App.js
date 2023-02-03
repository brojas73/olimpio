import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Alert, Container } from 'react-bootstrap'
import GlobalNavbar from "./components/comun/GlobalNavbar";
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
import IdleTimeoutHandler from "./components/comun/IdleTimeoutHandler";
import { SUCURSAL_DEFAULT, useTareasExternasUpdate } from "./context/TareasExternasContext";


function App() {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [mensajeAlerta, setMensajeAlerta] = useState('')
  const { asignaConectado, asignaSucursalActual } = useTareasExternasUpdate()

  function handleLogout() {
    asignaConectado(false)
    setIsLoggedIn(false)
    navigate('/login')
  }

  function handleLogin({usuario, nombre}) {
    asignaConectado(true)
    asignaSucursalActual(SUCURSAL_DEFAULT)
    setIsLoggedIn(true)
    navigate('/tracking/pendiente-recoleccion')
  }

  function muestraAlerta(mensaje) {
    setMensajeAlerta(mensaje)
    setShowAlert(true)
  }

  return (
    <>
      {
        isLoggedIn && (
          <IdleTimeoutHandler onLogout={() => handleLogout()} />
        )
      }
      <Container>
        <GlobalNavbar isLoggedIn={isLoggedIn} onLogout={() => handleLogout()} />
        <Alert show={showAlert} variant='success' onClose={() => setShowAlert(false)} dismissible>{mensajeAlerta}</Alert>
        
        <Routes>
          <Route path='/login' element={<Login onLogin={handleLogin} />} />
          <Route path='/' element={<Home />} />

          <Route path='/tracking' element={<ProtectedLayout isLoggedIn={isLoggedIn} />} >
            <Route path='alta' element={<Alta onExito={muestraAlerta} />} />
            <Route path='pendiente-recoleccion' element={<PendienteRecoleccion onContinuar={muestraAlerta} onBorraTarea={muestraAlerta}/>} />
            <Route path='recolectados-para-atenderse' element={<RecolectadosParaAtenderse onContinuar={muestraAlerta} />} />
            <Route path='recibidos-para-atenderse' element={<RecibidosParaAtenderse onContinuar={muestraAlerta} />} />
            <Route path='terminados-para-recolectar' element={<TerminadosParaRecolectar onContinuar={muestraAlerta} />} />
            <Route path='recolectados-para-entrega' element={<RecolectadosParaEntrega onContinuar={muestraAlerta} />} />
            <Route path='entregados-a-sucursal-origen' element={<EntregadosASucursalOrigen onContinuar={muestraAlerta} />} />
          </Route>
        </Routes>
      </Container>
    </>
  );
}

export default App;
