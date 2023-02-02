import { Row  } from "react-bootstrap"
import { STATUS_TAREA, useTareasExternas, useTareasExternasUpdate } from "../../context/TareasExternasContext"
import Filtros from "./Filtros"
import TareaExterna from "./TareaExternaCard"
import TituloTabla from "./TituloTabla"

const RecolectadosParaAtenderse = () => {
  const { tareasExternas, sucursalActual } = useTareasExternas()
  const { recibeParaAtenderse } = useTareasExternasUpdate()

  return (
    <>
      <Filtros />
      <TituloTabla titulo='Recolectados para Atenderse'/>
      <Row xs={1} md={2} className="g-1">
      {
        tareasExternas.filter(tareaExterna => tareaExterna.id_estado_tarea === STATUS_TAREA.RECOLECTADO_PARA_ATENDERSE &&
                                              tareaExterna.id_sucursal_destino === sucursalActual)
                      .map(tareaExterna => (
          <TareaExterna tareaExterna={tareaExterna} tituloContinuar="Recibir" accionContinuar={recibeParaAtenderse} key={tareaExterna.id_tarea_externa} />
        ))
      }     
      </Row>
    </>
  )
}

export default RecolectadosParaAtenderse 