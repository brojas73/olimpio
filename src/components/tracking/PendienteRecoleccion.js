import { useState } from "react"
import { Row } from "react-bootstrap"
import { STATUS_TAREA, useTareasExternas, useTareasExternasUpdate } from "../../context/TareasExternasContext"
import TareasExternasHeader from "./TareasExternasHeader"
import TareaExterna from "./TareaExternaCard"
import ConfirmacionActualizacion from './ConfirmacionActualizacion'

const PendienteRecoleccion = ({onContinuar, onBorraTarea}) => {
  const { tareasExternas, sucursalActual, ticketFiltro, sucursalFiltro, tipoTrabajoFiltro, tipoServicioFiltro } = useTareasExternas()
  const { actualizaTareaExterna, borraTareaExterna } = useTareasExternasUpdate()
  const [mensajeConfirmacion, setMensajeConfirmacion] = useState('')
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false)
  const [borrando, setBorrando] = useState(false)
  const [idTareaExterna, setIdTareaExterna] = useState(0)

  function onAccionBorrar(id_tarea_externa) {
    setMensajeConfirmacion('¿Seguro que quieres borrar la tarea?')
    setMostrarConfirmacion(true)
    setBorrando(true)
    setIdTareaExterna(id_tarea_externa)
  }

  function onAccionContinuar(id_tarea_externa) {
    setMensajeConfirmacion('¿Seguro que quieres recolectar la tarea?')
    setMostrarConfirmacion(true)
    setBorrando(false)
    setIdTareaExterna(id_tarea_externa)
  }

  function accionBorrar() {
    borraTareaExterna(idTareaExterna).then(data => {
      if (data.status === 200) {
        onBorraTarea(data.mensaje)
      }
    })
  }

  function accionContinuar() {
    actualizaTareaExterna(idTareaExterna, STATUS_TAREA.RECOLECTADO_PARA_ATENDERSE).then(data => {
      if (data.status === 200) {
        onContinuar(data.mensaje)
      }
    })
  }

  // Filtro las tareas que voy a desplegar
  const tareas = tareasExternas.filter(tareaExterna => 
                    tareaExterna.id_estado_tarea === STATUS_TAREA.PENDIENTE_RECOLECCION &&
                    tareaExterna.id_sucursal_origen === parseInt(sucursalActual) &&
                    (ticketFiltro.length === 0 || (ticketFiltro.length > 0 && tareaExterna.ticket.startsWith(ticketFiltro))) &&
                    (sucursalFiltro === 0 || (sucursalFiltro !== 0 && (tareaExterna.id_sucursal_origen === sucursalFiltro || tareaExterna.id_sucursal_destino === sucursalFiltro))) &&
                    (tipoTrabajoFiltro === 0 || (tipoTrabajoFiltro !== 0 && tareaExterna.id_tipo_trabajo === tipoTrabajoFiltro)) &&
                    (tipoServicioFiltro === 0 || (tipoServicioFiltro !== 0 && tareaExterna.id_tipo_servicio === tipoServicioFiltro))
                )

  return (
    <>
      <ConfirmacionActualizacion 
        show={mostrarConfirmacion} 
        setShow={setMostrarConfirmacion}
        title='Confirmación' 
        body={mensajeConfirmacion}
        onContinuar={borrando ? accionBorrar : accionContinuar }
      />
      <TareasExternasHeader renglones={tareas.length}/>
      <Row xs={1} md={1} className="g-3">
      {
        tareas.map(tareaExterna => (
          <TareaExterna 
              tareaExterna={tareaExterna} 
              tituloBorrar="Borrar" 
              accionBorrar={() => onAccionBorrar(tareaExterna.id_tarea_externa)} 
              tituloContinuar="Recolectar" 
              accionContinuar={() => onAccionContinuar(tareaExterna.id_tarea_externa)} 
              key={tareaExterna.id_tarea_externa} 
          />
        ))
      }
      </Row>
    </>
  )
}

export default PendienteRecoleccion
