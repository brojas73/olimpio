import { STATUS_TAREA, useTareasExternas, useTareasExternasUpdate } from "../../context/TareasExternasContext"
import Filtros from "./Filtros"
import TareaExterna from "./TareaExternaTable"

const RecibidosParaAtenderse = () => {
  const { tareasExternas, sucursalActual } = useTareasExternas()
  const { terminadoParaRecolectar } = useTareasExternasUpdate()

  return (
    <main className='main-container'>
      <Filtros titulo='Recibidos para Atenderse' />
      <div className='layout__body tareas'>
        <table>
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
              tareasExternas.filter(tareaExterna => tareaExterna.id_estado_tarea === STATUS_TAREA.RECIBIDO_PARA_ATENDERSE  &&
                                                    tareaExterna.id_sucursal_destino === sucursalActual)
                            .map(tareaExterna => (
                <TareaExterna tareaExterna={tareaExterna} tituloBoton="Terminar" accionBoton={terminadoParaRecolectar} key={tareaExterna.id_tarea_externa} />
              ))
            }               
          </tbody>
        </table>
      </div>
    </main>
  )
}

export default RecibidosParaAtenderse
