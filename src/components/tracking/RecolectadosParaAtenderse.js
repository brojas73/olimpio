import { STATUS_TAREA, useTareasExternas, useTareasExternasUpdate } from "../../context/TareasExternasContext"
import Filtros from "./Filtros"
import TareaExterna from "./TareaExternaTable"

const RecolectadosParaAtenderse = () => {
  const { tareasExternas, sucursalActual } = useTareasExternas()
  const { recibeParaAtenderse } = useTareasExternasUpdate()

  return (
    <main className='main-container'>
      <Filtros titulo='Recolectados para Atenderse' />
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
                tareasExternas.filter(tareaExterna => tareaExterna.status === STATUS_TAREA.RECOLECTADO_PARA_ATENDERSE &&
                                                      tareaExterna.sucursalDestino === sucursalActual)
                              .map(tareaExterna => (
                  <TareaExterna tareaExterna={tareaExterna} tituloBoton="Recibir" accionBoton={recibeParaAtenderse} key={tareaExterna.id} />
                ))
              }     
            </tbody>  
        </table>
      </div>
    </main>
  )
}

export default RecolectadosParaAtenderse 