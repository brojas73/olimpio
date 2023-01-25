import { STATUS_TAREA, useTareasExternas, useTareasExternasUpdate } from "../context/TareasExternasContext"
import TareaExterna from "./TareaExternaTable"

const TerminadosParaRecolectar = () => {
  const { tareasExternas, sucursalActual } = useTareasExternas()
  const { recolectaParaEntrega } = useTareasExternasUpdate()

  return (
    <main className='main-container'>
        <div className='container layout__body'>
            <h2>Terminados para Recolectar</h2>
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
                tareasExternas.filter(tareaExterna => tareaExterna.status === STATUS_TAREA.TERMINADO_PARA_RECOLECTAR &&
                                                      // eslint-disable-next-line eqeqeq
                                                      tareaExterna.sucursalDestino == sucursalActual)
                              .map(tareaExterna => (
                  <TareaExterna tareaExterna={tareaExterna} tituloBoton="Recolectar" accionBoton={recolectaParaEntrega} key={tareaExterna.id} />
                ))
              }               
          </table>
        </div>
    </main>
  )
}

export default TerminadosParaRecolectar
