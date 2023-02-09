import { Row } from "react-bootstrap"
import { STATUS_TAREA, useTareasExternas, useTareasExternasUpdate } from "../../context/TareasExternasContext"
import Filtros from "./Filtros"
import TareaExterna from "./TareaExternaCard"
import TituloTareas from "./TituloTareas"

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

  function onAccionContinuar(id_tarea_externa) {
    actualizaTareaExterna(id_tarea_externa, STATUS_TAREA.TERMINADO_PARA_RECOLECTAR).then(data => {
      if (data.status === 200) {
        onContinuar(data.mensaje)
      }
    })
  }


  return (
    <>
      <Filtros />
      <TituloTareas titulo='Recibidos para Atenderse' />
      <Row xs={1} md={2} className="g-1">
        {
          tareasExternas.filter(tareaExterna => 
                                  tareaExterna.id_estado_tarea === STATUS_TAREA.RECIBIDO_PARA_ATENDERSE  &&
                                  tareaExterna.id_sucursal_destino === sucursalActual &&
                                  (ticketFiltro.length === 0 || (ticketFiltro.length > 0 && tareaExterna.ticket.startsWith(ticketFiltro))) &&
                                  (sucursalFiltro === 0 || (sucursalFiltro !== 0 && (tareaExterna.id_sucursal_origen === sucursalFiltro || tareaExterna.id_sucursal_destino === sucursalFiltro))) &&
                                  (tipoTrabajoFiltro === 0 || (tipoTrabajoFiltro !== 0 && tareaExterna.id_tipo_trabajo === tipoTrabajoFiltro)) &&
                                  (tipoServicioFiltro === 0 || (tipoServicioFiltro !== 0 && tareaExterna.id_tipo_servicio === tipoServicioFiltro))  
                               )   
                        .map(tareaExterna => (
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
