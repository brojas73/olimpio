import { STATUS_TAREA, useTareasExternas, useTareasExternasUpdate } from "../context/TareasExternasContext"
import TareaExterna from "./TareaExternaTable"

const RecolectadosParaEntrega = () => {
  const { tareasExternas } = useTareasExternas()
  const { entregaASucursalOrigen } = useTareasExternasUpdate()

  return (
    <main className='main-container'>
        <div className='container layout__body'>
            <h2>Recolectados para Entrega</h2>
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
              tareasExternas.filter(tareaExterna => tareaExterna.status === STATUS_TAREA.RECOLECTADO_PARA_ENTREGA)
                            .map(tareaExterna => (
                <TareaExterna tareaExterna={tareaExterna} tituloBoton="Entregar" accionBoton={entregaASucursalOrigen} key={tareaExterna.id} />
              ))
            }        
          </table>    
        </div>
    </main>
  )
}

export default RecolectadosParaEntrega
