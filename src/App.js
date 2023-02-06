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
import { SUCURSAL_DEFAULT, useTareasExternas, useTareasExternasUpdate } from "./context/TareasExternasContext";


function App() {
  const navigate = useNavigate()
  const [muestraAlerta, setMuestraAlerta] = useState(false)
  const [mensajeAlerta, setMensajeAlerta] = useState('')
  const [tipoAlerta, setTipoAlerta] = useState('success')
  const { asignaConectado, asignaSucursalActual } = useTareasExternasUpdate()
  const { conectado } = useTareasExternas()

  function handleLogout() {
    asignaConectado(false)
    navigate('/login')
  }

  function handleLoginOk({usuario, nombre}) {
    asignaConectado(true)
    asignaSucursalActual(SUCURSAL_DEFAULT)
    navigate('/tracking/pendiente-recoleccion')
  }

  function handleLoginFail(mensaje) {
    despliegaAlerta(mensaje, 'danger')
  }

  function despliegaAlerta(mensaje, tipoAlerta='success') {
    setMensajeAlerta(mensaje)
    setTipoAlerta(tipoAlerta)
    setMuestraAlerta(true)
    window.setTimeout(() => {
      setMuestraAlerta(false)
    }, 4000)
  }

  return (
    <>
      {
        conectado && (
          <IdleTimeoutHandler onLogout={() => handleLogout()} />
        )
      }
      <Container>
        <GlobalNavbar onLogout={() => handleLogout()} />
        <Alert show={muestraAlerta} variant={tipoAlerta} onClose={() => setMuestraAlerta(false)} dismissible>{mensajeAlerta}</Alert>
        
        <Routes>
          <Route path='/login' element={<Login onLoginOk={handleLoginOk} onLoginFail={handleLoginFail}/>} />
          <Route path='/' element={<Home />} />

          <Route path='/tracking' element={<ProtectedLayout />} >
            <Route path='alta' element={<Alta onExito={despliegaAlerta} />} />
            <Route path='pendiente-recoleccion' element={<PendienteRecoleccion onContinuar={despliegaAlerta} onBorraTarea={despliegaAlerta}/>} />
            <Route path='recolectados-para-atenderse' element={<RecolectadosParaAtenderse onContinuar={despliegaAlerta} />} />
            <Route path='recibidos-para-atenderse' element={<RecibidosParaAtenderse onContinuar={despliegaAlerta} />} />
            <Route path='terminados-para-recolectar' element={<TerminadosParaRecolectar onContinuar={despliegaAlerta} />} />
            <Route path='recolectados-para-entrega' element={<RecolectadosParaEntrega onContinuar={despliegaAlerta} />} />
            <Route path='entregados-a-sucursal-origen' element={<EntregadosASucursalOrigen onContinuar={despliegaAlerta} />} />
          </Route>
        </Routes>
      </Container>
    </>
  );
}

export default App;
