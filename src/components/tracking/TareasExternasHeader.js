import { useTareasExternas } from "../../context/TareasExternasContext"
import Filtros from "./Filtros"
import TituloTareas from "./TituloTareas"

const TareasExternasHeader = ({titulo, renglones}) => {
  const { estadoActual, getEstadoTarea } = useTareasExternas()

  return (
    <>
      <Filtros />
      <TituloTareas titulo={titulo ? titulo : getEstadoTarea(estadoActual)} renglones={renglones}/>
    </>
  )
}

export default TareasExternasHeader
