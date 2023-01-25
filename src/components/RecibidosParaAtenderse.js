import { STATUS_TAREA, useTareasExternas, useTareasExternasUpdate } from "../context/TareasExternasContext"
import TareaExterna from "./TareaExternaTable"

const RecibidosParaAtenderse = () => {
  const { tareasExternas, sucursalActual } = useTareasExternas()
  const { terminadoParaRecolectar } = useTareasExternasUpdate()

  return (
    <main className='main-container'>
        <div className='container layout__body tareas'>
            <h2>Recibidos para Atenderse</h2>
        </div>
        <div className='container layout__body tareas'>
            <table>
              <tr>
                <th>Ticket</th>
                <th>Descripción</th>
                <th>Tipo de Trabajo</th>
                <th>Sucursal Destino</th>
                <th>Tipo de Servicio</th>
                <th></th>
              </tr>              
              {
                tareasExternas.filter(tareaExterna => tareaExterna.status === STATUS_TAREA.RECIBIDO_PARA_ATENDERSE  &&
                                                      // eslint-disable-next-line eqeqeq
                                                      tareaExterna.sucursalDestino == sucursalActual)
                              .map(tareaExterna => (
                  <TareaExterna tareaExterna={tareaExterna} tituloBoton="Terminar" accionBoton={terminadoParaRecolectar} key={tareaExterna.id} />
                ))
              }               
            </table>
        </div>
    </main>
  )
}

export default RecibidosParaAtenderse
