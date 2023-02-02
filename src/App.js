import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Container } from 'react-bootstrap'
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
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  function handleLogout() {
    setIsLoggedIn(false)
    navigate('/login')
  }

  function handleLogin() {
    setIsLoggedIn(true)
    navigate('/tracking/pendiente-recoleccion')
  }

  if (!isLoggedIn) {
    return (
      <>
        <Header isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path='/login' element={<Login onLogin={() => handleLogin()} />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </>
    )
  } 

  return (
    <>
      <IdleTimeoutHandler onLogout={() => handleLogout()} />
      <Container>
        <Header isLoggedIn={isLoggedIn} onLogout={() => handleLogout()} />
        <Routes>
          <Route path='/logout' element={<Logout onLogout={() => handleLogout() } />} />
          <Route path='/login' element={<Login onLogin={() => handleLogin()} />} />
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
      </Container>
    </>
  );
}

export default App;
