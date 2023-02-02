import { Table } from "react-bootstrap"
import { STATUS_TAREA, useTareasExternas, useTareasExternasUpdate } from "../../context/TareasExternasContext"
import Filtros from "./Filtros"
import TareaExterna from "./TareaExternaTable"

const EntregadosASucursalOrigen = () => {
  const { sucursalActual, tareasExternas } = useTareasExternas()
  const { entregaACliente } = useTareasExternasUpdate()

  return (
    <>
      <Filtros titulo='Entregados a Sucursal Origen'/>
      <Table striped bordered hover size='sm'>
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
              tareasExternas.filter(tareaExterna => tareaExterna.id_estado_tarea === STATUS_TAREA.ENTREGADO_A_SUCURSAL_ORIGEN  &&
                                                    tareaExterna.id_sucursal_destino === sucursalActual)
                            .map(tareaExterna => (
                <TareaExterna tareaExterna={tareaExterna} tituloContinuar="Entregar" accionContinuar={entregaACliente} key={tareaExterna.id_tarea_externa} />
              ))
            }
          </tbody>
      </Table>            
    </>
  )
}

export default EntregadosASucursalOrigen
