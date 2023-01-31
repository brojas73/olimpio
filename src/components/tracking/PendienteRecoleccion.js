import { STATUS_TAREA, useTareasExternas, useTareasExternasUpdate } from "../../context/TareasExternasContext"
import Filtros from "./Filtros"
import TareaExterna from "./TareaExternaTable"

const PendienteRecoleccion = () => {
  const { tareasExternas, sucursalActual  } = useTareasExternas()
  const { recolectaParaAtenderse } = useTareasExternasUpdate()

  return (
    <main className='main-container'>
      <Filtros titulo='Pendiente de Recolección'/>
      <div className='layout__body tareas'>
        <table>
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
              tareasExternas.filter(tareaExterna => tareaExterna.status === STATUS_TAREA.PENDIENTE_RECOLECCION &&
                                                    tareaExterna.sucursalOrigen === sucursalActual)
                            .map(tareaExterna => (
                <TareaExterna tareaExterna={tareaExterna} tituloBoton="Recolectar" accionBoton={recolectaParaAtenderse} key={tareaExterna.id} />
              ))
            }
          </tbody>
        </table>
      </div>
    </main>
  )
}

export default PendienteRecoleccion
