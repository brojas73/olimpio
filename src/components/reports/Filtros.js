import { Col, Form, Navbar, Offcanvas, Row } from "react-bootstrap"

const Filtros = ({ticketFiltro, descripcionFiltro, setTicketFiltro, setDescripcionFiltro}) => {
  return (
    <Navbar expand='sm' className="mb-3">
    <Navbar.Toggle aria-controls="offcanvasNavbar-expand-sm" />
    <Navbar.Offcanvas aria-labelledby="offcanvasNavbarLabel-expand-sm">
      <Offcanvas.Header closeButton>Filtros</Offcanvas.Header>
      <Offcanvas.Body>
        <Form>
          <Row>
            <Form.Group as={Col} className="mb-3">
              <Form.Control
                type='search'
                placeholder="Ticket..."
                // className="ticket"
                aria-label="Search"
                value={ticketFiltro}
                onChange={e => setTicketFiltro(e.target.value.toUpperCase())}
              />
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
              <Form.Control
                type='search'
                placeholder="Descripción..."
                // className="descripcion"
                aria-label="Search"
                value={descripcionFiltro}
                onChange={e => setDescripcionFiltro(e.target.value.toUpperCase())}
              />
            </Form.Group>
          </Row>
        </Form>
      </Offcanvas.Body>
    </Navbar.Offcanvas>
  </Navbar>
)
}

export default Filtros
