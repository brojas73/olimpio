import { Link } from "react-router-dom"
import { Navbar, Offcanvas, Nav } from "react-bootstrap"
import { useTareasExternas } from "../../context/TareasExternasContext"
import SucursalesDropDown from "./SucursalesDropDown"
import UsuarioDropDown from "./UsuarioDropDown"

const GlobalNavbar = ({onLogout}) => {
    const { conectado } = useTareasExternas()

    return (
        <Navbar bg='dark' variant="dark" expand='sm' className="mb-3"> 
            <Navbar.Brand as={Link} to="/" className="mx-3">Olimpio</Navbar.Brand>
            <Navbar.Toggle aria-controls="offcanvasNavbar-expand-sm"/>
            <Navbar.Offcanvas aria-labelledby="offcanvasNavbarLabel-expand-sm">
                <Offcanvas.Header closeButton>Olimpio</Offcanvas.Header>
                {
                    conectado && (
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <SucursalesDropDown />
                                <UsuarioDropDown onLogout={onLogout}/>
                            </Nav>
                        </Offcanvas.Body>
                    )
                }
            </Navbar.Offcanvas>
        </Navbar>
    )
}

export default GlobalNavbar
