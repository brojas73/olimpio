import { Row  } from "react-bootstrap"
import { STATUS_TAREA, useTareasExternas, useTareasExternasUpdate } from "../../context/TareasExternasContext"
import TareasExternasHeader from "./TareasExternasHeader"
import TareaExterna from "./TareaExternaCard"

const RecolectadosParaAtenderse = ({onContinuar}) => {
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
    actualizaTareaExterna(id_tarea_externa, STATUS_TAREA.RECIBIDO_PARA_ATENDERSE).then(data => {
      if (data.status === 200) {
        onContinuar(data.mensaje)
      }
    })
  }

  return (
    <>
      <TareasExternasHeader />
      <Row xs={1} md={1} className="g-3">
      {
        tareasExternas.filter(tareaExterna => 
                                // eslint-disable-next-line eqeqeq
                                tareaExterna.id_estado_tarea == STATUS_TAREA.RECOLECTADO_PARA_ATENDERSE &&
                                // eslint-disable-next-line eqeqeq
                                tareaExterna.id_sucursal_destino == sucursalActual &&
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

export default RecolectadosParaAtenderse 