import { Navbar, Offcanvas } from "react-bootstrap"
import EstadosTareaDropDown from "../comun/EstadosTareaDropDown"

const Filtros = () => {
    return (
        <Navbar expand='sm' className="mb-3">
            <Navbar.Toggle aria-controls="offcanvasNavbar-expand-sm"/>
            <Navbar.Offcanvas aria-labelledby="offcanvasNavbarLabel-expand-sm">
                <Offcanvas.Header closeButton>Filtros</Offcanvas.Header>
                    <Offcanvas.Body>
                        <EstadosTareaDropDown />
                    </Offcanvas.Body>
            </Navbar.Offcanvas>
        </Navbar>
    )
}

export default Filtros
