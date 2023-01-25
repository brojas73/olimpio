import { STATUS_TAREA, useTareasExternas, useTareasExternasUpdate } from "../context/TareasExternasContext"
import TareaExternaTable from "./TareaExternaTable"

const PendienteRecoleccion = () => {
  const { tareasExternas, sucursalActual  } = useTareasExternas()
  const { recolectaParaAtenderse } = useTareasExternasUpdate()

  return (
    <main className='main-container'>
        <div className='container layout__body'>
            <h2>Pendiente de Recolección</h2>
        </div>
        <div className='container layout__body tareas'>
          <table border='0'>
            <tr>
              <th>Ticket</th>
              <th>Descripción</th>
              <th>Tipo de Trabajo</th>
              <th>Sucursal Destino</th>
              <th>Tipo de Servicio</th>
              <th></th>
            </tr>
            {
              tareasExternas.filter(tareaExterna => tareaExterna.status === STATUS_TAREA.PENDIENTE_RECOLECCION &&
                                                    // eslint-disable-next-line eqeqeq
                                                    tareaExterna.sucursalOrigen == sucursalActual)
                            .map(tareaExterna => (
                <TareaExternaTable tareaExterna={tareaExterna} tituloBoton="Recolectar" accionBoton={recolectaParaAtenderse} key={tareaExterna.id} />
              ))
            }
          </table>
        </div>
    </main>
  )
}

export default PendienteRecoleccion
