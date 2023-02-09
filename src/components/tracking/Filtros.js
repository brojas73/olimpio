import { Form, Nav, Navbar, Offcanvas } from "react-bootstrap"
import { useTareasExternas, useTareasExternasUpdate } from "../../context/TareasExternasContext"
import EstadosTareaDropDown from "../comun/EstadosTareaDropDown"
import SucursalesDropDown from "../comun/SucursalesDropDown"
import TiposServicioDropDown from "../comun/TiposServicioDropDown"
import TiposTrabajoDropDown from "../comun/TiposTrabajoDropDown"

const Filtros = () => {
    const { 
        ticketFiltro,
        sucursalFiltro,  
        tipoServicioFiltro, 
        tipoTrabajoFiltro,  
        estadoActual, 
        getSucursal, 
        getTipoServicio, 
        getTipoTrabajo, 
        getEstadoTarea  
    } = useTareasExternas()

    const { 
        asignaTicketFiltro, 
        asignaSucursalFiltro, 
        asignaTipoTrabajoFiltro, 
        asignaTipoServicioFiltro, 
        asignaEstadoActual 
    } = useTareasExternasUpdate()

    function onSubmit(event) {
        event.preventDefault()
    }

    return (
        <Navbar expand='sm' className="mb-3">
            <Navbar.Toggle aria-controls="offcanvasNavbar-expand-sm"/>
            <Navbar.Offcanvas aria-labelledby="offcanvasNavbarLabel-expand-sm">
                <Offcanvas.Header closeButton>Filtros</Offcanvas.Header>
                    <Offcanvas.Body>
                        <Form onSubmit={onSubmit}>
                            <Form.Control
                                type='search'
                                placeholder="Buscar ticket..."
                                className="ticket"
                                aria-label="Search"
                                value={ticketFiltro}
                                onChange={e => asignaTicketFiltro(e.target.value)}
                            />
                        </Form>
                        <Nav className="flex-grow-1 pe-3">
                            <SucursalesDropDown 
                                title={getSucursal(sucursalFiltro)} 
                                titleOption={true}
                                onClick={asignaSucursalFiltro} 
                            />
                            <TiposTrabajoDropDown 
                                title={getTipoTrabajo(tipoTrabajoFiltro)} 
                                titleOption={true}
                                onClick={asignaTipoTrabajoFiltro} 
                            />
                            <TiposServicioDropDown 
                                title={getTipoServicio(tipoServicioFiltro)} 
                                titleOption={true}
                                onClick={asignaTipoServicioFiltro} 
                            />
                            <EstadosTareaDropDown 
                                title={getEstadoTarea(estadoActual)}
                                onClick={asignaEstadoActual}
                            />
                        </Nav>
                    </Offcanvas.Body>
            </Navbar.Offcanvas>
        </Navbar>
    )
}

export default Filtros
