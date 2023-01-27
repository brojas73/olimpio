import { STATUS_TAREA, useTareasExternas } from "../context/TareasExternasContext"
import TareaExterna from "./TareaExternaTable"

const EntregadosASucursalOrigen = () => {
  const { tareasExternas } = useTareasExternas()

  return (
    <main className='main-container'>
        <div className='layout__body'>
            <h2>Entregados a Sucursal Origen</h2>
            </div>
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
                  tareasExternas.filter(tareaExterna => tareaExterna.status === STATUS_TAREA.ENTREGADO_A_SUCURSAL_ORIGEN)
                                .map(tareaExterna => (
                    <TareaExterna tareaExterna={tareaExterna} key={tareaExterna.id} />
                  ))
                }
              </tbody>
          </table>            
        </div>
    </main>
  )
}

export default EntregadosASucursalOrigen
