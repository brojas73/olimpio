import { Table } from "react-bootstrap"
import { STATUS_TAREA, useTareasExternas, useTareasExternasUpdate } from "../../context/TareasExternasContext"
import Filtros from "./Filtros"
import TareaExterna from "./TareaExternaTable"
import TituloTabla from "./TituloTabla"

const PendienteRecoleccion = () => {
  const { tareasExternas, sucursalActual  } = useTareasExternas()
  const { recolectaParaAtenderse, borraTareaExterna } = useTareasExternasUpdate()

  return (
    <>
      <Filtros />
      <TituloTabla titulo='Pendiente de Recolección' />
      {/* <Table striped bordered hover size='sm'> */}
      <Table>
        <thead>
          <tr>
            <th>Ticket</th>
            <th>Descripción</th>
            <th>Tipo de Trabajo</th>
            <th>Sucursal Destino</th>
            <th>Tipo de Servicio</th>
            <th>Fecha y Hora Rquerida</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            tareasExternas.filter(tareaExterna => tareaExterna.id_estado_tarea === STATUS_TAREA.PENDIENTE_RECOLECCION &&
                                                  tareaExterna.id_sucursal_origen === sucursalActual)
                          .map(tareaExterna => (
              <TareaExterna tareaExterna={tareaExterna} tituloContinuar="Recolectar" tituloBorrar="Borrar" accionBorrar={borraTareaExterna} accionContinuar={recolectaParaAtenderse} key={tareaExterna.id_tarea_externa} />
            ))
          }
        </tbody>
      </Table>
    </>
  )
}

export default PendienteRecoleccion
