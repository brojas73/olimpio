import { STATUS_TAREA, useTareasExternas, useTareasExternasUpdate } from "../context/TareasExternasContext"
import TareaExterna from "./TareaExterna"

const RecibidosParaAtenderse = () => {
  const { tareasExternas, sucursalActual } = useTareasExternas()
  const { terminadoParaRecolectar } = useTareasExternasUpdate()

  return (
    <main className='main-container'>
        <div className='container layout__body'>
            <h2>Recibidos para Atenderse</h2>
            {
              tareasExternas.filter(tareaExterna => tareaExterna.status === STATUS_TAREA.RECIBIDO_PARA_ATENDERSE &&
                                                    tareaExterna.sucursalDestino === sucursalActual)
                            .map(tareaExterna => (
                <TareaExterna tareaExterna={tareaExterna} tituloBoton="Terminar" accionBoton={terminadoParaRecolectar} key={tareaExterna.id} />
              ))
            }               
        </div>
    </main>
  )
}

export default RecibidosParaAtenderse
