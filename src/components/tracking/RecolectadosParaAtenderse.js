import { Row  } from "react-bootstrap"
import { STATUS_TAREA, useTareasExternas, useTareasExternasUpdate } from "../../context/TareasExternasContext"
import Filtros from "./Filtros"
import TareaExterna from "./TareaExternaCard"
import TituloTareas from "./TituloTareas"

const RecolectadosParaAtenderse = ({onContinuar}) => {
  const { tareasExternas, sucursalActual } = useTareasExternas()
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
      <Filtros />
      <TituloTareas titulo='Recolectados para Atenderse'/>
      <Row xs={1} md={2} className="g-1">
      {
        tareasExternas.filter(tareaExterna => tareaExterna.id_estado_tarea === STATUS_TAREA.RECOLECTADO_PARA_ATENDERSE &&
                                              tareaExterna.id_sucursal_destino === sucursalActual)
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