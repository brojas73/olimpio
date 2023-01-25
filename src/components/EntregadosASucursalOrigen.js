import { STATUS_TAREA, useTareasExternas } from "../context/TareasExternasContext"
import TareaExterna from "./TareaExternaTable"

const EntregadosASucursalOrigen = () => {
  const { tareasExternas } = useTareasExternas()

  return (
    <main className='main-container'>
        <div className='container layout__body'>
            <h2>Entregados a Sucursal Origen</h2>
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
              tareasExternas.filter(tareaExterna => tareaExterna.status === STATUS_TAREA.ENTREGADO_A_SUCURSAL_ORIGEN)
                            .map(tareaExterna => (
                <TareaExterna tareaExterna={tareaExterna} key={tareaExterna.id} />
              ))
            }
          </table>            
        </div>
    </main>
  )
}

export default EntregadosASucursalOrigen
