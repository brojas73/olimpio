import { Link } from "react-router-dom"
import { Navbar, Offcanvas, Nav } from "react-bootstrap"
import { useTareasExternas, useTareasExternasUpdate } from "../../context/TareasExternasContext"
import SucursalesDropDown from "./SucursalesDropDown"
import UsuarioDropDown from "./UsuarioDropDown"
import { useAuth } from "../../hooks/useAuth"

const GlobalNavbar = ({onLogout}) => {
    const { conectado, sucursalActual, getSucursal  } = useTareasExternas()
    const { asignaSucursalActual } = useTareasExternasUpdate()
    const { getUsuario } = useAuth()

    return (
        <Navbar bg="dark" variant="dark" expand='md' className="mb-3"> 
            <Navbar.Brand as={Link} to="/" className="mx-3">Olimpio</Navbar.Brand>
            <Navbar.Toggle aria-controls="offcanvasNavbar-expand-sm"/>
            <Navbar.Offcanvas aria-labelledby="offcanvasNavbarLabel-expand-sm">
                <Offcanvas.Header closeButton>Olimpio</Offcanvas.Header>
                {
                    conectado && (
                        <Offcanvas.Body>
                            <Nav className="justify-content-start flex-grow-1 pe-3">
                                <Nav.Link as={Link} to='/tracking/tareas-activas'>Tracking</Nav.Link>
                                <Nav.Link as={Link} to='/reports'>Consultas</Nav.Link>
                            </Nav>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <SucursalesDropDown title={getSucursal(sucursalActual)} onSelect={asignaSucursalActual} showIcon={true} />
                                <UsuarioDropDown title={getUsuario()} onLogout={onLogout}/>
                            </Nav>
                        </Offcanvas.Body>
                    )
                }
            </Navbar.Offcanvas>
        </Navbar>
    )
}

export default GlobalNavbar
