import { STATUS_TAREA, useTareasExternas, useTareasExternasUpdate } from "../context/TareasExternasContext"
import TareaExterna from "./TareaExterna"

const RecolectadosParaEntrega = () => {
  const { tareasExternas } = useTareasExternas()
  const { entregaASucursalOrigen } = useTareasExternasUpdate()

  return (
    <main className='main-container'>
        <div className='container layout__body'>
            <h2>Recolectados para Entrega</h2>
            {
              tareasExternas.filter(tareaExterna => tareaExterna.status === STATUS_TAREA.RECOLECTADO_PARA_ENTREGA)
                            .map(tareaExterna => (
                <TareaExterna tareaExterna={tareaExterna} tituloBoton="Entregar" accionBoton={entregaASucursalOrigen} key={tareaExterna.id} />
              ))
            }            
        </div>
    </main>
  )
}

export default RecolectadosParaEntrega
