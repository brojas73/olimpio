import { useState } from 'react'
import { Row } from "react-bootstrap"
import { STATUS_TAREA, useTareasExternas, useTareasExternasUpdate } from "../../context/TareasExternasContext"
import TareasExternasHeader from "./TareasExternasHeader"
import TareaExterna from "./TareaExternaCard"
import ConfirmacionActualizacion from './ConfirmacionActualizacion'

const RecibidosParaAtenderse = ({onContinuar}) => {
  const { 
    tareasExternas, 
    sucursalActual,
    ticketFiltro,
    sucursalFiltro, 
    tipoTrabajoFiltro, 
    tipoServicioFiltro 
  } = useTareasExternas()
  const { actualizaTareaExterna } = useTareasExternasUpdate()
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false)
  const [idTareaExterna, setIdTareaExterna] = useState(0)

  function onAccionContinuar(id_tarea_externa) {
    setIdTareaExterna(id_tarea_externa)
    setMostrarConfirmacion(true)
  }

  function accionContinuar() {
    actualizaTareaExterna(idTareaExterna, STATUS_TAREA.TERMINADO_PARA_RECOLECTAR).then(data => {
      if (data.status === 200) {
        onContinuar(data.mensaje)
      }
    })
  }

  // Obtengo las tareas que voy a desplegar
  const tareas = tareasExternas.filter(tareaExterna => 
    tareaExterna.id_estado_tarea === STATUS_TAREA.RECIBIDO_PARA_ATENDERSE  &&
    tareaExterna.id_sucursal_destino === parseInt(sucursalActual) &&
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
        body='¿Seguro que quieres terminar la tarea?'
        onContinuar={accionContinuar}
      />
      <TareasExternasHeader renglones={tareas.length}/>
      <Row xs={1} md={1} className="g-3">
      {
        tareas.map(tareaExterna => (
          <TareaExterna 
              tareaExterna={tareaExterna} 
              tituloContinuar="Terminar" 
              accionContinuar={() => onAccionContinuar(tareaExterna.id_tarea_externa)} 
              key={tareaExterna.id_tarea_externa} 
          />
        ))
      }               
      </Row>
    </>
  )
}

export default RecibidosParaAtenderse
