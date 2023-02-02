import { Table } from "react-bootstrap"
import { STATUS_TAREA, useTareasExternas, useTareasExternasUpdate } from "../../context/TareasExternasContext"
import Filtros from "./Filtros"
import TareaExterna from "./TareaExternaTable"

const TerminadosParaRecolectar = () => {
  const { tareasExternas, sucursalActual } = useTareasExternas()
  const { recolectaParaEntrega } = useTareasExternasUpdate()

  return (
    <>
      <Filtros titulo='Terminados para Recolectar' />
      <Table striped bordered hover size='sm'>
        <thead>
            <tr>
              <th>Ticket</th>
              <th>Descripción</th>
              <th>Tipo de Trabajo</th>
              <th>Sucursal Origen</th>
              <th>Tipo de Servicio</th>
              <th>Fecha y Hora Rquerida</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              tareasExternas.filter(tareaExterna => tareaExterna.id_estado_tarea === STATUS_TAREA.TERMINADO_PARA_RECOLECTAR &&
                                                    tareaExterna.id_sucursal_destino === sucursalActual)
                            .map(tareaExterna => (
                <TareaExterna tareaExterna={tareaExterna} tituloContinuar="Recolectar" accionContinuar={recolectaParaEntrega} key={tareaExterna.id_tarea_externa} />
              ))
            }       
          </tbody>
      </Table>
    </>
  )
}

export default TerminadosParaRecolectar
