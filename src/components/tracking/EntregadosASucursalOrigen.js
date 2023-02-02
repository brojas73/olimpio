import { Row } from "react-bootstrap"
import { STATUS_TAREA, useTareasExternas, useTareasExternasUpdate } from "../../context/TareasExternasContext"
import Filtros from "./Filtros"
import TareaExterna from "./TareaExternaCard"
import TituloTareas from "./TituloTareas"

const EntregadosASucursalOrigen = () => {
  const { sucursalActual, tareasExternas } = useTareasExternas()
  const { entregaACliente } = useTareasExternasUpdate()

  return (
    <>
      <Filtros />
      <TituloTareas titulo='Entregados a Sucursal Origen'/>
      <Row xs={1} md={2} className="g-1">
      {
        tareasExternas.filter(tareaExterna => tareaExterna.id_estado_tarea === STATUS_TAREA.ENTREGADO_A_SUCURSAL_ORIGEN  &&
                                              tareaExterna.id_sucursal_destino === sucursalActual)
                      .map(tareaExterna => (
          <TareaExterna tareaExterna={tareaExterna} tituloContinuar="Entregar" accionContinuar={entregaACliente} key={tareaExterna.id_tarea_externa} />
        ))
      }
      </Row>
    </>
  )
}

export default EntregadosASucursalOrigen
