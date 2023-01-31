import { STATUS_TAREA, useTareasExternas } from "../../context/TareasExternasContext"
import Filtros from "./Filtros"
import TareaExterna from "./TareaExternaTable"

const EntregadosASucursalOrigen = () => {
  const { sucursalActual, tareasExternas } = useTareasExternas()

  return (
    <main className='main-container'>
      <Filtros titulo='Entregados a Sucursal Origen'/>
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
                tareasExternas.filter(tareaExterna => tareaExterna.id_estado_tarea === STATUS_TAREA.ENTREGADO_A_SUCURSAL_ORIGEN  &&
                                                      tareaExterna.id_sucursal_destino === sucursalActual)
                              .map(tareaExterna => (
                  <TareaExterna tareaExterna={tareaExterna} key={tareaExterna.id_tarea_externa} />
                ))
              }
            </tbody>
        </table>            
      </div>
    </main>
  )
}

export default EntregadosASucursalOrigen
