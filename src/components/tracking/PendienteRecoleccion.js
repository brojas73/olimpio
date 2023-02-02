import { Row } from "react-bootstrap"
import { STATUS_TAREA, useTareasExternas, useTareasExternasUpdate } from "../../context/TareasExternasContext"
import Filtros from "./Filtros"
import TareaExterna from "./TareaExternaCard"
import TituloTareas from "./TituloTareas"

const PendienteRecoleccion = () => {
  const { tareasExternas, sucursalActual  } = useTareasExternas()
  const { recolectaParaAtenderse, borraTareaExterna } = useTareasExternasUpdate()

  return (
    <>
      <Filtros />
      <TituloTareas titulo='Pendiente de Recolección' />
      <Row xs={1} md={2} className="g-1">
      {
        tareasExternas.filter(tareaExterna => tareaExterna.id_estado_tarea === STATUS_TAREA.PENDIENTE_RECOLECCION &&
                                              tareaExterna.id_sucursal_origen === sucursalActual)
                      .map(tareaExterna => (
          <TareaExterna tareaExterna={tareaExterna} tituloBorrar="Borrar" accionBorrar={borraTareaExterna} tituloContinuar="Recolectar" accionContinuar={recolectaParaAtenderse} key={tareaExterna.id_tarea_externa} />
        ))
      }
      </Row>
    </>
  )
}

export default PendienteRecoleccion
