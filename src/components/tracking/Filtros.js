import { faPlus } from "@fortawesome/fontawesome-free-solid"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom"
import EstadosTarea from "../comun/EstadosTarea"
import Sucursales from "../comun/Sucursales"

const Filtros = ({titulo}) => {
    const navigate = useNavigate()

    function onClick() {
        navigate('/tracking/alta')
    }

    return (
        <>
            <main className='filtros-container'>
                <Sucursales />
                <EstadosTarea />
            </main>
            <div className='filtros-container'>
                <h2>{titulo}</h2>
                <button onClick={onClick} className="btn btn--add">
                    Agregar Tarea
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
        </>
    )
}

export default Filtros
