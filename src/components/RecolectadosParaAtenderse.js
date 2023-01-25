import { STATUS_TAREA, useTareasExternas, useTareasExternasUpdate } from "../context/TareasExternasContext"
import TareaExterna from "./TareaExterna"

const RecolectadosParaAtenderse = () => {
  const { tareasExternas } = useTareasExternas()
  const { recibeParaAtenderse } = useTareasExternasUpdate()

  return (
    <main className='main-container'>
        <div className='container layout__body'>
            <h2>Recolectados para Atenderse</h2>
            {
              tareasExternas.filter(tareaExterna => tareaExterna.status === STATUS_TAREA.RECOLECTADO_PARA_ATENDERSE)
                            .map(tareaExterna => (
                <TareaExterna tareaExterna={tareaExterna} tituloBoton="Recibir" accionBoton={recibeParaAtenderse} key={tareaExterna.id} />
              ))
            }            
        </div>
    </main>
  )
}

export default RecolectadosParaAtenderse 