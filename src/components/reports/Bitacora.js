import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from 'react-bootstrap-table2-paginator'
import { useEffect, useState } from 'react'
import { Badge, Button, Container, Navbar, Spinner } from "react-bootstrap"
import { URL_APIS } from '../../context/TareasExternasContext'
import { fechaFormatter, fetchData } from '../comun/Funciones'
import Filtros from "./Filtros"
import TareaExternaModal from "./TareaExternaModal"

export default function Bitacora() {
  const [bitacora, setBitacora] = useState([])
  const [loading, setLoading] = useState(false)
  const [idTareaExterna, setIdTareaExterna] = useState(0)
  const [muestraTareaExterna, setMuestraTareaExterna] = useState(false)
  const [ticketFiltro, setTicketFiltro] = useState('')
  const [descripcionFiltro, setDescripcionFiltro] = useState('')

  function isBlank(str) {
    return (!str || /^\s*$/.test(str))
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

  const tableRowEvents = {
    onDoubleClick: (e, row, rowIndex) => {
      setIdTareaExterna(row.id_tarea_externa)
      setMuestraTareaExterna(true)
    }
  }

  const columns = [
    { dataField: "sucursal_origen", text: "Sucursal", sort: true},
    { dataField: "ticket", text: "Ticket", sort: true},
    { dataField: "descripcion", text: "Descripción", sort: true },
    { dataField: "tipo_accion", text: "Acción", sort: true },
    { dataField: "fecha", text: "Fecha", sort: true, formatter: fechaFormatter},
    { dataField: "usuario", text: "Usuario", sort: true },
    { dataField: "estado_fin", text: "Estado Final", sort: true },
    { dataField: "estado_ini", text: "Estado Inicial", sort: true },
  ]

  return (
    <>
      <TareaExternaModal 
        show={muestraTareaExterna} 
        setShow={setMuestraTareaExterna} 
        idTareaExterna={idTareaExterna}
      />
      <Filtros 
        ticketFiltro={ticketFiltro} 
        descripcionFiltro={descripcionFiltro} 
        setTicketFiltro={setTicketFiltro}
        setDescripcionFiltro={setDescripcionFiltro}
      />
      {
        loading ? (
          <Spinner animation="border" />
        ) : (
          <>
            <Navbar>
              <Container className="justify-content-start">
                <Button variant="dark" size="lg">
                    Bitácora de Tareas { " "}
                    <Badge bg="primary">{bitacora.length}</Badge>
                </Button>
              </Container>
            </Navbar>

            <BootstrapTable 
              keyField="id" 
              data={bitacora} 
              columns={columns} 
              striped hover condensed 
              pagination={paginationFactory()}
              rowEvents={tableRowEvents}
            />
          </>
        )
      }
    </>
  )
}
