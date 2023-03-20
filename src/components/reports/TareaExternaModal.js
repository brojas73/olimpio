import { useEffect, useState } from 'react'
import { Card, Col, Modal} from "react-bootstrap"
import { TIPOS_SERVICIO, URL_APIS, useTareasExternas } from '../../context/TareasExternasContext'
import { FaArrowAltCircleRight } from 'react-icons/fa'
import { formateaFecha, formateaFechaHora, fetchData } from "../comun/Funciones"

const TareaExternaModal = ({show, setShow, idTareaExterna}) => {
  const [tareaExterna, setTareaExterna] = useState(null)
  const { getSucursal, getTipoServicio, getTipoTrabajo, getEstadoTarea, getUsuario } = useTareasExternas()

  function handleClose() {
    setShow(false)
  }

  useEffect(() => {
    async function fetchTareaExterna() {
        await fetchData(`${URL_APIS}/tareas-externas/${idTareaExterna}`)
        .then(data => {
          setTareaExterna(data[0])
        }) 
    }

    if (idTareaExterna && idTareaExterna > 0) {
      fetchTareaExterna()
    }
  }, [idTareaExterna])

  return (
    <>
    {
      tareaExterna &&  (
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <Col>
              <Card border={tareaExterna.id_tipo_servicio === TIPOS_SERVICIO.EXPRESS ? 'danger' : ''} >
                  <Card.Header>
                      <Card.Subtitle className="text-primary">{getEstadoTarea(tareaExterna.id_estado_tarea)}</Card.Subtitle>
                      <div className="d-flex justify-content-between align-items-center">
                          <Card.Title>Ticket: {tareaExterna.ticket.padStart(6, '0')}</Card.Title>
                          <Card.Subtitle>
                          { getSucursal(tareaExterna.id_sucursal_origen) }
                          { " " } <FaArrowAltCircleRight /> { " " }
                          { getSucursal(tareaExterna.id_sucursal_destino) }
                          </Card.Subtitle>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                          <small>{formateaFecha(tareaExterna.fecha_creacion)}</small>
                          <small>{getUsuario(tareaExterna.id_creado_por)}</small>
                      </div>
                  </Card.Header>
                  <Card.Body>
                      <Card.Subtitle>
                          {getTipoTrabajo(tareaExterna.id_tipo_trabajo)} { " - "}
                          {getTipoServicio(tareaExterna.id_tipo_servicio)}
                      </Card.Subtitle>
                      <Card.Text>
                          {tareaExterna.descripcion}
                      </Card.Text>
                  </Card.Body>
                  <Card.Footer className="d-flex justify-content-between align-items-center">
                    <div>
                        <small>Entregar: {formateaFechaHora(tareaExterna.fecha_requerida, tareaExterna.hora_requerida)}</small>
                    </div>
                  </Card.Footer>
              </Card>
            </Col>
          </Modal.Body>
        </Modal>
      )
    }
    </>
  )
}

export default TareaExternaModal
