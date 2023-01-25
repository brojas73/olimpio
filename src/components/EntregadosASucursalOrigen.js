import { STATUS_TAREA, useTareasExternas } from "../context/TareasExternasContext"
import TareaExterna from "./TareaExterna"

const EntregadosASucursalOrigen = () => {
  const { tareasExternas } = useTareasExternas()

  return (
    <main className='main-container'>
        <div className='container layout__body'>
            <h2>Entregados a Sucursal Origen</h2>
            {
              tareasExternas.filter(tareaExterna => tareaExterna.status === STATUS_TAREA.ENTREGADO_A_SUCURSAL_ORIGEN)
                            .map(tareaExterna => (
                <TareaExterna tareaExterna={tareaExterna} key={tareaExterna.id} />
              ))
            }            
        </div>
    </main>
  )
}

export default EntregadosASucursalOrigen
