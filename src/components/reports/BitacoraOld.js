import { Col, Form, Navbar, Offcanvas, Row, Table } from "react-bootstrap"
import { URL_APIS } from '../../context/TareasExternasContext'
import { useEffect, useState } from 'react'

export default function Bitacora() {
  const [bitacora, setBitacora] = useState([])
  const [loading, setLoading] = useState(false)
  const [ticketFiltro, setTicketFiltro] = useState('')
  const [descripcionFiltro, setDescripcionFiltro] = useState('')

  function isBlank(str) {
    return (!str || /^\s*$/.test(str))
  }

  async function fetchData(url) { 
    return await fetch(url).then(response => response.json())
  }    

  useEffect(() => {
    async function fetchBitacora (ticket, descripcion) {
      const parametroTicket = isBlank(ticket) ? '%' : ticket.trim() 
      const parametroDescripcion = isBlank(descripcion) ? '%' : descripcion.trim()  
      setLoading(true)
      await fetchData(`${URL_APIS}/tareas-externas-log?ticket=${parametroTicket}&descripcion=${parametroDescripcion}`)
              .then(data => {
                setBitacora([...data])
                setLoading(false)
              }) 
    }

    fetchBitacora(ticketFiltro, descripcionFiltro)
  }, [ticketFiltro, descripcionFiltro])

  return (
    <>
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
                className="ticket"
                aria-label="Search"
                value={ticketFiltro}
                onChange={e => setTicketFiltro(e.target.value.toUpperCase())}
              />
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
              <Form.Control
                type='search'
                placeholder="Descripción..."
                className="descripcion"
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
      <Table striped bordered hover size='sm' responsive="lg"> 
        <thead>
          <tr>
            <th>Ticket</th>
            <th>Descripción</th>
            <th>Acción</th>
            <th>Fecha</th>
            <th>Usuario</th>
            <th>Estado Final</th>
            <th>Estado Inicial</th>
          </tr>
        </thead>
        <tbody>
          {
            bitacora && bitacora.map(renglon => (
              <tr>
                <td>{renglon.ticket}</td>
                <td>{renglon.descripcion}</td>
                <td>{renglon.tipo_accion}</td>
                <td>{renglon.fecha}</td>
                <td>{renglon.nombre}</td>
                <td>{renglon.estado_fin}</td>
                <td>{renglon.estado_ini}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </>
  )
}
