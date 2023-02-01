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
                <button onClick={onClick} className="btn btn--main">Agregar Tarea</button>
            </div>
        </>
    )
}

export default Filtros
