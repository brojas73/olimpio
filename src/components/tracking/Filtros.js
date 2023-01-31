import EstadosTarea from "../comun/EstadosTarea"
import Sucursales from "../comun/Sucursales"

const Filtros = ({titulo}) => {
    return (
        <>
            <main className='filtros-container'>
                <Sucursales />
                <EstadosTarea />
            </main>
            <div className='layout__body'>
                <h2>{titulo}</h2>
            </div>
        </>
    )
}

export default Filtros
