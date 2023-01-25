import { STATUS_TAREA, useTareasExternas, useTareasExternasUpdate } from "../context/TareasExternasContext"
import TareaExterna from "./TareaExterna"

const TerminadosParaRecolectar = () => {
  const { tareasExternas, sucursalActual } = useTareasExternas()
  const { recolectaParaEntrega } = useTareasExternasUpdate()

  return (
    <main className='main-container'>
        <div className='container layout__body'>
            <h2>Terminados para Recolectar</h2>
            {
              tareasExternas.filter(tareaExterna => tareaExterna.status === STATUS_TAREA.TERMINADO_PARA_RECOLECTAR &&
                                                    // eslint-disable-next-line eqeqeq
                                                    tareaExterna.sucursalDestino == sucursalActual)
                            .map(tareaExterna => (
                <TareaExterna tareaExterna={tareaExterna} tituloBoton="Recolectar" accionBoton={recolectaParaEntrega} key={tareaExterna.id} />
              ))
            }               

        </div>
    </main>
  )
}

export default TerminadosParaRecolectar
