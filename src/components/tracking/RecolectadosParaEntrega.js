import { Row } from "react-bootstrap"
import { STATUS_TAREA, useTareasExternas, useTareasExternasUpdate } from "../../context/TareasExternasContext"
import Filtros from "./Filtros"
import TareaExterna from "./TareaExternaCard"
import TituloTareas from "./TituloTareas"

const RecolectadosParaEntrega = () => {
  const { sucursalActual, tareasExternas } = useTareasExternas()
  const { entregaASucursalOrigen } = useTareasExternasUpdate()

  return (
    <>
      <Filtros />
      <TituloTareas titulo='Recolectados para Entrega' />
      <Row xs={1} md={2} className="g-1">
      {
        tareasExternas.filter(tareaExterna => tareaExterna.id_estado_tarea === STATUS_TAREA.RECOLECTADO_PARA_ENTREGA  &&
                                              tareaExterna.id_sucursal_destino === sucursalActual)
                      .map(tareaExterna => (
          <TareaExterna tareaExterna={tareaExterna} tituloContinuar="Entregar" accionContinuar={entregaASucursalOrigen} key={tareaExterna.id_tarea_externa} />
        ))
      }
      </Row>       
    </>
  )
}

export default RecolectadosParaEntrega
