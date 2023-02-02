import { Table } from "react-bootstrap"
import { STATUS_TAREA, useTareasExternas, useTareasExternasUpdate } from "../../context/TareasExternasContext"
import Filtros from "./Filtros"
import TareaExterna from "./TareaExternaTable"

const RecolectadosParaAtenderse = () => {
  const { tareasExternas, sucursalActual } = useTareasExternas()
  const { recibeParaAtenderse } = useTareasExternasUpdate()

  return (
    <>
      <Filtros titulo='Recolectados para Atenderse'/>
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
                tareasExternas.filter(tareaExterna => tareaExterna.id_estado_tarea === STATUS_TAREA.RECOLECTADO_PARA_ATENDERSE &&
                                                      tareaExterna.id_sucursal_destino === sucursalActual)
                              .map(tareaExterna => (
                  <TareaExterna tareaExterna={tareaExterna} tituloContinuar="Recibir" accionContinuar={recibeParaAtenderse} key={tareaExterna.id_tarea_externa} />
                ))
              }     
            </tbody>  
      </Table>
    </>
  )
}

export default RecolectadosParaAtenderse 