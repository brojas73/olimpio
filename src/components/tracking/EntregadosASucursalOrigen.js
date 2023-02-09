import { Row } from "react-bootstrap"
import { STATUS_TAREA, useTareasExternas, useTareasExternasUpdate } from "../../context/TareasExternasContext"
import Filtros from "./Filtros"
import TareaExterna from "./TareaExternaCard"
import TituloTareas from "./TituloTareas"

const EntregadosASucursalOrigen = ({onContinuar}) => {
  const { 
    sucursalActual, 
    tareasExternas, 
    ticketFiltro,
    sucursalFiltro, 
    tipoTrabajoFiltro, 
    tipoServicioFiltro 
  } = useTareasExternas()
  const { actualizaTareaExterna } = useTareasExternasUpdate()

  function onAccionContinuar(id_tarea_externa) {
    actualizaTareaExterna(id_tarea_externa, STATUS_TAREA.RECIBIDO_EN_SUCURSAL_ORIGEN).then(data => {
      if (data.status === 200) {
        onContinuar(data.mensaje)
      }
    })
  }


  return (
    <>
      <Filtros />
      <TituloTareas titulo='Entregados a Sucursal Origen'/>
      <Row xs={1} md={1} className="g-3">
      {
        tareasExternas.filter(tareaExterna => 
                                tareaExterna.id_estado_tarea === STATUS_TAREA.ENTREGADO_A_SUCURSAL_ORIGEN  &&
                                tareaExterna.id_sucursal_origen === sucursalActual &&
                                (ticketFiltro.length === 0 || (ticketFiltro.length > 0 && tareaExterna.ticket.startsWith(ticketFiltro))) &&
                                (sucursalFiltro === 0 || (sucursalFiltro !== 0 && (tareaExterna.id_sucursal_origen === sucursalFiltro || tareaExterna.id_sucursal_destino === sucursalFiltro))) &&
                                (tipoTrabajoFiltro === 0 || (tipoTrabajoFiltro !== 0 && tareaExterna.id_tipo_trabajo === tipoTrabajoFiltro)) &&
                                (tipoServicioFiltro === 0 || (tipoServicioFiltro !== 0 && tareaExterna.id_tipo_servicio === tipoServicioFiltro))  
                             )
                      .map(tareaExterna => (
          <TareaExterna 
              tareaExterna={tareaExterna} 
              tituloContinuar="Recibir" 
              accionContinuar={() => onAccionContinuar(tareaExterna.id_tarea_externa)} 
              key={tareaExterna.id_tarea_externa} 
          />
        ))
      }
      </Row>
    </>
  )
}

export default EntregadosASucursalOrigen
