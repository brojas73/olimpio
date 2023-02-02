import { Row } from "react-bootstrap"
import { STATUS_TAREA, useTareasExternas, useTareasExternasUpdate } from "../../context/TareasExternasContext"
import Filtros from "./Filtros"
import TareaExterna from "./TareaExternaCard"
import TituloTareas from "./TituloTareas"

const TerminadosParaRecolectar = () => {
  const { tareasExternas, sucursalActual } = useTareasExternas()
  const { recolectaParaEntrega } = useTareasExternasUpdate()

  return (
    <>
      <Filtros />
      <TituloTareas titulo='Terminados para Recolectar' />
      <Row xs={1} md={2} className="g-1">
      {
        tareasExternas.filter(tareaExterna => tareaExterna.id_estado_tarea === STATUS_TAREA.TERMINADO_PARA_RECOLECTAR &&
                                              tareaExterna.id_sucursal_destino === sucursalActual)
                      .map(tareaExterna => (
          <TareaExterna tareaExterna={tareaExterna} tituloContinuar="Recolectar" accionContinuar={recolectaParaEntrega} key={tareaExterna.id_tarea_externa} />
        ))
      }
      </Row>       
    </>
  )
}

export default TerminadosParaRecolectar
