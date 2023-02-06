import { Link } from "react-router-dom"
import { Navbar, Container, Offcanvas, Nav, NavDropdown } from "react-bootstrap"
import Sucursales from "./Sucursales"
import { useAuth } from '../../hooks/useAuth'
import { useTareasExternas } from "../../context/TareasExternasContext"

// const GlobalNavbar = ({isLoggedIn, onLogout}) => {
const GlobalNavbar = ({onLogout}) => {
        const { logout, credenciales } = useAuth()
    const { conectado } = useTareasExternas()

    function handleLogout() {
        logout()
        onLogout()
    }

    return (
        <Navbar bg='dark' variant="dark" expand='sm' className="mb-3"> 
            <Container fluid>
                <Navbar.Brand as={Link} to="/" className="mx-3">Olimpio</Navbar.Brand>
                <Navbar.Toggle aria-controls="offcanvasNavbar-expand-sm"/>
                <Navbar.Offcanvas aria-labelledby="offcanvasNavbarLabel-expand-sm">
                    <Offcanvas.Header closeButton>Olimpio</Offcanvas.Header>
                    {
                        // isLoggedIn && (
                        conectado && (
                                <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <Sucursales />
                                    <NavDropdown title={credenciales.nombre}>
                                        <NavDropdown.Item tag={Link} to='/login' onClick={handleLogout}>Salir</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Offcanvas.Body>
                        )
                    }
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    )
}

export default GlobalNavbar
