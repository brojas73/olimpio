import { Badge, Button, Container, Navbar, Spinner } from "react-bootstrap"
import { URL_APIS, useTareasExternas } from '../../context/TareasExternasContext'
import { useEffect, useState } from 'react'
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from 'react-bootstrap-table2-paginator'
import { fechaFormatter, fetchData, ticketFormatter } from '../comun/Funciones'
import TareaExternaModal from "./TareaExternaModal"

export default function TareasPorAtenderseHoy() {
  const [tareas, setTareas] = useState([])
  const [loading, setLoading] = useState(false)
  const [idTareaExterna, setIdTareaExterna] = useState(0)
  const [muestraTareaExterna, setMuestraTareaExterna] = useState(false)
  const { sucursalActual } = useTareasExternas()

  useEffect(() => {
    async function fetchTareas (id_sucursal_destino) {
      setLoading(true)
      await fetchData(`${URL_APIS}/tareas-por-atenderse-hoy/${id_sucursal_destino}`)
              .then(data => {
                setTareas([...data])
                setLoading(false)
              }) 
    }

    fetchTareas(sucursalActual)
  }, [sucursalActual])

  const tableRowEvents = {
    onDoubleClick: (e, row, rowIndex) => {
      setIdTareaExterna(row.id_tarea_externa)
      setMuestraTareaExterna(true)
    }
  }

  const columns = [
    { dataField: "ticket", text: "Ticket", sort: true, formatter: ticketFormatter},
    { dataField: "descripcion", text: "Descripción", sort: true },
    { dataField: "sucursal_origen", text: "Sucursal Origen", sort: true },
    { dataField: "tipo_trabajo", text: "Tipo de Trabajo", sort: true },
    { dataField: "tipo_servicio", text: "Tipo de Servicio", sort: true },
    { dataField: "fecha_requerida", text: "Fecha Requerida", sort: true, formatter: fechaFormatter},
  ]

  return (
    <>
      <TareaExternaModal 
        show={muestraTareaExterna} 
        setShow={setMuestraTareaExterna} 
        idTareaExterna={idTareaExterna}
      />
      {
        loading ? (
          <Spinner animation="border" />
        ) : (
          <>
            <Navbar>
              <Container className="justify-content-start">
                <Button variant="dark" size="lg">
                    Tareas por Atenderse Hoy { " "}
                    <Badge bg="primary">{tareas.length}</Badge>
                </Button>
              </Container>
            </Navbar>

            <BootstrapTable 
              keyField="id_tarea_externa" 
              data={tareas} 
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
