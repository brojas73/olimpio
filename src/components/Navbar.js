import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <main className='layout'>
        <div className='container'>
            <div className='topics-page layout__body'>
                <div className='topics__header'>
                    <h2>Trabajos Externos</h2>    
                </div>
                <ul className='topics__list'>
                    <li><NavLink to='/'>Alta</NavLink></li>
                    <li><NavLink to='/pendiente-recoleccion'>Pendiente de Recolección</NavLink></li>
                    <li><NavLink to='/recolectados-para-atenderse'>Recolectados para Atenderse</NavLink></li>
                    <li><NavLink to='/recibidos-para-atenderse'>Recibidos para Atenderse</NavLink></li>
                    <li><NavLink to='/terminados-para-recolectar'>Terminados para Recolectar</NavLink></li>
                    <li><NavLink to='/recolectados-para-entrega'>Recolectados para Entrega</NavLink></li>
                    <li><NavLink to='/entregados-a-sucursal-origen'>Entregados a Sucursal Origen</NavLink></li>
                    <li><NavLink to='/test'>Test</NavLink></li>
                </ul>
            </div>
        </div>
    </main>
  )
}

export default Navbar
