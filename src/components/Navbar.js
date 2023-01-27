import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <main className='layout'>
        <div className='container'>
            <div className='layout__body'>
                <div className='navbar__header'>
                    <h2>Trabajos Externos</h2>    
                </div>
                <div className='dropdown-menu'>
                    <ul>
                        {/* <li><NavLink to='/'>Alta</NavLink></li> */}
                        <li><NavLink to='/pendiente-recoleccion'>Pendiente de Recolección</NavLink></li>
                        <li><NavLink to='/recolectados-para-atenderse'>Recolectados para Atenderse</NavLink></li>
                        <li><NavLink to='/recibidos-para-atenderse'>Recibidos para Atenderse</NavLink></li>
                        <li><NavLink to='/terminados-para-recolectar'>Terminados para Recolectar</NavLink></li>
                        <li><NavLink to='/recolectados-para-entrega'>Recolectados para Entrega</NavLink></li>
                        <li><NavLink to='/entregados-a-sucursal-origen'>Entregados a Sucursal Origen</NavLink></li>
                    </ul>
                </div>
            </div>
        </div>
    </main>
  )
}

export default Navbar
