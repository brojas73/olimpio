import { STATUS_TAREA, useTareasExternas, useTareasExternasUpdate } from "../context/TareasExternasContext"
import TareaExterna from "./TareaExterna"

const PendienteRecoleccion = () => {
  const { tareasExternas, sucursalActual  } = useTareasExternas()
  const { recolectaParaAtenderse } = useTareasExternasUpdate()

  return (
    <main className='main-container'>
        <div className='container layout__body'>
            <h2>Pendiente de Recolección</h2>
        </div>
        <div className='container layout__body'>
            {
              tareasExternas.filter(tareaExterna => tareaExterna.status === STATUS_TAREA.PENDIENTE_RECOLECCION &&
                                                    tareaExterna.sucursalDestino !== sucursalActual)
                            .map(tareaExterna => (
                <TareaExterna tareaExterna={tareaExterna} tituloBoton="Recolectar" accionBoton={recolectaParaAtenderse} key={tareaExterna.id} />
              ))
            }
        </div>
    </main>
  )
}

export default PendienteRecoleccion
