import { Row } from "react-bootstrap"
import { STATUS_TAREA, useTareasExternas, useTareasExternasUpdate } from "../../context/TareasExternasContext"
import Filtros from "./Filtros"
import TareaExterna from "./TareaExternaCard"
import TituloTareas from "./TituloTareas"

const EntregadosASucursalOrigen = ({onContinuar}) => {
  const { sucursalActual, tareasExternas } = useTareasExternas()
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
      <Row xs={1} md={2} className="g-1">
      {
        tareasExternas.filter(tareaExterna => tareaExterna.id_estado_tarea === STATUS_TAREA.ENTREGADO_A_SUCURSAL_ORIGEN  &&
                                              tareaExterna.id_sucursal_origen === sucursalActual)
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
